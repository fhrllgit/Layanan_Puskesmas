const db = require("../config/db");

exports.tambahPoli = (req, res) => {
  const { nama_poli, deskripsi } = req.body;

  if (!nama_poli) {
    return res.status(400).json({ message: "Nama poli wajib diisi" });
  }
  const sql = "INSERT INTO poli (nama_poli, deskripsi) VALUES (?, ?)";
  db.query(sql, [nama_poli, deskripsi], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menambahkan poli" });
    }
    res.status(201).json({
      message: "Poli berhasil ditambahkan",
      poli: { id: result.insertId, nama_poli, deskripsi },
    });
  });
};

exports.getPoli = (req, res) => {
  const sql = "SELECT * FROM poli WHERE status = 'aktif'";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil data poli" });
    }
    res.status(200).json({ data: results });
  });
};

exports.updatePoli = (req, res) => {
  const { id } = req.params;
  const { nama_poli, deskripsi, status } = req.body;

  const sql = "UPDATE poli SET nama_poli=?, deskripsi=?, status=? WHERE id=?";
  db.query(sql, [nama_poli, deskripsi, status || "aktif", id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal memperbarui poli" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Poli tidak ditemukan" });
    }
    res.status(200).json({ message: "Poli berhasil diperbarui" });
  });
};

exports.deletePoli = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM poli WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menghapus poli" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Poli tidak ditemukan" });
    }
    res.status(200).json({ message: "Poli berhasil dihapus" });
  });
};

