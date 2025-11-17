const db = require("../config/db");

exports.tambahAntrian = (req, res) => {
  const { pasien_id, poli_id } = req.body;
  const io = req.io;
  // const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const today = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;

  const cekDuplikat = `SELECT * FROM antrian WHERE pasien_id = ? AND poli_id = ? AND tanggal = ?`;
  db.query(cekDuplikat, [pasien_id, poli_id, today], (err, duplikat) => {
    if (err) {
      console.error("❌ Error cek duplikat:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (duplikat.length > 0)
      return res
        .status(400)
        .json({ message: "Anda sudah mendaftar di poli ini hari ini" });

    const sqlPoli = `SELECT nama_poli, prefix FROM poli WHERE id = ?`;
    db.query(sqlPoli, [poli_id], (err, poliResult) => {
      if (err) {
        console.error("❌ Error ambil poli:", err);
        return res.status(500).json({ message: "Database error" });
      }
      if (poliResult.length === 0)
        return res.status(400).json({ message: "Poli tidak ditemukan" });

      const { prefix, nama_poli } = poliResult[0];

      const hitungAntrian = `SELECT COUNT(*) AS jumlah FROM antrian WHERE poli_id = ? AND tanggal = ?`;
      db.query(hitungAntrian, [poli_id, today], (err, countResult) => {
        if (err) {
          console.error("❌ Error hitung antrian:", err);
          return res.status(500).json({ message: "Database error" });
        }
        const nomorUrut = countResult[0].jumlah + 1;
        const cekKuota = `SELECT max_antrian, jam_mulai, jam_selesai FROM kuota_poli WHERE poli_id = ? AND tanggal = ?`;
        db.query(cekKuota, [poli_id, today], (err, kuotaResult) => {
          if (err) {
            console.error("❌ Error cek kuota:", err);
            return res.status(500).json({ message: "Database error" });
          }
          if (kuotaResult.length === 0)
            return res
              .status(400)
              .json({ message: "Belum ada kuota untuk poli ini hari ini" });

          // const maxAntrian = kuotaResult[0].max_antrian;
          const { max_antrian, jam_mulai, jam_selesai } = kuotaResult[0];
          const [jamMulaiH, jamMulaiM, jamMulaiS] = jam_mulai
            .split(":")
            .map(Number);
          const [jamSelesaiH, jamSelesaiM, jamSelesaiS] = jam_selesai
            .split(":")
            .map(Number);

          const sekarang = new Date();
          const startTime = new Date(
            sekarang.getFullYear(),
            sekarang.getMonth(),
            sekarang.getDate(),
            jamMulaiH,
            jamMulaiM,
            jamMulaiS
          );
          const endTime = new Date(
            sekarang.getFullYear(),
            sekarang.getMonth(),
            sekarang.getDate(),
            jamSelesaiH,
            jamSelesaiM,
            jamSelesaiS
          );

          if (sekarang < startTime) {
            const formatJam = `${jamMulaiH
              .toString()
              .padStart(2, "0")}:${jamMulaiM.toString().padStart(2, "0")}`;
            return res.status(400).json({
              message: `Antrian belum dibuka. Coba lagi jam ${formatJam}`,
            });
          }
          if (sekarang > endTime) {
            return res
              .status(400)
              .json({ message: "Antrian sudah ditutup untuk hari ini" });
          }

          // const now = new Date();
          // const jamMulai = new Date(`${today}T${jam_mulai}`);
          // const jamSelesai = new Date(`${today}T${jam_selesai}`);
          // if (now < jamMulai) {
          //   const formatJam = jam_mulai.slice(0,5)
          //   return res.status(400).json({
          //     message: `Antrian belum dibuka. Bisa mulai jam ${jam_mulai}`,
          //   });
          // }
          // if (now > jamSelesai) {
          //   return res
          //     .status(400)
          //     .json({ message: "Antrian sudah ditutup untuk hari ini" });
          // }

          if (nomorUrut > max_antrian) {
            return res
              .status(400)
              .json({ message: "Kuota antrian sudah penuh" });
          }
          const hari = new Date()
            .toLocaleString("id-ID", { weekday: "long" })
            .toLowerCase();
          const mapHari = {
            senin: "Senin",
            selasa: "Selasa",
            rabu: "Rabu",
            kamis: "Kamis",
            jumat: "Jumat",
            sabtu: "Sabtu",
            minggu: "Minggu",
          };
          const hariDB = mapHari[hari];

          const cekDokter = `SELECT dokter_id FROM jadwal_dokter WHERE poli_id = ? AND hari = ?`;
          db.query(cekDokter, [poli_id, hariDB], (err, dokterResult) => {
            if (err) {
              console.error("❌ Error cek dokter:", err);
              return res.status(500).json({ message: "Database error" });
            }
            if (dokterResult.length === 0)
              return res
                .status(400)
                .json({ message: "Tidak ada dokter jaga hari ini" });
            const dokter_id = dokterResult[0].dokter_id;
            const nomor_antrian = `${prefix}${String(nomorUrut).padStart(
              3,
              "0"
            )}`;

            const insertQuery = `
              INSERT INTO antrian (pasien_id, dokter_id, poli_id, nomor_antrian, tanggal, status)
              VALUES (?, ?, ?, ?, ?, ?)`;
            db.query(
              insertQuery,
              [pasien_id, dokter_id, poli_id, nomor_antrian, today, "menunggu"],
              (err, result) => {
                if (err) {
                  console.error("❌ Error insert antrian:", err);
                  return res
                    .status(500)
                    .json({ message: "Gagal menambah antrian" });
                }

                const newAntrian = {
                  id: result.insertId,
                  pasien_id,
                  dokter_id,
                  poli_id,
                  nomor_antrian,
                  tanggal: today,
                  status: "menunggu",
                  nama_poli,
                };
                if (io) io.emit("antrian:baru", newAntrian);

                res.status(200).json({
                  message: "Berhasil menambah antrian",
                  data: newAntrian,
                });
              }
            );
          });
        });
      });
    });
  });
};

exports.getAntrianList = (req, res) => {
  const { role, id } = req.user;

  let sql = `
    SELECT 
      a.id,
      a.nomor_antrian,
      a.tanggal,
      a.status,
      a.created_at,
      u.nama AS nama_pasien,
      d.nama AS nama_dokter,
      p.nama_poli,
      p.prefix
    FROM antrian a
    JOIN users u ON a.pasien_id = u.id
    JOIN users d ON a.dokter_id = d.id
    JOIN poli p ON a.poli_id = p.id
  `;

  if (role === "dokter") {
    sql += ` WHERE a.dokter_id = ? ORDER BY a.tanggal DESC, a.nomor_antrian ASC`;
  } else {
    sql += ` ORDER BY a.tanggal DESC, a.nomor_antrian ASC`;
  }

  const params = role === "dokter" ? [id] : [];

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("❌ Error ambil data antrian:", err);
      return res.status(500).json({ message: "Gagal mengambil data antrian" });
    }

    res.status(200).json({
      message: "Daftar antrian berhasil diambil",
      data: results,
    });
  });
};

exports.getAntrianSekarang = (req, res) => {
  // const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const today = `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
  const sql = `
    SELECT 
      a.poli_id,
      p.nama_poli,
      p.prefix,
      a.nomor_antrian,
      u.nama AS nama_pasien
    FROM antrian a
    JOIN poli p ON a.poli_id = p.id
    JOIN users u ON a.pasien_id = u.id
    WHERE a.tanggal = ? AND a.status = 'dipanggil'
    ORDER BY a.poli_id, a.nomor_antrian ASC
  `;

  db.query(sql, [today], (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Gagal ambil antrian semua poli" });

    const poliSql = "SELECT id, nama_poli, prefix FROM poli";
    db.query(poliSql, (err2, poliList) => {
      if (err2)
        return res.status(500).json({ message: "Gagal ambil list poli" });

      const data = poliList.map((p) => {
        const antrian = results.find((a) => a.poli_id === p.id);
        return {
          poli_id: p.id,
          nama_poli: p.nama_poli,
          nomor_antrian: antrian ? antrian.nomor_antrian : null,
          nama_pasien: antrian ? antrian.nama_pasien : null,
        };
      });

      res.status(200).json({ data });
    });
  });
};

exports.getAntrianByPasien = (req, res) => {
  const pasien_id = req.params.id;
  // console.log("debug err bngst Request GET /api/antrianPoli/", pasien_id);

  const sql = `
    SELECT a.*, p.nama_poli 
    FROM antrian a
    JOIN poli p ON a.poli_id = p.id
    WHERE a.pasien_id = ? AND a.status = 'menunggu'
    ORDER BY a.id DESC
  `;

  db.query(sql, [pasien_id], (err, results) => {
    if (err) {
      console.error("Gagal ambil antrian pasien:", err);
      return res.status(500).json({ message: "Kesalahan server" });
    }
    // console.log("debug new query:", results);

    if (results.length === 0) {
      // console.log("debug ga ad antrian aktif psien:", pasien_id);
      return res.json([]);
    }

    res.status(200).json({ data: results });
  });
};
