const db = require("../config/db");

// profil
exports.getProfilPasien = (req, res) => {
  const userId = req.user.id;

  const sql =
    "SELECT id, nama, email, jenis_kelamin, avatar, status FROM users WHERE id = ? AND role = 'pasien'";
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Gagal mengambil data pasien:", err);
      return res.status(500).json({ message: "Terjadi kesalahan server" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Pasien tidak ditemukan" });
    }

    res.status(200).json(results[0]);
  });
};

// jadwal dkter
exports.getJadwalDokterDay = (req, res) => {
  const dayNames = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const today = dayNames[new Date().getDay()];
  const sql = `
    SELECT 
        jd.*, 
        u.nama AS nama_dokter,
        p.nama_poli
    FROM jadwal_dokter jd
    JOIN users u ON jd.dokter_id = u.id AND u.role = 'dokter'
    JOIN poli p ON jd.poli_id = p.id
    WHERE jd.hari = ?
  `;

  db.query(sql, [today], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil jadwal dokter" });
    }

    return res.status(200).json({
      hari: today,
      jumlah: results.length,
      data: results,
    });
  });
};

exports.getRiwayatKunjungan = (req, res) => {
  const pasienId = req.user.id;

  const sql = `
    SELECT 
      rm.id AS rekam_id,
      DATE_FORMAT(rm.tanggal, '%Y-%m-%d') AS tanggal_kunjungan,
      rm.keluhan,
      rm.diagnosis,
      rm.tindakan,
      p.nama_poli,
      d.nama AS nama_dokter,
      ro.id AS resep_id,
      ro.status AS status_resep,
      DATE_FORMAT(ro.tanggal, '%Y-%m-%d') AS tanggal_resep,
      roi.nama_obat,
      roi.dosis,
      roi.jumlah,
      roi.keterangan AS keterangan_obat
    FROM rekam_medis rm
    JOIN poli p ON rm.poli_id = p.id
    JOIN users d ON rm.dokter_id = d.id
    LEFT JOIN resep_obat ro ON rm.id = ro.rekam_id
    LEFT JOIN resep_obat_item roi ON ro.id = roi.resep_id
    WHERE rm.pasien_id = ?
    ORDER BY rm.tanggal DESC, ro.tanggal DESC
  `;

  db.query(sql, [pasienId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error", error: err });
    }

    const map = new Map();

    results.forEach((row) => {
      if (!map.has(row.rekam_id)) {
        map.set(row.rekam_id, {
          rekam_id: row.rekam_id,
          tanggal_kunjungan: row.tanggal_kunjungan || "-",
          nama_poli: row.nama_poli || "-",
          nama_dokter: row.nama_dokter || "-",
          keluhan: row.keluhan || "-",
          diagnosis: row.diagnosis || "-",
          tindakan: row.tindakan || "-",
          resep: row.resep_id
            ? {
                resep_id: row.resep_id,
                status: row.status_resep || "-",
                tanggal_resep: row.tanggal_resep || "-",
                obat: [],
              }
            : null,
        });
      }

      if (row.resep_id && row.nama_obat) {
        map.get(row.rekam_id).resep.obat.push({
          nama_obat: row.nama_obat || "-",
          dosis: row.dosis || "-",
          jumlah: row.jumlah || 0,
          keterangan: row.keterangan_obat || "-",
        });
      }
    });

    res.json(Array.from(map.values()));
  });
};

exports.getStatusObat = (req, res) => {
  const pasien_id = req.user.id; 

  const sql = `
    SELECT r.id, r.status, r.tanggal, r.siap_diambil_at, 
           d.nama AS dokter_nama
    FROM resep_obat r
    JOIN users d ON r.dokter_id = d.id
    WHERE r.pasien_id = ?
    ORDER BY r.tanggal DESC
  `;

  db.query(sql, [pasien_id], (err, rows) => {
    if (err) return res.status(500).json({ msg: "Terjadi kesalahan", error: err });

    if (rows.length === 0) {
      return res.json({ msg: "Belum ada antrian obat", data: [] });
    }
    res.json({ msg: "Daftar status obat", data: rows });
  });
};

exports.getDetailResep = (req, res) => {
  const { id } = req.params;
  const sqlResep = `
    SELECT r.*, p.nama AS pasien_nama, d.nama AS dokter_nama
    FROM resep_obat r
    JOIN users p ON p.id = r.pasien_id
    JOIN users d ON d.id = r.dokter_id
    WHERE r.id = ?
  `;
  const sqlItem = `
    SELECT * FROM resep_obat_item WHERE resep_id = ?
  `;

  db.query(sqlResep, [id], (err, resep) => {
    if (err) return res.status(500).json({ error: err });
    db.query(sqlItem, [id], (err, items) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ resep: resep[0], items });
    });
  });
};

// pasien tebus resep dokterrrr
exports.getStatusKonsultasi = (req, res) => {
  const pasien_id = req.user.id;

  const sql = `
    SELECT r.id, r.status, r.tanggal, r.siap_diambil_at,
           d.nama AS dokter_nama
    FROM resep_konsultasi r
    JOIN users d ON r.dokter_id = d.id
    WHERE r.pasien_id = ?
    ORDER BY r.tanggal DESC
  `;

  db.query(sql, [pasien_id], (err, rows) => {
    if (err) return res.status(500).json({ msg: "Terjadi kesalahan", error: err });

    if (rows.length === 0) {
      return res.json({ msg: "Belum ada tebusan resep konsultasi", data: [] });
    }

    res.json({ msg: "Daftar status resep konsultasi", data: rows });
  });
};

exports.getDetailResepKonsultasiPasien = (req, res) => {
  const { id } = req.params;

  const sqlResep = `
    SELECT r.*, 
           p.nama AS pasien_nama, 
           d.nama AS dokter_nama
    FROM resep_konsultasi r
    JOIN users p ON p.id = r.pasien_id
    JOIN users d ON d.id = r.dokter_id
    WHERE r.id = ?
  `;

  const sqlItem = `
    SELECT * FROM resep_konsultasi_item WHERE resep_konsultasi_id = ?
  `;

  db.query(sqlResep, [id], (err, resep) => {
    if (err) return res.status(500).json({ error: err });

    db.query(sqlItem, [id], (err, items) => {
      if (err) return res.status(500).json({ error: err });

      res.json({ resep: resep[0], items });
    });
  });
};

// exports.getRiwayatKunjungan = (req, res) => {
//   console.log("Controller dipanggil");

//   // Hardcode dulu pasienId untuk testing
//   const pasienId = 12;

//   const sql = `
//     SELECT *
//     FROM rekam_medis
//     WHERE pasien_id = ?
//   `;

//   db.query(sql, [pasienId], (err, results) => {
//     if (err) {
//       console.error("Database error:", err); // <-- tampilkan error detail
//       return res.status(500).json({ message: "Database error", error: err });
//     }

//     console.log("Hasil query:", results);

//     res.json(results);
//   });
// };
