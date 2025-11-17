const db = require("../config/db");

exports.tambahKuota = (req, res) => {
  const { poli_id, tanggal, max_antrian } = req.body;

  if (!poli_id || !tanggal || !max_antrian) {
    return res
      .status(400)
      .json({ message: "poli_id, tanggal, dan max_antrian wajib diisi" });
  }
  const jadwalQuery = `
    SELECT jam_mulai, jam_selesai 
    FROM jadwal_dokter 
    WHERE poli_id = ? LIMIT 1`;

  db.query(jadwalQuery, [poli_id], (err, jadwal) => {
    if (err)
      return res.status(500).json({ message: "Gagal mengambil jadwal dokter" });
    if (jadwal.length === 0)
      return res
        .status(400)
        .json({ message: "Belum ada jadwal untuk poli ini" });

    const { jam_mulai, jam_selesai } = jadwal[0];
    const cekQuery = `SELECT * FROM kuota_poli WHERE poli_id = ? AND tanggal = ?`;
    db.query(cekQuery, [poli_id, tanggal], (err, results) => {
      if (err)
        return res.status(500).json({ message: "Gagal memeriksa kuota" });
      if (results.length > 0)
        return res
          .status(400)
          .json({ message: "Kuota poli untuk tanggal ini sudah ada" });

      const insertQuery = `
        INSERT INTO kuota_poli (poli_id, tanggal, jam_mulai, jam_selesai, max_antrian)
        VALUES (?, ?, ?, ?, ?)`;
      db.query(
        insertQuery,
        [poli_id, tanggal, jam_mulai, jam_selesai, max_antrian],
        (err, result) => {
          if (err) {
            console.error(err);
            return res
              .status(500)
              .json({ message: "Gagal menambahkan kuota poli" });
          }
          res.status(201).json({
            message: "Kuota poli berhasil ditambahkan",
            id: result.insertId,
          });
        }
      );
    });
  });
};

exports.getKuota = (req, res) => {
  const sql = `
    SELECT k.*, p.nama_poli 
    FROM kuota_poli k
    JOIN poli p ON k.poli_id = p.id
    ORDER BY k.tanggal DESC`;
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Gagal mengambil data kuota" });
    res.status(200).json({ data: results });
  });
};

exports.updateKuota = (req, res) => {
  const { id } = req.params;
  let { tanggal, jam_mulai, jam_selesai, max_antrian } = req.body;

  const getOld = "SELECT * FROM kuota_poli WHERE id = ?";
  db.query(getOld, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal mengambil data lama" });
    if (result.length === 0) return res.status(404).json({ message: "Kuota tidak ditemukan" });

    const old = result[0];

    tanggal = tanggal || old.tanggal;
    jam_mulai = jam_mulai || old.jam_mulai;
    jam_selesai = jam_selesai || old.jam_selesai;
    max_antrian = max_antrian || old.max_antrian;

    if (tanggal && tanggal.includes("T")) tanggal = tanggal.split("T")[0];
    const updateSql = `
      UPDATE kuota_poli 
      SET tanggal = ?, jam_mulai = ?, jam_selesai = ?, max_antrian = ?
      WHERE id = ?`;

    db.query(updateSql, [tanggal, jam_mulai, jam_selesai, max_antrian, id], (err2, result2) => {
      if (err2) {
        console.error(err2);
        return res.status(500).json({ message: "Gagal memperbarui kuota poli" });
      }
      res.status(200).json({ message: "Kuota poli berhasil diperbarui" });
    });
  });
};

exports.deleteKuota = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM kuota_poli WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menghapus kuota poli" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Kuota poli tidak ditemukan" });
    }
    res.status(200).json({ message: "Kuota poli berhasil dihapus" });
  });
};
