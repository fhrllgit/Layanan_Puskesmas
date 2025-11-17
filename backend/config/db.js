const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "layananPuskesmas",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3307
});

db.connect(err => {
  if (err) {
    console.error("DB connect error:", err);
    throw err;
  }
  console.log("Database connected!");
});

module.exports = db