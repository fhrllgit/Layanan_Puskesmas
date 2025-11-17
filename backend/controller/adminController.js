const db = require("../config/db");
const emitAntrianUpdate = require("../utils/emitAntrianUpdate");


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
  const io = req.io
  const sql = "DELETE FROM antrian WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    io.emit("antrian:baru")
    res.json({ message: "Antrian berhasil dihapus" });
  });
};
