const db = require("../config/db");
const moment = require("moment");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

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

exports.getChat = (req, res) => {
  const { konsultasi_id } = req.params;
  const dokter_id = req.user.id;

  // Tandai chat sudah dibaca
  const sqlUpdate = `UPDATE konsultasi_chat SET is_read = 1 WHERE konsultasi_id = ? AND sender_id != ?`;
  db.query(sqlUpdate, [konsultasi_id, dokter_id]);

  // Ambil semua chat termasuk type & resep_id
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
      type: r.type, // tambahkan ini
      resep_id: r.resep_id, // tambahkan ini
      created_at: r.created_at,
    }));

    return res.status(200).json({ data: formatted });
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
      total: result[0].total,
    });
  });
};

exports.kirimResep = async (req, res) => {
  try {
    console.log("=== DEBUG BACKEND: DATA MASUK ===");
    console.log(req.body);

    const { konsultasi_id, obat_list, pasien_id } = req.body;
    const dokter_id = req.user.id;

    if (!obat_list || obat_list.length === 0) {
      return res.status(400).json({ msg: "List obat kosong" });
    }

    const sqlCreateResep = `
      INSERT INTO resep_konsultasi (konsultasi_id, pasien_id, dokter_id, status, tanggal)
      VALUES (?, ?, ?, 'menunggu', NOW())
    `;

    const resultResep = await new Promise((resolve, reject) => {
      db.query(
        sqlCreateResep,
        [konsultasi_id, pasien_id, dokter_id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    const resep_id = resultResep.insertId;

    const sqlItem = `
      INSERT INTO resep_konsultasi_item 
      (resep_konsultasi_id, nama_obat, dosis, jumlah, keterangan, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `;

    for (const item of obat_list) {
      await new Promise((resolve, reject) => {
        db.query(
          sqlItem,
          [resep_id, item.nama_obat, item.dosis, item.jumlah, item.keterangan],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
    }

    const sqlChat = `
      INSERT INTO konsultasi_chat (konsultasi_id, sender_id, message, type, resep_id)
      VALUES (?, ?, ?, 'resep', ?)
    `;
    const messageText =
      "[RESEP]";

    await new Promise((resolve, reject) => {
      db.query(
        sqlChat,
        [konsultasi_id, dokter_id, messageText, resep_id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    res.status(200).json({
      msg: "Resep online berhasil dikirim",
      resep_id,
    });
  } catch (err) {
    console.log("ERROR KIRIM RESEP:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getResepById = (req, res) => {
  const { id } = req.params;

  const sqlResep = `SELECT * FROM resep_konsultasi WHERE id=?`;
  const sqlItem = `SELECT * FROM resep_konsultasi_item WHERE resep_konsultasi_id=?`;

  db.query(sqlResep, [id], (err, resep) => {
    if (err) return res.status(500).json({ msg: err.message });

    db.query(sqlItem, [id], (err, items) => {
      if (err) return res.status(500).json({ msg: err.message });

      res.json({
        resep: resep[0],
        items,
      });
    });
  });
};

exports.tebusPuskesmas = (req, res) => {
  const { id } = req.params; // resep_id
  const pasien_id = req.user.id;

  const sql = `
    UPDATE resep_konsultasi 
    SET status = 'menunggu', apoteker_id = NULL 
    WHERE id = ? AND pasien_id = ?
  `;

  db.query(sql, [id, pasien_id], (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });

    // chat notifikasi
    const sqlChat = `
      INSERT INTO konsultasi_chat (konsultasi_id, sender_id, message, type)
      VALUES ((SELECT konsultasi_id FROM resep_konsultasi WHERE id=?), ?, '[RESEP] Pasien ingin menebus resep di Apotek Puskesmas', 'resep')
    `;

    db.query(sqlChat, [id, pasien_id]);

    res.json({
      msg: "Resep dikirim ke Apotek Puskesmas (online)",
      status: "menunggu",
    });
  });
};

exports.tebusLuar = (req, res) => {
  try {
    const { id } = req.params;
    const pasien_id = req.user?.id;

    if (!pasien_id) return res.status(401).json({ msg: "Unauthorized" });

    const sqlResep = `SELECT * FROM resep_konsultasi WHERE id = ? AND pasien_id = ?`;
    const sqlItems = `SELECT * FROM resep_konsultasi_item WHERE resep_konsultasi_id = ?`;

    db.query(sqlResep, [id, pasien_id], (err, resepData) => {
      if (err) return res.status(500).json({ msg: err.message });
      if (resepData.length === 0)
        return res.status(404).json({ msg: "Resep tidak ditemukan" });

      db.query(sqlItems, [id], (err, items) => {
        if (err) return res.status(500).json({ msg: err.message });

        const doc = new PDFDocument({ margin: 40, size: "A4" });
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=resep_${id}.pdf`
        );
        res.setHeader("Content-Type", "application/pdf");

        doc.pipe(res);

        const r = resepData[0];
        const tanggal = r.tanggal
          ? new Date(r.tanggal).toLocaleDateString()
          : "N/A";
        doc.text(`Tanggal: ${tanggal}`);
        doc.fontSize(20).text("PUSKESMAS SISMA", { align: "center" });
        doc.fontSize(16).text("Resep Dokter", { align: "center" });
        doc.moveDown();
        doc
          .fontSize(12)
          // .text(`ID Resep: ${id}`)
          .text(`Nama Dokter: ${r.dokter_nama || "N/A"}`)
          // .text(`Tanggal: ${tanggal}`)
          .moveDown();

        const tableTop = doc.y;
        const itemSpacing = 20;
        doc.fontSize(12).text("No", 40, tableTop);
        doc.text("Nama Obat", 80, tableTop);
        doc.text("Dosis", 250, tableTop);
        doc.text("Jumlah", 320, tableTop);
        doc.text("Keterangan", 390, tableTop);
        doc.moveDown();

        doc
          .moveTo(40, tableTop + 15)
          .lineTo(550, tableTop + 15)
          .stroke();

        let y = tableTop + 25;
        items.forEach((item, i) => {
          doc.text(i + 1, 40, y);
          doc.text(item.nama_obat || "-", 80, y);
          doc.text(item.dosis || "-", 250, y);
          doc.text(item.jumlah || "-", 320, y);
          doc.text(item.keterangan || "-", 390, y);
          y += itemSpacing;
        });

        doc.end();
      });
    });
  } catch (err) {
    console.error("UNCAUGHT ERROR:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getStatusDokter = (req, res) => {
  const dokterId = req.params.id;

  const sql = "SELECT status FROM dokter_status WHERE dokter_id = ? ORDER BY updated_at DESC LIMIT 1";

  db.query(sql, [dokterId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Status dokter tidak ditemukan",
        status: "offline"
      });
    }

    return res.json({
      success: true,
      dokter_id: dokterId,
      status: result[0].status
    });
  });
};