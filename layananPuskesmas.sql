-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 18 Nov 2025 pada 00.29
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `layananPuskesmas`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `antrian`
--

CREATE TABLE `antrian` (
  `id` int(11) NOT NULL,
  `pasien_id` int(11) NOT NULL,
  `dokter_id` int(11) NOT NULL,
  `poli_id` int(11) NOT NULL,
  `keluhan` text DEFAULT NULL,
  `nomor_antrian` varchar(10) NOT NULL,
  `status` enum('menunggu','dipanggil','selesai','batal') DEFAULT 'menunggu',
  `waktu_dipanggil` datetime DEFAULT NULL,
  `keterangan` text DEFAULT NULL,
  `tanggal` date DEFAULT curdate(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `antrian`
--

INSERT INTO `antrian` (`id`, `pasien_id`, `dokter_id`, `poli_id`, `keluhan`, `nomor_antrian`, `status`, `waktu_dipanggil`, `keterangan`, `tanggal`, `created_at`) VALUES
(77, 12, 11, 1, NULL, 'A001', 'menunggu', NULL, NULL, '2025-11-17', '2025-11-17 05:26:28'),
(83, 14, 15, 4, NULL, 'D001', 'selesai', '2025-11-17 14:01:25', NULL, '2025-11-17', '2025-11-17 07:01:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jadwal_dokter`
--

CREATE TABLE `jadwal_dokter` (
  `id` int(11) NOT NULL,
  `dokter_id` int(11) NOT NULL,
  `poli_id` int(11) NOT NULL,
  `hari` enum('Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu') DEFAULT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `hari_num` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `jadwal_dokter`
--

INSERT INTO `jadwal_dokter` (`id`, `dokter_id`, `poli_id`, `hari`, `jam_mulai`, `jam_selesai`, `hari_num`) VALUES
(29, 15, 4, 'Selasa', '08:00:00', '12:00:00', 2),
(31, 11, 1, 'Selasa', '08:00:00', '17:00:00', 2),
(32, 13, 2, 'Selasa', '12:00:00', '15:00:00', 2),
(33, 21, 3, 'Selasa', '08:00:00', '10:00:00', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `kuota_poli`
--

CREATE TABLE `kuota_poli` (
  `id` int(11) NOT NULL,
  `poli_id` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `jam_mulai` time DEFAULT NULL,
  `jam_selesai` time DEFAULT NULL,
  `max_antrian` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `poli`
--

CREATE TABLE `poli` (
  `id` int(11) NOT NULL,
  `nama_poli` varchar(100) NOT NULL,
  `prefix` varchar(5) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `status` enum('aktif','nonaktif') DEFAULT 'aktif'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `poli`
--

INSERT INTO `poli` (`id`, `nama_poli`, `prefix`, `deskripsi`, `status`) VALUES
(1, 'Poli Umum', 'A', 'Menangani segala penyakit kecuali sakit HATI', 'aktif'),
(2, 'Poli Gigi', 'B', 'Menangani segala penyakit gigi', 'aktif'),
(3, 'Poli Kandungan', 'C', 'Menangani segala kandungan kecuali kandungan hewan ', 'aktif'),
(4, 'Poli KIA', 'D', 'Menangani kesehatan ibu dan anak', 'aktif');

-- --------------------------------------------------------

--
-- Struktur dari tabel `rekam_medis`
--

CREATE TABLE `rekam_medis` (
  `id` int(11) NOT NULL,
  `pasien_id` int(11) NOT NULL,
  `dokter_id` int(11) NOT NULL,
  `poli_id` int(11) NOT NULL,
  `tanggal` date DEFAULT curdate(),
  `keluhan` text DEFAULT NULL,
  `diagnosis` text DEFAULT NULL,
  `tindakan` text DEFAULT NULL,
  `status` enum('belum_diperiksa','sudah_diperiksa') DEFAULT 'belum_diperiksa'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `rekam_medis`
--

INSERT INTO `rekam_medis` (`id`, `pasien_id`, `dokter_id`, `poli_id`, `tanggal`, `keluhan`, `diagnosis`, `tindakan`, `status`) VALUES
(1, 14, 13, 2, '2025-11-10', 'sakit gigi ', 'haha', 'biasa', 'sudah_diperiksa'),
(2, 12, 13, 2, '2025-11-10', 'sakit gigi', 'waras', 'oprasi', 'sudah_diperiksa'),
(3, 12, 11, 1, '2025-11-15', 'demam biasa', 'succes diagnosis', 'suntik', 'sudah_diperiksa'),
(7, 14, 15, 4, '2025-11-17', 'Anak paa', 'tidak ada', 'biasa ', 'sudah_diperiksa');

-- --------------------------------------------------------

--
-- Struktur dari tabel `resep_obat`
--

CREATE TABLE `resep_obat` (
  `id` int(11) NOT NULL,
  `rekam_id` int(11) NOT NULL,
  `pasien_id` int(11) NOT NULL,
  `dokter_id` int(11) NOT NULL,
  `apoteker_id` int(11) DEFAULT NULL,
  `status` enum('menunggu','siap_diambil','tidak_tersedia','selesai') DEFAULT 'menunggu',
  `tanggal` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `resep_obat`
--

INSERT INTO `resep_obat` (`id`, `rekam_id`, `pasien_id`, `dokter_id`, `apoteker_id`, `status`, `tanggal`) VALUES
(1, 1, 14, 13, NULL, 'menunggu', '2025-11-10'),
(2, 2, 12, 13, NULL, 'menunggu', '2025-11-10'),
(3, 3, 12, 11, NULL, 'menunggu', '2025-11-15'),
(7, 7, 14, 15, NULL, 'menunggu', '2025-11-17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `resep_obat_item`
--

CREATE TABLE `resep_obat_item` (
  `id` int(11) NOT NULL,
  `resep_id` int(11) NOT NULL,
  `nama_obat` varchar(255) NOT NULL,
  `dosis` varchar(100) DEFAULT NULL,
  `jumlah` int(11) DEFAULT 1,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `resep_obat_item`
--

INSERT INTO `resep_obat_item` (`id`, `resep_id`, `nama_obat`, `dosis`, `jumlah`, `keterangan`, `created_at`) VALUES
(1, 1, 'paracetamol', '3', 1, 'minum setiap hari', '2025-11-10 08:23:44'),
(2, 2, 'paracetamol', '3', 1, 'waras', '2025-11-10 09:02:02'),
(3, 7, 'Pereda panas', '1', 1, 'sehari sekali ', '2025-11-17 07:03:10'),
(4, 7, 'Obat pengen hp anak', '2', 1, 'tidak usah dibelikan ', '2025-11-17 07:03:10');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `no_hp` varchar(20) DEFAULT NULL,
  `alamat_lengkap` text DEFAULT NULL,
  `kecamatan` varchar(100) DEFAULT NULL,
  `kota` varchar(100) DEFAULT NULL,
  `provinsi` varchar(100) DEFAULT NULL,
  `nik` varchar(20) DEFAULT NULL,
  `no_bpjs` varchar(20) DEFAULT NULL,
  `role` enum('pasien','admin','dokter','apoteker') DEFAULT 'pasien',
  `status` enum('pending','active','rejected') DEFAULT 'pending',
  `rejected_alasan` text DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `ktp_file` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `poli_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `nama`, `jenis_kelamin`, `email`, `password`, `no_hp`, `alamat_lengkap`, `kecamatan`, `kota`, `provinsi`, `nik`, `no_bpjs`, `role`, `status`, `rejected_alasan`, `avatar`, `ktp_file`, `created_at`, `updated_at`, `poli_id`) VALUES
(2, 'Admin Sisma', NULL, 'admin@sisma.com', '$2b$10$VuFCZMCy7jUlT5F7zW1/OOUbWrnkzyLzKPStTy4Yb74f.Dx3yhPD.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'admin', 'active', NULL, NULL, NULL, '2025-11-05 08:16:37', '2025-11-05 08:16:37', NULL),
(11, 'setyo', NULL, 'setyo@gmail.com', '$2b$10$1kdEHqCfL3jPoS/WW5eQF.FaK2pd1gQzENVIQ0WpBVb9hvCTq1Cpa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'dokter', 'active', NULL, NULL, NULL, '2025-11-07 11:30:38', '2025-11-08 07:11:44', 1),
(12, 'Fahrul', 'L', 'fahrul@gmail.com', '$2b$10$jglpbWI0Yx89UjoDhp.gQ.lfc/a.i6NhwXaQ66hrgzCx85WvETF9a', '083319126732', 'jl serni indah', 'Nalumsari', 'Jepara', 'Jawa tengah', '332043313404', NULL, 'pasien', 'active', NULL, NULL, '1762523446252-236028276.png', '2025-11-07 13:50:46', '2025-11-07 13:50:56', NULL),
(13, 'susi', NULL, 'susi@gmail.com', '$2b$10$QS.5ffEM/c1rIVPhhgRWrOk4HgCGv2HsRUWm/5joztJ1bfckITYl6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'dokter', 'active', NULL, NULL, NULL, '2025-11-08 02:35:44', '2025-11-08 07:11:44', 2),
(14, 'rahman', 'L', 'rahman@gmail.com', '$2b$10$JFTBBgjMBYsQzFHOSbXeT.qw0Mp272Nw84G4AVMG1WweSISNkPDKO', '0883113474812', 'Jl surabaya ', 'Nalumsari', 'Jepara', 'Jawatengah', '33131402348542', NULL, 'pasien', 'active', NULL, NULL, '1762573017606-946377580.png', '2025-11-08 03:36:57', '2025-11-08 03:37:12', NULL),
(15, 'yahya', NULL, 'dkia@gmail.com', '$2b$10$CSMdQtHkBXgr7q5BdsVcJeYXcrripVDXqdMj5miA.RdV5ArX6LDwa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'dokter', 'active', NULL, NULL, NULL, '2025-11-10 23:09:25', '2025-11-10 23:40:59', 4),
(16, 'sisApoteker', NULL, 'apotekerSis@gmail.com', '$2b$10$SDL7v20meWMCL2QhMa2AwO5aKAifjfazVRDkCRIrzpT/xwAzK71Hu', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'apoteker', 'active', NULL, NULL, NULL, '2025-11-11 01:51:36', '2025-11-11 01:51:36', NULL),
(17, 'ferrari', 'L', '202451017@std.umk.ac.id', '$2b$10$RWiAZBA1QWiIzYwBPB1NB.awiVGfpb4pqaxLwNcRFij2i7jsWJuNC', '083319126732', 'jl serni indah', 'Kelat', 'Jepara', 'Jawa tengah', '338923742234', NULL, 'pasien', 'pending', NULL, NULL, '1762826504932-121321865.png', '2025-11-11 02:01:45', '2025-11-11 02:01:45', NULL),
(19, 'fikri', NULL, 'fikri@gmail.com', '$2b$10$lUlgM62jANCOTqQ5xGetX..D1KmJ8TIY9EUvT9gsc/2rkhnhPtaMy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'dokter', 'active', NULL, NULL, NULL, '2025-11-14 08:42:13', '2025-11-14 08:42:13', 1),
(20, 'anang', 'L', NULL, NULL, '0887341211212', 'gondang', 'gondang', 'kudus', 'jawatengah', '330341431313', NULL, 'pasien', 'active', NULL, NULL, NULL, '2025-11-14 12:17:42', '2025-11-14 12:17:42', NULL),
(21, 'Tutik', NULL, 'tutikka@gmail.com', '$2b$10$4kL8rd47IZCeuxVQh/XumOG/g7yB7R5h3KjkVn.rk2967NPERvBjS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'dokter', 'active', NULL, NULL, NULL, '2025-11-17 05:55:06', '2025-11-17 05:55:06', 3);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `antrian`
--
ALTER TABLE `antrian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pasien_id` (`pasien_id`),
  ADD KEY `dokter_id` (`dokter_id`),
  ADD KEY `poli_id` (`poli_id`);

--
-- Indeks untuk tabel `jadwal_dokter`
--
ALTER TABLE `jadwal_dokter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dokter_id` (`dokter_id`),
  ADD KEY `poli_id` (`poli_id`);

--
-- Indeks untuk tabel `kuota_poli`
--
ALTER TABLE `kuota_poli`
  ADD PRIMARY KEY (`id`),
  ADD KEY `poli_id` (`poli_id`);

--
-- Indeks untuk tabel `poli`
--
ALTER TABLE `poli`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pasien_id` (`pasien_id`),
  ADD KEY `dokter_id` (`dokter_id`),
  ADD KEY `poli_id` (`poli_id`);

--
-- Indeks untuk tabel `resep_obat`
--
ALTER TABLE `resep_obat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rekam_id` (`rekam_id`),
  ADD KEY `pasien_id` (`pasien_id`),
  ADD KEY `dokter_id` (`dokter_id`),
  ADD KEY `apoteker_id` (`apoteker_id`);

--
-- Indeks untuk tabel `resep_obat_item`
--
ALTER TABLE `resep_obat_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resep_id` (`resep_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `antrian`
--
ALTER TABLE `antrian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT untuk tabel `jadwal_dokter`
--
ALTER TABLE `jadwal_dokter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `kuota_poli`
--
ALTER TABLE `kuota_poli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT untuk tabel `poli`
--
ALTER TABLE `poli`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `rekam_medis`
--
ALTER TABLE `rekam_medis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `resep_obat`
--
ALTER TABLE `resep_obat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `resep_obat_item`
--
ALTER TABLE `resep_obat_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `antrian`
--
ALTER TABLE `antrian`
  ADD CONSTRAINT `antrian_ibfk_1` FOREIGN KEY (`pasien_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `antrian_ibfk_2` FOREIGN KEY (`dokter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `antrian_ibfk_3` FOREIGN KEY (`poli_id`) REFERENCES `poli` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `jadwal_dokter`
--
ALTER TABLE `jadwal_dokter`
  ADD CONSTRAINT `jadwal_dokter_ibfk_1` FOREIGN KEY (`dokter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jadwal_dokter_ibfk_2` FOREIGN KEY (`poli_id`) REFERENCES `poli` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `kuota_poli`
--
ALTER TABLE `kuota_poli`
  ADD CONSTRAINT `kuota_poli_ibfk_1` FOREIGN KEY (`poli_id`) REFERENCES `poli` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `rekam_medis`
--
ALTER TABLE `rekam_medis`
  ADD CONSTRAINT `rekam_medis_ibfk_1` FOREIGN KEY (`pasien_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rekam_medis_ibfk_2` FOREIGN KEY (`dokter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rekam_medis_ibfk_3` FOREIGN KEY (`poli_id`) REFERENCES `poli` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `resep_obat`
--
ALTER TABLE `resep_obat`
  ADD CONSTRAINT `resep_obat_ibfk_1` FOREIGN KEY (`rekam_id`) REFERENCES `rekam_medis` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `resep_obat_ibfk_2` FOREIGN KEY (`pasien_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `resep_obat_ibfk_3` FOREIGN KEY (`dokter_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `resep_obat_ibfk_4` FOREIGN KEY (`apoteker_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `resep_obat_item`
--
ALTER TABLE `resep_obat_item`
  ADD CONSTRAINT `resep_obat_item_ibfk_1` FOREIGN KEY (`resep_id`) REFERENCES `resep_obat` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
