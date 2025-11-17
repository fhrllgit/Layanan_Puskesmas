const db = require("../config/db");
const emitAntrianUpdate = require("../utils/emitAntrianUpdate");
const dayNumbers = {
  "Minggu": 0,
  "Senin": 1,
  "Selasa": 2,
  "Rabu": 3,
  "Kamis": 4,
  "Jumat": 5,
  "Sabtu": 6,
};


exports.getAllDokter = (req, res) => {
  const sql = "SELECT id, nama FROM users WHERE role = 'dokter'";
  db.query(sql, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Gagal mengambil data dokter" });
    res.json(results);
  });
};

// exports.tambahJadwal = (req, res) => {
//   const { dokter_id, poli_id, hari, jam_mulai, jam_selesai } = req.body;
//   if (!dokter_id || !poli_id || !hari || !jam_mulai || !jam_selesai) {
//     return res.status(400).json({ message: "Semua field wajib diisi" });
//   }
//   const sql = `
//     INSERT INTO jadwal_dokter (dokter_id, poli_id, hari, jam_mulai, jam_selesai)
//     VALUES (?, ?, ?, ?, ?)
//   `;

//   db.query(
//     sql,
//     [dokter_id, poli_id, hari, jam_mulai, jam_selesai],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res
//           .status(500)
//           .json({ message: "Gagal menambahkan jadwal dokter" });
//       }

//       res.status(201).json({
//         message: "Jadwal dokter berhasil ditambahkan",
//         id: result.insertId,
//       });
//     }
//   );
// };

// exports.updateJadwal = (req, res) => {
//   const { id } = req.params;
//   const { dokter_id, poli_id, hari, jam_mulai, jam_selesai } = req.body;

//   if (!dokter_id || !poli_id || !hari || !jam_mulai || !jam_selesai) {
//     return res.status(400).json({ message: "Semua field wajib diisi" });
//   }

//   const sql = `
//     UPDATE jadwal_dokter
//     SET dokter_id = ?, poli_id = ?, hari = ?, jam_mulai = ?, jam_selesai = ?
//     WHERE id = ?
//   `;
//   db.query(
//     sql,
//     [dokter_id, poli_id, hari, jam_mulai, jam_selesai, id],
//     (err, result) => {
//       if (err) {
//         console.error(err);
//         return res
//           .status(500)
//           .json({ message: "Gagal memperbarui jadwal dokter" });
//       }

//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: "Jadwal tidak ditemukan" });
//       }

//       res.status(200).json({ message: "Jadwal dokter berhasil diperbarui" });
//     }
//   );
// };
exports.tambahJadwal = (req, res) => {
  const { dokter_id, poli_id, hari, jam_mulai, jam_selesai } = req.body;

  if (!dokter_id || !poli_id || !hari || !jam_mulai || !jam_selesai) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  const hari_num = dayNumbers[hari];
  if (hari_num === undefined) {
    return res.status(400).json({ message: "Hari tidak valid" });
  }
  const sql = `
    INSERT INTO jadwal_dokter 
      (dokter_id, poli_id, hari, jam_mulai, jam_selesai, hari_num)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [dokter_id, poli_id, hari, jam_mulai, jam_selesai, hari_num],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Gagal menambahkan jadwal dokter" });
      }

      res.status(201).json({
        message: "Jadwal dokter berhasil ditambahkan",
        id: result.insertId,
      });
    }
  );
};

exports.updateJadwal = (req, res) => {
  const { id } = req.params;
  const { dokter_id, poli_id, hari, jam_mulai, jam_selesai } = req.body;

  if (!dokter_id || !poli_id || !hari || !jam_mulai || !jam_selesai) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  const hari_num = dayNumbers[hari];
  if (hari_num === undefined) {
    return res.status(400).json({ message: "Hari tidak valid" });
  }
  const sql = `
    UPDATE jadwal_dokter
    SET dokter_id = ?, poli_id = ?, hari = ?, jam_mulai = ?, jam_selesai = ?, hari_num = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [dokter_id, poli_id, hari, jam_mulai, jam_selesai, hari_num, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Gagal memperbarui jadwal dokter" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Jadwal tidak ditemukan" });
      }

      res.status(200).json({ message: "Jadwal dokter berhasil diperbarui" });
    }
  );
};

exports.deleteJadwal = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM jadwal_dokter WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal menghapus jadwal dokter" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Jadwal tidak ditemukan" });
    }

    res.status(200).json({ message: "Jadwal dokter berhasil dihapus" });
  });
};

exports.getJadwal = (req, res) => {
  const sql = `
    SELECT jd.*, u.nama AS nama_dokter, p.nama_poli
    FROM jadwal_dokter jd
    JOIN users u ON jd.dokter_id = u.id
    JOIN poli p ON jd.poli_id = p.id
    ORDER BY 
      FIELD(jd.hari, 'Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'),
      jd.jam_mulai ASC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Gagal mengambil data jadwal dokter" });
    }

    res.status(200).json({ data: results });
  });
};

// untuk account dokterrrr
exports.getJadwalSaya = (req, res) => {
  const dokterId = req.user.id; 

  const sql = `
    SELECT 
      jd.id,
      jd.dokter_id,
      jd.poli_id,
      p.nama_poli,
      jd.hari,
      jd.hari_num,
      jd.jam_mulai,
      jd.jam_selesai
    FROM jadwal_dokter jd
    JOIN poli p ON jd.poli_id = p.id
    WHERE jd.dokter_id = ?
    ORDER BY jd.hari_num ASC, jd.jam_mulai ASC
  `;

  db.query(sql, [dokterId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Gagal mengambil jadwal dokter" });
    }

    res.json({
      dokter_id: dokterId,
      jadwal: result
    });
  });
};


// sistem pasien
exports.getAntrianDokter = (req, res) => {
  const poliId = req.user.poli_id;
  const dokterId = req.user.id
  // const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const today = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
  const sql = `
    SELECT a.*, u.nama AS pasien_nama
    FROM antrian a
    JOIN users u ON a.pasien_id = u.id
    WHERE a.tanggal = ?
     AND a.poli_id = ?
     AND a.dokter_id = ? 
     AND a.status IN ('menunggu','dipanggil')
    ORDER BY a.nomor_antrian ASC
  `;
  const sqlPoli = `
    SELECT nama_poli 
    FROM poli 
    WHERE id = ?
  `;

  db.query(sql, [today, poliId, dokterId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    db.query(sqlPoli, [poliId], (err2, poliResult) => {
      if (err) return res.status(500).json({ message: "Database error"})
       res.json({
      poli_id: poliId,
      nama_poli: poliResult[0]?.nama_poli || null, 
      data: result
    });
    })
    
  });
};

exports.panggilPasien = (req, res) => {
  const antrianId = req.params.antrian_id;
  const io = req.io;

  const sql = `UPDATE antrian SET status='dipanggil', waktu_dipanggil=NOW() WHERE id=?`;
  db.query(sql, [antrianId], (err) => {
    if (err) return res.status(500).json({ message: "Gagal memanggil pasien" });
    emitAntrianUpdate(io);
    res.json({ message: "Pasien dipanggil" });
  });
};

exports.batalPasien = (req, res) => {
  const antrianId = req.params.antrian_id;
  const io = req.io;

  const sql = `UPDATE antrian SET status='menunggu', waktu_dipanggil=NULL WHERE id=?`;
  db.query(sql, [antrianId], (err) => {
    if (err) return res.status(500).json({ message: "Gagal batal pasien" });
    emitAntrianUpdate(io);
    res.json({ message: "Pasien dikembalikan ke menunggu" });
  });
};

exports.selesaiPasien = (req, res) => {
  const antrianId = req.params.antrian_id;
  const { keluhan, diagnosis, tindakan, items, keterangan } = req.body;
  const io = req.io;

  const sqlSelect = `SELECT * FROM antrian WHERE id=?`;
  db.query(sqlSelect, [antrianId], (err, antrianData) => {
    if (err || antrianData.length === 0)
      return res.status(404).json({ message: "Antrian tidak ditemukan" });
    const pasienId = antrianData[0].pasien_id;
    const dokterId = req.user.id;
    const poliId = antrianData[0].poli_id;

    const sqlInsertRekam = `
      INSERT INTO rekam_medis (pasien_id, dokter_id, poli_id, keluhan, diagnosis, tindakan, status)
      VALUES (?, ?, ?, ?, ?, ?, 'sudah_diperiksa')
    `;
    db.query(
      sqlInsertRekam,
      [pasienId, dokterId, poliId, keluhan, diagnosis, tindakan],
      (err1, resultRekam) => {
        if (err1)
          return res.status(500).json({ message: "Gagal membuat rekam medis" });
        const rekamId = resultRekam.insertId;

        const sqlInsertResep = `
        INSERT INTO resep_obat (rekam_id, pasien_id, dokter_id, status)
        VALUES (?, ?, ?, 'menunggu')
      `;
        db.query(
          sqlInsertResep,
          [rekamId, pasienId, dokterId],
          (err2, resultResep) => {
            if (err2)
              return res
                .status(500)
                .json({ message: "Gagal membuat resep obat" });

            const resepId = resultResep.insertId;

            if (items && items.length > 0) {
              const sqlInsertItem = `
            INSERT INTO resep_obat_item (resep_id, nama_obat, dosis, jumlah, keterangan)
            VALUES ?
          `;
              const values = items.map((obat) => [
                resepId,
                obat.nama_obat,
                obat.dosis || null,
                obat.jumlah || 1,
                obat.keterangan || null,
              ]);

              db.query(sqlInsertItem, [values], (err3) => {
                if (err3)
                  return res
                    .status(500)
                    .json({ message: "Gagal menyimpan item resep" });
                updateAntrian();
              });
            } else {
              updateAntrian();
            }
            function updateAntrian() {
              const sqlUpdateAntrian = `UPDATE antrian SET status='selesai' WHERE id=?`;
              db.query(sqlUpdateAntrian, [antrianId], (err4) => {
                if (err4)
                  return res
                    .status(500)
                    .json({ message: "Gagal update antrian" });
                io.emit("antrian:update", {
                  id: antrianId,
                  pasien_id: pasienId,
                  poli_id: poliId,
                  status: "selesai",
                });
                res.json({
                  message: "Rekam medis dan resep berhasil disimpan.",
                });
              });
            }
          }
        );
      }
    );
  });
};

exports.hapusAntrian = (req, res) => {
  const antrianId = req.params.id;
  const { keterangan } = req.body;
  const io = req.io;

  if (!keterangan || keterangan.trim() === "") {
    return res.status(400).json({ message: "Keterangan wajib diisi" });
  }
  const sql = `
    UPDATE antrian
    SET status = 'batal', keterangan = ?
    WHERE id = ?
  `;

  db.query(sql, [keterangan, antrianId], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal mengubah status antrian" });

    io.emit("antrian:update");

    res.json({
      message: "Antrian berhasil dibatalkan",
      alasan: keterangan
    });
  });
};
