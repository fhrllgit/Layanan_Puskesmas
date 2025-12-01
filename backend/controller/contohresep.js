const db = require("../config/db"); 
const moment = require("moment");

exports.mulaiChat = (req, res) => {
  const pasien_id = req.user.id;
  const { dokter_id, keluhan } = req.body;

  const sqlCheck = `
    SELECT id 
    FROM konsultasi_online
    WHERE pasien_id = ? 
      AND dokter_id = ?
      AND status = 'ongoing'
    LIMIT 1
  `;

  db.query(sqlCheck, [pasien_id, dokter_id], (err, rows) => {
    if (err) return res.status(500).json({ msg: err.message });

    if (rows.length > 0) {
      return res.status(200).json({
        msg: "Konsultasi masih berlangsung",
        konsultasi_id: rows[0].id,
      });
    }
    const sqlInsert = `
      INSERT INTO konsultasi_online (pasien_id, dokter_id, keluhan)
      VALUES (?, ?, ?)
    `;
    db.query(sqlInsert, [pasien_id, dokter_id, keluhan], (err, result) => {
      if (err) return res.status(500).json({ msg: err.message });

      const konsultasi_id = result.insertId;
      const sqlStatus = `UPDATE dokter_status SET status='busy' WHERE dokter_id=?`;
      db.query(sqlStatus, [dokter_id]);

      return res.status(200).json({
        msg: "Konsultasi dimulai",
        konsultasi_id,
      });
    });
  });
};

exports.kirimPesan = (req, res) => {
  const { konsultasi_id, pesan } = req.body;
  const sender_id = req.user.id;
  const message = pesan;

  const sqlCheck = `SELECT status FROM konsultasi_online WHERE id=?`;
  db.query(sqlCheck, [konsultasi_id], (err, results) => {
    if (err) return res.status(500).json({ msg: err.message });
    if (!results.length)
      return res.status(404).json({ msg: "Konsultasi tidak ditemukan" });

    if (results[0].status !== "ongoing") {
      return res.status(400).json({ msg: "Konsultasi sudah selesai" });
    }

    const sql = `INSERT INTO konsultasi_chat (konsultasi_id, sender_id, message) VALUES (?, ?, ?)`;
    db.query(sql, [konsultasi_id, sender_id, message], (err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      console.log("🔥 Emit ke room:", `konsultasi_${konsultasi_id}`);
      console.log("📤 Data dikirim:", {
        id: result.insertId,
        konsultasi_id,
        sender_id,
        sender: req.user.role,
        pesan: message,
      });

      req.io.to(`konsultasi_${konsultasi_id}`).emit("new_message", {
        id: result.insertId,
        konsultasi_id,
        sender_id,
        sender: req.user.role, 
        pesan: message, 
        created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
      });

      // resep tebus 
      const createResepFromChat = (konsultasi_id, sender_id, message) => {
  // Pastikan pengirim dokter
  db.query("SELECT role FROM users WHERE id=?", [sender_id], (err, rows) => {
    if(err) return console.log(err);
    if(rows[0].role !== 'dokter') return;

    // Cek apakah chat mengandung keyword "Resep:"
    if(message.toLowerCase().includes("resep:")) {
      // Ambil pasien_id dari konsultasi
      db.query("SELECT pasien_id FROM konsultasi_online WHERE id=?", [konsultasi_id], (err2, rows2) => {
        if(err2) return console.log(err2);
        const pasien_id = rows2[0].pasien_id;

        // Insert ke resep_obat
        const sqlResep = `
          INSERT INTO resep_obat (konsultasi_id, pasien_id, dokter_id, status, tanggal)
          VALUES (?, ?, ?, 'pending', NOW())
        `;
        db.query(sqlResep, [konsultasi_id, pasien_id, sender_id], (err3, result) => {
          if(err3) return console.log(err3);
          const resep_id = result.insertId;

          // Insert item resep (sederhana, bisa dikembangkan parsing)
          const sqlItem = `
            INSERT INTO resep_obat_item (resep_id, nama_obat, dosis, jumlah, keterangan, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
          `;
          db.query(sqlItem, [resep_id, message, 1, 1, "ikuti petunjuk dokter"]);
        });
      });
    }
  });
};


      res.status(200).json({ msg: "Pesan terkirim" });
    });
  });
};

exports.akhiriKonsultasi = (req, res) => {
  const { konsultasi_id } = req.body;

  // update status konsultasi
  const sql = `UPDATE konsultasi_online SET status='finished', end_time=NOW() WHERE id=?`;
  db.query(sql, [konsultasi_id], (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });

    // ambil dokter_id untuk update status dokter
    const sqlDokter = `SELECT dokter_id FROM konsultasi_online WHERE id=?`;
    db.query(sqlDokter, [konsultasi_id], (err, results) => {
      if (!err && results.length) {
        const dokter_id = results[0].dokter_id;
        const sqlStatus = `UPDATE dokter_status SET status='online' WHERE dokter_id=?`;
        db.query(sqlStatus, [dokter_id]);
      }
    });

    // emit event selesai konsultasi
    req.io
      .to(`konsultasi_${konsultasi_id}`)
      .emit("konsultasi-finished", { konsultasi_id });

    return res.status(200).json({ msg: "Konsultasi selesai" });
  });
};

// exports.getChat = (req, res) => {
//   const { konsultasi_id } = req.params;
//   const dokter_id = req.user.id;

//   const sqlUpdate = `UPDATE konsultasi_chat SET is_read = 1 WHERE konsultasi_id = ? AND sender_id != ?`;
//   db.query(sqlUpdate, [konsultasi_id, dokter_id]);

//   const sql = `
//     SELECT c.*, u.nama, u.role 
//     FROM konsultasi_chat c
//     JOIN users u ON c.sender_id = u.id
//     WHERE konsultasi_id=?
//     ORDER BY created_at ASC
//   `;
//   db.query(sql, [konsultasi_id], (err, results) => {
//     if (err) return res.status(500).json({ msg: err.message });
//     const formatted = results.map((r) => ({
//       id: r.id,
//       konsultasi_id: r.konsultasi_id,
//       sender_id: r.sender_id,
//       sender: r.role,
//       pesan: r.message,
//       created_at: r.created_at,
//     }));

//     return res.status(200).json({ data: formatted });
//   });
// };

exports.getChat = (req, res) => {
  const { konsultasi_id } = req.params;
  const user_id = req.user.id;

  // Tandai pesan sebagai terbaca
  const sqlUpdate = `UPDATE konsultasi_chat SET is_read = 1 WHERE konsultasi_id = ? AND sender_id != ?`;
  db.query(sqlUpdate, [konsultasi_id, user_id]);

  const sql = `
    SELECT c.*, u.nama, u.role 
    FROM konsultasi_chat c
    JOIN users u ON c.sender_id = u.id
    WHERE konsultasi_id=?
    ORDER BY created_at ASC
  `;
  db.query(sql, [konsultasi_id], (err, results) => {
    if (err) return res.status(500).json({ msg: err.message });

    const formatted = results.map((r) => ({
      id: r.id,
      konsultasi_id: r.konsultasi_id,
      sender_id: r.sender_id,
      sender: r.role,
      pesan: r.message,
      created_at: r.created_at,
      isResep: r.message.toLowerCase().startsWith("resep:") // tambahkan flag
    }));

    return res.status(200).json({ data: formatted });
  });
};

exports.getResep = (req, res) => {
  const { konsultasi_id } = req.params;

  const sql = `
    SELECT r.id AS resep_id, r.status, r.tanggal, 
           i.nama_obat, i.dosis, i.jumlah, i.keterangan
    FROM resep_obat r
    LEFT JOIN resep_obat_item i ON r.id = i.resep_id
    WHERE r.rekam_id = ?
  `;
  
  db.query(sql, [konsultasi_id], (err, results) => {
    if(err) {
      console.error("Error query resep:", err);
      return res.status(500).json({ msg: err.message });
    }
    res.status(200).json({ data: results });
  });
};

exports.createResep = (req, res) => {
  const { konsultasi_id, obat } = req.body; // obat = array [{nama_obat,dosis,jumlah,keterangan}]
  const dokter_id = req.user.id;

  const sqlResep = "INSERT INTO resep_obat (konsultasi_id,dokter_id,status,tanggal) VALUES (?,?,?,NOW())";
  db.query(sqlResep, [konsultasi_id,dokter_id,'aktif'], (err,result)=>{
    if(err) return res.status(500).json({msg: err.message});
    const resep_id = result.insertId;

    const values = obat.map(o => [resep_id,o.nama_obat,o.dosis,o.jumlah,o.keterangan,new Date()]);
    const sqlItem = "INSERT INTO resep_obat_item (resep_id,nama_obat,dosis,jumlah,keterangan,created_at) VALUES ?";
    db.query(sqlItem,[values], (err2)=>{
      if(err2) return res.status(500).json({msg: err2.message});
      res.status(200).json({msg:"Resep berhasil dibuat"});
    });
  });
};



exports.daftarKonsultasiAktif = (req, res) => {
  const dokter_id = req.user.id;
  const sql = `
    SELECT k.id AS konsultasi_id, k.pasien_id, u.nama AS pasien_nama,
           COUNT(c.id) AS unread_count
    FROM konsultasi_online k
    LEFT JOIN konsultasi_chat c 
      ON k.id = c.konsultasi_id AND c.is_read = 0 AND c.sender_id != ?
    JOIN users u ON k.pasien_id = u.id
    WHERE k.dokter_id = ? AND k.status = 'ongoing'
    GROUP BY k.id
  `;
  db.query(sql, [dokter_id, dokter_id], (err, results) => {
    if (err) return res.status(500).json({ msg: err.message });
    return res.status(200).json({ data: results });
  });
};
 
exports.tandaiDibaca = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const sql = `
    UPDATE konsultasi_chat 
    SET is_read = 1 
    WHERE konsultasi_id = ? AND sender_id != ?
  `;

  db.query(sql, [id, user_id], (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });

    res.status(200).json({ msg: "Chat ditandai dibaca" });
  });
};

exports.getKonsultasiDetail = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT k.id AS konsultasi_id,
           u.id AS dokter_id,
           u.nama AS dokter_nama,
           u.avatar AS foto
    FROM konsultasi_online k
    JOIN users u ON u.id = k.dokter_id AND u.role = 'dokter'
    WHERE k.id = ?
    LIMIT 1
  `;

  db.query(sql, [id], (err, rows) => {
    if (err) {
      console.error("SQL Error:", err); 
      return res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
    if (rows.length === 0) {
      return res.status(404).json({ msg: "Konsultasi tidak ditemukan" });
    }

    const dokter = {
      nama: rows[0].dokter_nama,
      foto: rows[0].foto || null,
      status: "Online",
    };

    return res.status(200).json({ dokter });
  });
};

exports.getTotalKonsultasiHariIni = (req, res) => {
  const dokterId = req.params.dokter_id; 

  const sql = `
    SELECT COUNT(*) AS total
    FROM konsultasi_chat kc
    JOIN konsultasi_online ko ON kc.konsultasi_id = ko.id
    WHERE ko.dokter_id = ?
    AND DATE(kc.created_at) = CURDATE()
  `;

  db.query(sql, [dokterId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error server" });
    }
    res.json({
      success: true,
      total: result[0].total
    });
  });
};


