const db = require("./config/db"); 
const bcrypt = require("bcryptjs");

async function createAdmin() {
  const passwordPlain = "adminSISMA";
  const hashed = await bcrypt.hash(passwordPlain, 10);

  const sql = `
    INSERT INTO users (nama, email, password, role, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, 'active', NOW(), NOW())
  `;
  const values = ["Admin Sisma", "admin@sisma.com", hashed, "admin"];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Gagal membuat admin:", err);
      process.exit(1);
    }
    console.log("Admin berhasil dibuat!");
    console.log("Email:", "admin@sisma.com");
    console.log("Password:", passwordPlain);
    process.exit(0);
  });
}

createAdmin();

// macbookair@192 backend % node createAdmin.js
// Database connected!
// Admin berhasil dibuat!
// Email: admin@sisma.com
// Password: adminSISMA
// macbookair@192 backend % 