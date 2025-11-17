const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const response = require("../response");
const db = require("../config/db");
const { sendRejectionEmail } = require("../config/emailService");

const JWT_SECRET = "secret123";
let tokenBlacklist = [];

exports.register = (req, res) => {
  const {
    nama,
    jenis_kelamin,
    email,
    password,
    confirm_password,
    no_hp,
    alamat_lengkap,
    kecamatan,
    kota,
    provinsi,
    nik,
    no_bpjs,
    avatar,
  } = req.body;

  const ktp_file = req.file ? req.file.filename : null;

  if (
    !nama ||
    !jenis_kelamin ||
    !email ||
    !password ||
    !confirm_password ||
    !no_hp ||
    !alamat_lengkap ||
    !kecamatan ||
    !kota ||
    !provinsi ||
    !nik ||
    !ktp_file
  ) {
  }

  if (password.length < 8)
    return response(400, null, "Password minimal 8 karakter", res);

  if (password !== confirm_password)
    return response(400, null, "Konfirmasi password tidak cocok", res);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validEmail.test(email)) {
    return response(
      400,
      null,
      "Format email tidak valid. Gunakan email yang benar.",
      res
    );
  }

  User.findByEmail(email, async (err, results) => {
    if (err) return response(500, null, "Server error", res);
    if (results.length > 0)
      return response(400, null, "Email sudah terdaftar", res);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      nama,
      jenis_kelamin,
      email,
      password: hashedPassword,
      no_hp,
      alamat_lengkap,
      kecamatan,
      kota,
      provinsi,
      nik,
      no_bpjs: no_bpjs || null,
      avatar: avatar || null,
      ktp_file,
      role: "pasien",
      status: "pending",
    };

    User.create(newUser, (err, results) => {
      if (err) return response(500, null, "Gagal register", res);
      const userId = results.insertId;
      if (req.io) {
        req.io.emit("user_pending_update", {
          id: userId,
          nama: newUser.nama,
          email: newUser.email,
          status: newUser.status,
        });
        console.log("emit: user pending updateee");
      }
      response(
        201,
        null,
        "Registrasi berhasil. Akun sedang diproses dan menunggu validasi admin.",
        res
      );
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return response(400, null, "Isi email dan password", res);

  User.findByEmail(email, async (err, results) => {
    if (err) return response(500, null, "Server error", res);
    if (results.length === 0)
      return response(400, null, "Email tidak ditemukan", res);

    const user = results[0];
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return response(401, null, "Password salah", res);

    if (user.status === "pending")
      return response(403, null, "Akun masih menunggu validasi admin", res);
    if (user.status === "rejected")
      return response(403, null, "Akun ditolak admin", res);

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
        nama: user.nama,
        poli_id: user.poli_id,
        nama_poli: user.nama_poli,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
        poli_id: user.poli_id,
        nama_poli: user.nama_poli,
      },
      message: "Login berhasil",
    });
  });
};

exports.logout = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return response(400, null, "Token tidak ditemukan", res);

  const token = authHeader.split(" ")[1];
  tokenBlacklist.push(token);
  response(200, null, "Logout berhasil, token diblacklist", res);
};

exports.getPendingUsers = (req, res) => {
  const sql = "SELECT * FROM users WHERE status = 'pending'";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(result);
  });
};

// exports.addUser = async (req, res) => {
//   const { nama, email, password, role } = req.body;
//   if (!nama || !email || !password || !role) {
//     return res.status(400).json({ message: "Semua field harus diisi" });
//   }
//   if (!["dokter", "apoteker"].includes(role)) {
//     return res.status(400).json({ message: "Role tidak valid" });
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);

//   db.query(
//     `INSERT INTO users (nama, email, password, role, status) VALUES (?, ?, ?, ?, 'active')`,
//     [nama, email, hashedPassword, role],
//     (err, result) => {
//       if (err) return res.status(500).json({ message: err.message });
//       res
//         .status(201)
//         .json({ message: "User berhasil dibuat", userId: result.insertId });
//     }
//   );
// };

exports.addUser = async (req, res) => {
  const { nama, email, password, role, poli_id } = req.body;

  if (!nama || !email || !password || !role) {
    return res.status(400).json({ message: "Semua field harus diisi" });
  }
  if (!["dokter", "apoteker"].includes(role)) {
    return res.status(400).json({ message: "Role tidak valid" });
  }
  if (role === "dokter" && !poli_id) {
    return res.status(400).json({ message: "Dokter harus memilih poli" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = `
    INSERT INTO users (nama, email, password, role, status, poli_id)
    VALUES (?, ?, ?, ?, 'active', ?)
  `;

  db.query(
    sql,
    [nama, email, hashedPassword, role, poli_id || null],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      res.status(201).json({
        message: "User berhasil dibuat",
        userId: result.insertId,
      });
    }
  );
};

// validasi
exports.updateUserStatus = (req, res) => {
  const { id } = req.params;
  const { status, rejected_alasan } = req.body;

  if (!["active", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ message: "Status tidak valid" });
  }

  const getUserSql = "SELECT email, nama FROM users WHERE id=?";
  db.query(getUserSql, [id], (err, results) => {
    if (err)
      return res.status(500).json({ message: "Database error (get email)" });
    if (results.length === 0)
      return res.status(404).json({ message: "User tidak ditemukan" });

    const user = results[0];

    if (status === "rejected") {
      (async () => {
        try {
          await sendRejectionEmail(user.email, rejected_alasan);
          console.log(`Email penolakan dikirim ke ${user.email}`);

          const deleteSql = "DELETE FROM users WHERE id=?";
          db.query(deleteSql, [id], (delErr) => {
            if (delErr) {
              console.error("Gagal menghapus user:", delErr);
              return res.status(500).json({ message: "Gagal menghapus user" });
            }
            if (req.io) {
              req.io.emit("user_status_update", { id, status });
            }
            res.json({
              message: `User ${user.email} ditolak dan dihapus dari database.`,
            });
          });
        } catch (emailErr) {
          console.error("Gagal mengirim email:", emailErr);
          return res
            .status(500)
            .json({ message: "Gagal mengirim email penolakan" });
        }
      })();
    } else {
      const updateSql = `UPDATE users SET status=?, rejected_alasan=? WHERE id=?`;
      db.query(updateSql, [status, rejected_alasan || null, id], (err) => {
        if (err)
          return res.status(500).json({ message: "Database error (update)" });
        if (req.io) {
          req.io.emit("user_status_update", { id, status });
        }
        res.json({ message: "Status user berhasil diperbarui" });
      });
    }
  });
};

exports.isTokenBlacklisted = (token) => tokenBlacklist.includes(token);
