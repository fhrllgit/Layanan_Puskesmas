// utils/emitAntrianUpdate.js
const db = require("../config/db");

const emitAntrianUpdate = (io) => {
  const today = new Date().toISOString().split("T")[0];
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
    if (err) return console.error("Emit antrian update error:", err);

    const poliSql = "SELECT id, nama_poli, prefix FROM poli";
    db.query(poliSql, (err2, poliList) => {
      if (err2) return console.error("Emit poli list error:", err2);

      const data = poliList.map((p) => {
        const antrian = results.find((a) => a.poli_id === p.id);
        return {
          poli_id: p.id,
          nama_poli: p.nama_poli,
          nomor_antrian: antrian ? antrian.nomor_antrian : null,
          nama_pasien: antrian ? antrian.nama_pasien : null,
        };
      });
      io.emit("antrian:update", data); 
    });
  });
};

module.exports = emitAntrianUpdate;
