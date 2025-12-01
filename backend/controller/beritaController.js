const db = require("../config/db");
const path = require("path");

exports.addBerita = (req, res) => {
  const { judul, isi, tanggal, tipe_id, poli_ids } = req.body;
  const gambar = req.file ? req.file.filename : null;

  if (!judul || !isi || !tanggal || !tipe_id) {
    return res.status(400).json({ message: "Data wajib belum lengkap" });
  }

  const sqlBerita = `
        INSERT INTO berita (judul, isi, tanggal, tipe_id, gambar)
        VALUES (?, ?, ?, ?, ?)
    `;

  db.query(sqlBerita, [judul, isi, tanggal, tipe_id, gambar], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const beritaId = result.insertId;

    if (poli_ids) {
      let poliArray = poli_ids;
      if (typeof poli_ids === "string") {
        poliArray = JSON.parse(poli_ids);
      }

      if (poliArray.length > 0) {
        const values = poliArray.map((poliId) => [beritaId, poliId]);

        const sqlPoli = `INSERT INTO berita_poli (berita_id, poli_id) VALUES ?`;

        db.query(sqlPoli, [values], (err2) => {
          if (err2) return res.status(500).json({ error: err2 });

          return res.status(201).json({
            message: "Berita berhasil ditambahkan dengan poli",
          });
        });
        return;
      }
    }
    return res.status(201).json({
      message: "Berita berhasil ditambahkan tanpa poli",
    });
  });
};

exports.updateBerita = (req, res) => {
  const id = req.params.id;
  const { judul, isi, tanggal, tipe_id, poli_ids } = req.body;
  const gambar = req.file ? req.file.filename : null;

  let sql = "";
  let params = [];

  if (gambar) {
    sql = `
            UPDATE berita 
            SET judul=?, isi=?, tanggal=?, tipe_id=?, gambar=?
            WHERE id=?
        `;
    params = [judul, isi, tanggal, tipe_id, gambar, id];
  } else {
    sql = `
            UPDATE berita 
            SET judul=?, isi=?, tanggal=?, tipe_id=?
            WHERE id=?
        `;
    params = [judul, isi, tanggal, tipe_id, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.log("❌ SQL UPDATE ERROR:", err);
      return res.status(500).json({ error: err });
    }

    db.query(`DELETE FROM berita_poli WHERE berita_id = ?`, [id], (err2) => {
      if (err2) {
        console.log("❌ DELETE POLI ERROR:", err2);
        return res.status(500).json({ error: err2 });
      }

      let poliArray = [];
      if (typeof poli_ids === "string") {
        try {
          poliArray = JSON.parse(poli_ids);
        } catch (e) {
          console.log("❌ JSON PARSE POLI ERROR:", e);
          poliArray = [];
        }
      }

      if (poliArray.length === 0) {
        return res.json({ message: "Berita berhasil diperbarui (tanpa poli)" });
      }

      const values = poliArray.map((pid) => [id, pid]);
      const sqlPoli = `INSERT INTO berita_poli (berita_id, poli_id) VALUES ?`;

      db.query(sqlPoli, [values], (err3) => {
        if (err3) {
          console.log("❌ INSERT POLI ERROR:", err3);
          return res.status(500).json({ error: err3 });
        }

        return res.json({ message: "Berita berhasil diperbarui" });
      });
    });
  });
};

exports.getBerita = (req, res) => {
  const sql = `
        SELECT b.*, t.nama_tipe
        FROM berita b
        JOIN tipe_berita t ON b.tipe_id = t.id
        ORDER BY b.created_at DESC
    `;

  db.query(sql, (err, berita) => {
    if (err) return res.status(500).json({ error: err });

    const sqlPoli = `
            SELECT bp.berita_id, p.nama_poli 
            FROM berita_poli bp
            JOIN poli p ON bp.poli_id = p.id
        `;

    db.query(sqlPoli, (err2, poliRows) => {
      if (err2) return res.status(500).json({ error: err2 });

      berita.forEach((b) => {
        b.poli = poliRows
          .filter((p) => p.berita_id === b.id)
          .map((p) => p.nama_poli);
      });

      return res.json({ data: berita });
    });
  });
};

exports.getBeritaById = (req, res) => {
  const { id } = req.params;

  const sql = `
        SELECT b.*, t.nama_tipe
        FROM berita b
        JOIN tipe_berita t ON b.tipe_id = t.id
        WHERE b.id = ?
    `;

  db.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    if (rows.length === 0)
      return res.status(404).json({ message: "Berita tidak ditemukan" });

    const berita = rows[0];

    const sqlPoli = `
            SELECT p.id, p.nama_poli
            FROM berita_poli bp
            JOIN poli p ON p.id = bp.poli_id
            WHERE bp.berita_id = ?
        `;

    db.query(sqlPoli, [id], (err2, poli) => {
      if (err2) return res.status(500).json({ error: err2 });

      berita.poli = poli;
      return res.json(berita);
    });
  });
};

exports.deleteBerita = (req, res) => {
  const { id } = req.params;

  db.query(`DELETE FROM berita WHERE id = ?`, [id], (err) => {
    if (err) return res.status(500).json({ error: err });

    return res.json({ message: "Berita berhasil dihapus" });
  });
};

exports.getTipeBerita = (req, res) => {
  const sql = "SELECT * FROM tipe_berita";

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    return res.json({ data: rows });
  });
};
