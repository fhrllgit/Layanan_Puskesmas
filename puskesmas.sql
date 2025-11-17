-- simpan data penggunaaa
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100),
  jenis_kelamin ENUM('L', 'P'),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  no_hp VARCHAR(20),
  alamat_lengkap TEXT,
  kecamatan VARCHAR(100),
  kota VARCHAR(100),
  provinsi VARCHAR(100),
  nik VARCHAR(20),
  no_bpjs VARCHAR(20),
  role ENUM('pasien','admin','dokter','apoteker') DEFAULT 'pasien',
  status ENUM('pending','active','rejected') DEFAULT 'pending',
  rejected_alasan TEXT NULL,
  avatar VARCHAR(255),
  ktp_file VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- poli/ umum gigi anak dll 
CREATE TABLE poli (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_poli VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  status ENUM('aktif', 'nonaktif') DEFAULT 'aktif'
);


-- kouta poli
CREATE TABLE kuota_poli (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poli_id INT NOT NULL,
  tanggal DATE NOT NULL,
  jam_mulai TIME DEFAULT NULL,
  jam_selesai TIME DEFAULT NULL,
  max_antrian INT NOT NULL,
  FOREIGN KEY (poli_id) REFERENCES poli(id) ON DELETE CASCADE
);


-- jadwal dokter 
CREATE TABLE jadwal_dokter (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dokter_id INT NOT NULL,
  poli_id INT NOT NULL,
  hari ENUM('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'),
  jam_mulai TIME,
  jam_selesai TIME,
  hari_num TINYINT,
  FOREIGN KEY (dokter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (poli_id) REFERENCES poli(id) ON DELETE CASCADE
);

-- antrian
CREATE TABLE antrian (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pasien_id INT NOT NULL,
  dokter_id INT NOT NULL,
  poli_id INT NOT NULL,
  nomor_antrian INT NOT NULL,
  status ENUM('menunggu','dipanggil','selesai','batal') DEFAULT 'menunggu',
  waktu_dipanggil DATETIME NULL,
  keterangan TEXT NULL,
  tanggal DATE DEFAULT (CURRENT_DATE),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pasien_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (dokter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (poli_id) REFERENCES poli(id) ON DELETE CASCADE
);

-- rekam medis
CREATE TABLE rekam_medis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pasien_id INT NOT NULL,
  dokter_id INT NOT NULL,
  poli_id INT NOT NULL,
  tanggal DATE DEFAULT (CURRENT_DATE),
  keluhan TEXT,
  diagnosis TEXT,
  tindakan TEXT,
  status ENUM('belum_diperiksa','sudah_diperiksa') DEFAULT 'belum_diperiksa',
  FOREIGN KEY (pasien_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (dokter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (poli_id) REFERENCES poli(id) ON DELETE CASCADE
);


-- menyimpan obat
CREATE TABLE obat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_obat VARCHAR(100) NOT NULL,
  stok INT DEFAULT 0,
  harga DECIMAL(10,2) DEFAULT 0,
  satuan VARCHAR(20),
  keterangan TEXT
);

-- resep obat hasil pemeriksaan
CREATE TABLE resep_obat (
  id INT AUTO_INCREMENT PRIMARY KEY,
  rekam_id INT NOT NULL,
  pasien_id INT NOT NULL,
  dokter_id INT NOT NULL,
  apoteker_id INT DEFAULT NULL,
  status ENUM('menunggu','siap_diambil','tidak_tersedia','selesai') DEFAULT 'menunggu',
  tanggal DATE DEFAULT (CURRENT_DATE),
  FOREIGN KEY (rekam_id) REFERENCES rekam_medis(id) ON DELETE CASCADE,
  FOREIGN KEY (pasien_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (dokter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (apoteker_id) REFERENCES users(id) ON DELETE SET NULL
);

-- detail resep obatttt
CREATE TABLE resep_obat_item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  resep_id INT NOT NULL,
  nama_obat VARCHAR(255) NOT NULL,
  dosis VARCHAR(100) DEFAULT NULL,
  jumlah INT DEFAULT 1,
  keterangan TEXT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resep_id) REFERENCES resep_obat(id) ON DELETE CASCADE
);

-- upload artikelll
CREATE TABLE artikel_kesehatan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT NOT NULL,
  judul VARCHAR(150) NOT NULL,
  gambar VARCHAR(255) NULL,
  isi TEXT NOT NULL,
  tanggal_publikasi DATE DEFAULT (CURRENT_DATE),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
);

-- chat konsulll online
CREATE TABLE konsultasi_online (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pasien_id INT NOT NULL,
  dokter_id INT NOT NULL,
  poli_id INT NOT NULL,
  keluhan TEXT,
  status ENUM('aktif','selesai','dibatalkan') DEFAULT 'aktif',
  hasil TEXT,
  resep_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (pasien_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (dokter_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (poli_id) REFERENCES poli(id) ON DELETE CASCADE,
  FOREIGN KEY (resep_id) REFERENCES resep_obat(id) ON DELETE SET NULL
);

-- tampungan chat konsultasi 
CREATE TABLE chat_konsultasi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  konsultasi_id INT NOT NULL,
  pengirim_id INT NOT NULL,
  pesan TEXT NOT NULL,
  waktu TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (konsultasi_id) REFERENCES konsultasi_online(id) ON DELETE CASCADE,
  FOREIGN KEY (pengirim_id) REFERENCES users(id) ON DELETE CASCADE
);

-- laporan periodeeee
CREATE TABLE laporan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT NOT NULL,
  periode VARCHAR(50),
  jenis_laporan ENUM('pasien','antrian','obat','gabungan'),
  file_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
);


