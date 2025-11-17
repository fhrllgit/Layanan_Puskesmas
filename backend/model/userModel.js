const db = require("../config/db");

const User = {
  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], callback);
  },

  findById: (id, callback) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.query(sql, [id], callback);
  },

  create: (data, callback) => {
    const sql = `
      INSERT INTO users 
      (nama, jenis_kelamin, email, password, no_hp, alamat_lengkap, kecamatan, kota, provinsi, nik, no_bpjs, avatar, ktp_file, role, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    db.query(
      sql,
      [
        data.nama,
        data.jenis_kelamin,
        data.email,
        data.password,
        data.no_hp,
        data.alamat_lengkap,
        data.kecamatan,
        data.kota,
        data.provinsi,
        data.nik,
        data.no_bpjs || null,
        data.avatar || null,
        data.ktp_file || null,
        data.role || "pasien",
        data.status || "pending",
      ],
      callback
    );
  },
};

module.exports = User;
