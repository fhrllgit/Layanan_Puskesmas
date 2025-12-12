const db = require("../config/db");
const cron = require("node-cron");

cron.schedule("0 * * * *", () => {
  const sql = `
    UPDATE resep_obat 
    SET status = 'expired' 
    WHERE status = 'siap_diambil' 
    AND TIMESTAMPDIFF(HOUR, siap_diambil_at, NOW()) >= 24
  `;
  db.query(sql, (err, result) => {
    if (err) console.error("Error cron expired:", err);
    else
      console.log(
        "Cron expired: ",
        result.affectedRows,
        "resep diubah menjadi expired"
      );
  });
});

// cron.schedule("* * * * *", () => {
//   const sql = `
//     UPDATE resep_obat
//     SET status = 'expired'
//     WHERE status = 'siap_diambil'
//     AND TIMESTAMPDIFF(MINUTE, siap_diambil_at, NOW()) >= 1
//   `;
//   db.query(sql, (err, result) => {
//     if (err) console.error("Error cron expired:", err);
//     else console.log("Cron expired: ", result.affectedRows, "resep diubah menjadi expired");
//   });
// });

exports.getResep = (req, res) => {
  const sql = `
    SELECT r.*, p.nama AS pasien_nama, d.nama AS dokter_nama
    FROM resep_obat r
    JOIN users p ON p.id = r.pasien_id
    JOIN users d ON d.id = r.dokter_id
    ORDER BY r.tanggal ASC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
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

exports.updateStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const apoteker_id = req.user.id;
  const allowedStatus = ["siap_diambil", "selesai", "tidak_tersedia"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ msg: "Status tidak valid" });
  }

  const sqlGet = "SELECT status FROM resep_obat WHERE id = ?";
  db.query(sqlGet, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.sqlMessage || err });
    if (rows.length === 0)
      return res.status(404).json({ msg: "Resep tidak ditemukan" });

    const currentStatus = rows[0].status;
    if (currentStatus === "expired") {
      return res
        .status(400)
        .json({ msg: "Resep sudah expired dan tidak bisa diproses" });
    }
    let sqlUpdate, params;
    if (status === "siap_diambil") {
      sqlUpdate = `
        UPDATE resep_obat
        SET status = ?, apoteker_id = ?, siap_diambil_at = NOW()
        WHERE id = ?
      `;
      params = [status, apoteker_id, id];
    } else {
      sqlUpdate = `
        UPDATE resep_obat
        SET status = ?, apoteker_id = ?
        WHERE id = ?
      `;
      params = [status, apoteker_id, id];
    }

    db.query(sqlUpdate, params, (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage || err });
      const sqlAfter = "SELECT * FROM resep_obat WHERE id = ?";
      db.query(sqlAfter, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        const resep = result[0];
        req.io.emit("resepStatusUpdated", {
          id: resep.id,
          pasien_id: resep.pasien_id,
          dokter_id: resep.dokter_id,
          status: resep.status,
          siap_diambil_at: resep.siap_diambil_at,
          tanggal: resep.tanggal,
        });

        return res.json({ msg: "Status berhasil diperbarui" });
      });
    });
  });
};

// bagian konsultasi resep dokter
cron.schedule("0 * * * *", () => {
  const sql = `
    UPDATE resep_konsultasi
    SET status = 'expired'
    WHERE status = 'siap_diambil'
    AND TIMESTAMPDIFF(HOUR, siap_diambil_at, NOW()) >= 24
  `;
  db.query(sql, (err, result) => {
    if (err) console.error("Error cron expired resep_konsultasi:", err);
    else
      console.log(
        "Cron expired resep_konsultasi:",
        result.affectedRows,
        "resep diubah menjadi expired"
      );
  });
});

// cron.schedule("* * * * *", () => {
//   const sql = `
//     UPDATE resep_konsultasi
//     SET status = 'expired'
//     WHERE status = 'siap_diambil'
//     AND TIMESTAMPDIFF(MINUTE, siap_diambil_at, NOW()) >= 1
//   `;
//   db.query(sql, (err, result) => {
//     if (err) console.error("Error cron expired resep_konsultasi:", err);
//     else console.log("Cron expired resep_konsultasi:", result.affectedRows, "resep diubah menjadi expired");
//   });
// });

exports.getResepKonsultasi = (req, res) => {
  const sql = `
    SELECT r.*, 
           p.nama AS pasien_nama,
           d.nama AS dokter_nama
    FROM resep_konsultasi r
    JOIN users p ON p.id = r.pasien_id
    JOIN users d ON d.id = r.dokter_id
    ORDER BY r.tanggal DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getDetailResepKonsultasi = (req, res) => {
  const { id } = req.params;

  const sqlResep = `
    SELECT r.*, p.nama AS pasien_nama, d.nama AS dokter_nama
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

exports.updateStatusKonsultasi = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const apoteker_id = req.user.id;
  const allowed = ["siap_diambil", "selesai", "tidak_tersedia"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ msg: "Status tidak valid" });
  }
  const sqlGet = `SELECT * FROM resep_konsultasi WHERE id = ?`;
  db.query(sqlGet, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    if (rows.length === 0)
      return res.status(404).json({ msg: "Resep tidak ditemukan" });

    const current = rows[0];
    if (current.status === "expired") {
      return res.status(400).json({ msg: "Resep sudah expired" });
    }

    let sqlUpdate;
    let params;

    if (status === "siap_diambil") {
      sqlUpdate = `
        UPDATE resep_konsultasi
        SET status = ?, apoteker_id = ?, siap_diambil_at = NOW()
        WHERE id = ?
      `;
      params = [status, apoteker_id, id];
    } else {
      sqlUpdate = `
        UPDATE resep_konsultasi
        SET status = ?, apoteker_id = ?
        WHERE id = ?
      `;
      params = [status, apoteker_id, id];
    }

    db.query(sqlUpdate, params, (err) => {
      if (err) return res.status(500).json({ error: err.sqlMessage });
      const sqlAfter = `SELECT * FROM resep_konsultasi WHERE id = ?`;

      db.query(sqlAfter, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        const resep = result[0];
        req.io.emit("resepKonsultasiStatusUpdated", {
          id: resep.id,
          pasien_id: resep.pasien_id,
          dokter_id: resep.dokter_id,
          apoteker_id: resep.apoteker_id,
          status: resep.status,
          tanggal: resep.tanggal,
          siap_diambil_at: resep.siap_diambil_at,
        });

        res.json({ msg: "Status berhasil diperbarui" });
      });
    });
  });
};
