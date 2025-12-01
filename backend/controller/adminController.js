const db = require("../config/db");
const emitAntrianUpdate = require("../utils/emitAntrianUpdate");
const response = require("../response");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

exports.getAntrianToday = (req, res) => {
  const sql = `
    SELECT a.*, a.keterangan, u.nama AS pasien_nama, p.nama_poli
    FROM antrian a
    JOIN users u ON a.pasien_id = u.id
    JOIN poli p ON a.poli_id = p.id
    WHERE a.tanggal = CURDATE()
    ORDER BY a.nomor_antrian ASC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ data: result });
  });
};

exports.filterAntrian = (req, res) => {
  const { tanggal, poli_id } = req.query;

  let sql = `
    SELECT a.*, a.keterangan, u.nama AS pasien_nama, u.nik, p.nama_poli
    FROM antrian a
    JOIN users u ON a.pasien_id = u.id
    JOIN poli p ON a.poli_id = p.id
    WHERE 1 = 1
  `;
  const params = [];

  if (tanggal) {
    sql += " AND a.tanggal = ?";
    params.push(tanggal);
  }

  if (poli_id) {
    sql += " AND a.poli_id = ?";
    params.push(poli_id);
  }

  sql += " ORDER BY a.created_at ASC";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal filter antrian." });
    }

    res.json({ data: results });
  });
};

exports.searchPasien = (req, res) => {
  const { query } = req.query;
  const sql = `
    SELECT id, nama, nik, alamat_lengkap AS alamat, jenis_kelamin
    FROM users 
    WHERE role='pasien' AND (nama LIKE ? OR nik LIKE ?)
  `;

  db.query(sql, [`%${query}%`, `%${query}%`], (err, result) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.status(500).json({ message: "SQL Error", error: err });
    }
    res.json({ data: result });
  });
};

exports.addPasien = (req, res) => {
  const {
    nik,
    nama,
    jenis_kelamin,
    alamat_lengkap,
    kecamatan,
    kota,
    provinsi,
    no_hp,
  } = req.body;
  const sql = `
    INSERT INTO users (nik, nama, jenis_kelamin, alamat_lengkap, kecamatan, kota, provinsi, no_hp, role, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pasien', 'active')
  `;

  db.query(
    sql,
    [
      nik,
      nama,
      jenis_kelamin,
      alamat_lengkap,
      kecamatan,
      kota,
      provinsi,
      no_hp,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({
        message: "Pasien berhasil ditambahkan",
        pasien_id: result.insertId,
      });
    }
  );
};

exports.addAntrian = (req, res) => {
  const { pasien_id, poli_id, dokter_id, keluhan } = req.body;
  if (!dokter_id)
    return res.status(400).json({ message: "Dokter harus dipilih" });

  const sqlLast = `
    SELECT nomor_antrian 
    FROM antrian 
    WHERE poli_id = ? AND tanggal = CURDATE()
    ORDER BY id DESC LIMIT 1
  `;
  db.query(sqlLast, [poli_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    let nomor;
    if (result.length === 0) {
      nomor = "A001";
    } else {
      const last = result[0].nomor_antrian;
      const num = parseInt(last.slice(1)) + 1;
      nomor = "A" + String(num).padStart(3, "0");
    }
    const sqlInsert = `
      INSERT INTO antrian (pasien_id, poli_id, dokter_id, keluhan, nomor_antrian, status, tanggal)
      VALUES (?, ?, ?, ?, ?, 'menunggu', CURDATE())
    `;
    db.query(
      sqlInsert,
      [pasien_id, poli_id, dokter_id, keluhan, nomor],
      (err2, result2) => {
        if (err2) return res.status(500).json({ message: err2.message });
        res.json({
          message: "Antrian berhasil ditambahkan",
          nomor_antrian: nomor,
        });
      }
    );
  });
};

exports.getDokterByPoli = (req, res) => {
  const { poli_id } = req.query;
  if (!poli_id)
    return res.status(400).json({ message: "poli_id harus diberikan" });
  const sql = `
    SELECT id, nama 
    FROM users 
    WHERE role = 'dokter' AND poli_id = ? AND status = 'active'
  `;

  db.query(sql, [poli_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ data: result });
  });
};

exports.deleteAntrian = (req, res) => {
  const { id } = req.params;
  const io = req.io;
  const sql = "DELETE FROM antrian WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    io.emit("antrian:baru");
    res.json({ message: "Antrian berhasil dihapus" });
  });
};

exports.getUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(result);
  });
};

exports.getUserFilteres = (req, res) => {
  const { search, role } = req.query;
  try {
    let sql = `SELECT id, nama, email, status, role, created_at FROM users WHERE 1=1 `;
    const params = [];
    if (search && search.trim() !== "") {
      sql += `AND nama LIKE ?`;
      params.push(`%${search}%`);
    }
    if (role && role.trim() !== "") {
      sql += `AND role = ?`;
      params.push(role);
    }
    sql += ` ORDER BY created_at DESC`;
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database Error", error: err });
      }
      res.json({
        count: result.length,
        data: result,
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getLaporanLayananAdmin = (req, res) => {
  const { poli_id, dokter_id, periode, tanggal, bulan, tahun } = req.query;

  let sql = `
    SELECT 
      rm.id AS rekam_id,
      rm.tanggal AS tanggal_kunjungan,
      rm.keluhan,
      rm.diagnosis,
      rm.tindakan,
      p.nama_poli,
      d.nama AS nama_dokter,
      ps.nama AS nama_pasien,
      ro.id AS resep_id,
      roi.nama_obat,
      roi.dosis,
      roi.jumlah,
      roi.keterangan AS keterangan_obat
    FROM rekam_medis rm
    JOIN poli p ON rm.poli_id = p.id
    JOIN users d ON rm.dokter_id = d.id
    JOIN users ps ON rm.pasien_id = ps.id
    LEFT JOIN resep_obat ro ON rm.id = ro.rekam_id
    LEFT JOIN resep_obat_item roi ON ro.id = roi.resep_id
    WHERE 1=1
  `;

  const params = [];

  if (periode === "all" || !periode) {
  }
  if (poli_id) {
    sql += ` AND rm.poli_id = ?`;
    params.push(poli_id);
  }

  if (periode === "range" && req.query.from && req.query.to) {
    sql += ` AND DATE(rm.tanggal) BETWEEN ? AND ?`;
    params.push(req.query.from, req.query.to);
  }

  if (dokter_id) {
    sql += ` AND rm.dokter_id = ?`;
    params.push(dokter_id);
  }

  if (periode === "harian" && tanggal) {
    sql += ` AND DATE(rm.tanggal) = ?`;
    params.push(tanggal);
  }

  if (periode === "bulanan" && bulan && tahun) {
    sql += ` AND MONTH(rm.tanggal) = ? AND YEAR(rm.tanggal) = ?`;
    params.push(bulan, tahun);
  }

  if (periode === "mingguan" && tahun) {
    sql += ` AND YEARWEEK(rm.tanggal, 1) = YEARWEEK(?, 1)`;
    params.push(`${tahun}-${bulan ?? "01"}-01`);
  }

  sql += ` ORDER BY rm.tanggal DESC`;

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    const map = new Map();

    results.forEach((row) => {
      if (!map.has(row.rekam_id)) {
        map.set(row.rekam_id, {
          rekam_id: row.rekam_id,
          tanggal_kunjungan: row.tanggal_kunjungan,
          poli: row.nama_poli,
          dokter: row.nama_dokter,
          pasien: row.nama_pasien,
          keluhan: row.keluhan,
          diagnosis: row.diagnosis,
          tindakan: row.tindakan,
          obat: [],
        });
      }

      if (row.nama_obat) {
        map.get(row.rekam_id).obat.push({
          nama_obat: row.nama_obat,
          dosis: row.dosis,
          jumlah: row.jumlah,
          keterangan: row.keterangan_obat,
        });
      }
    });
    res.json({
      count: map.size,
      data: Array.from(map.values()),
    });
  });
};

exports.getAllPoli = (req, res) => {
  const sql = `
    SELECT id, nama_poli 
    FROM poli 
    WHERE status = 'aktif'
    ORDER BY nama_poli ASC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error getAllPoli:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

exports.getAllDokter = (req, res) => {
  const sql = `
    SELECT 
      u.id, 
      u.nama, 
      p.nama_poli 
    FROM users u
    LEFT JOIN poli p ON p.id = u.poli_id
    WHERE u.role = 'dokter' AND u.status = 'active'
    ORDER BY u.nama ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error getAllDokter:", err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
};

exports.exportPDF = (req, res) => {
  const { poli_id, dokter_id, from, to } = req.query;
  let sql = `
    SELECT 
      rm.id AS rekam_id,
      rm.tanggal,
      rm.keluhan,
      rm.diagnosis,
      rm.tindakan,
      p.nama_poli,
      d.nama AS nama_dokter,
      roi.nama_obat,
      roi.dosis,
      roi.jumlah,
      roi.keterangan AS ket_obat
    FROM rekam_medis rm
    JOIN poli p ON p.id = rm.poli_id
    JOIN users d ON d.id = rm.dokter_id
    LEFT JOIN resep_obat ro ON ro.rekam_id = rm.id
    LEFT JOIN resep_obat_item roi ON roi.resep_id = ro.id
    WHERE 1=1
  `;

  const params = [];
  if (poli_id) { sql += " AND rm.poli_id = ?"; params.push(poli_id); }
  if (dokter_id) { sql += " AND rm.dokter_id = ?"; params.push(dokter_id); }
  if (from && to) { sql += " AND DATE(rm.tanggal) BETWEEN ? AND ?"; params.push(from, to); }

  db.query(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument({ margin: 30, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=laporan_layanan.pdf");
    doc.pipe(res);
    doc.fontSize(20).text("Laporan Layanan SISMA", { align: "center" });
    // doc.font("Helvetica-Bold").fontSize(20).text("Laporan Layanan SISMA", { align: "center" });
    doc.moveDown();

    const tableTop = 120;
    const col = {
      tanggal: 30,
      poli: 100,
      dokter: 180,
      keluhan: 260,
      diagnosis: 340,
      tindakan: 420,
      obat: 500,
    };

    doc.fontSize(11).text("Tanggal", col.tanggal, tableTop);
    doc.text("Poli", col.poli, tableTop);
    doc.text("Dokter", col.dokter, tableTop);
    doc.text("Keluhan", col.keluhan, tableTop);
    doc.text("Diagnosis", col.diagnosis, tableTop);
    doc.text("Tindakan", col.tindakan, tableTop);
    doc.text("Obat", col.obat, tableTop);
    doc.moveTo(30, tableTop + 15).lineTo(560, tableTop + 15).stroke();

    let y = tableTop + 25;
    rows.forEach(row => {
      if (y > 750) {
        doc.addPage();
        y = 50;
      }
      const obatText = row.nama_obat
        ? `${row.nama_obat} (${row.dosis}) x${row.jumlah}\n${row.ket_obat}`
        : "-";
      doc.fontSize(10)
        .text(formatDate(row.tanggal), col.tanggal, y, { width: 60 })
        .text(row.nama_poli, col.poli, y, { width: 70 })
        .text(row.nama_dokter, col.dokter, y, { width: 70 })
        .text(row.keluhan, col.keluhan, y, { width: 70 })
        .text(row.diagnosis, col.diagnosis, y, { width: 70 })
        .text(row.tindakan, col.tindakan, y, { width: 70 })
        .text(obatText, col.obat, y, { width: 80 });

      y += 45;
    });

    doc.end();
  });
};

function formatDate(date) {
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, "0")}/${
    String(d.getMonth() + 1).padStart(2, "0")
  }/${String(d.getFullYear()).slice(2)}`;
}

exports.exportExcel = (req, res) => {
  const { poli_id, dokter_id, from, to } = req.query;

  let sql = `
    SELECT 
      rm.tanggal,
      p.nama_poli,
      d.nama AS nama_dokter,
      rm.keluhan,
      rm.diagnosis,
      rm.tindakan,
      roi.nama_obat,
      roi.dosis,
      roi.jumlah,
      roi.keterangan AS ket_obat
    FROM rekam_medis rm
    JOIN poli p ON p.id = rm.poli_id
    JOIN users d ON d.id = rm.dokter_id
    LEFT JOIN resep_obat ro ON ro.rekam_id = rm.id
    LEFT JOIN resep_obat_item roi ON roi.resep_id = ro.id
    WHERE 1=1
  `;

  const params = [];

  if (poli_id) {
    sql += " AND rm.poli_id = ?";
    params.push(poli_id);
  }

  if (dokter_id) {
    sql += " AND rm.dokter_id = ?";
    params.push(dokter_id);
  }

  if (from && to) {
    sql += " AND DATE(rm.tanggal) BETWEEN ? AND ?";
    params.push(from, to);
  }

  db.query(sql, params, async (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Laporan Layanan");

    sheet.columns = [
      { header: "Tanggal", key: "tanggal", width: 15 },
      { header: "Poli", key: "nama_poli", width: 15 },
      { header: "Dokter", key: "nama_dokter", width: 20 },
      { header: "Keluhan", key: "keluhan", width: 20 },
      { header: "Diagnosis", key: "diagnosis", width: 20 },
      { header: "Tindakan", key: "tindakan", width: 20 },
      { header: "Nama Obat", key: "nama_obat", width: 20 },
      { header: "Dosis", key: "dosis", width: 10 },
      { header: "Jumlah", key: "jumlah", width: 10 },
      { header: "Keterangan Obat", key: "ket_obat", width: 25 },
    ];

    rows.forEach((r) => sheet.addRow(r));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=laporan_layanan.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  });
};
