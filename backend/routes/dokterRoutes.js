const express = require("express");
const router = express.Router();
const dokterController = require("../controller/dokterController");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

// jadwal dokter
router.post("/jadwal", verifyToken, allowRoles("admin"), dokterController.tambahJadwal);
router.get("/", verifyToken, allowRoles("admin", "dokter"), dokterController.getAllDokter);
router.get("/jadwal", verifyToken, allowRoles("admin", "dokter"), dokterController.getJadwal);
router.put("/jadwal/:id", verifyToken, allowRoles("admin"), dokterController.updateJadwal);
router.delete("/jadwal/:id", verifyToken, allowRoles("admin"), dokterController.deleteJadwal);
router.get("/jadwal-saya", verifyToken, allowRoles("dokter"), dokterController.getJadwalSaya);
router.get("/jadwal-saya/hari-ini", verifyToken, allowRoles("dokter"), dokterController.getJadwalHariIni);
router.get("/jadwal-saya/setelah-hari-ini", verifyToken, allowRoles("dokter"), dokterController.getJadwalSetelahHariIni);
router.get("/by-poli/:poli_id", verifyToken, allowRoles("pasien"), dokterController.getDokterByPoli);
router.get("/status/:dokter_id", verifyToken, allowRoles("pasien"), dokterController.getStatusDokter);
router.put("/status", verifyToken, allowRoles("dokter"), dokterController.updateStatusDokter);
router.get("/status-saya", verifyToken, allowRoles("dokter"), dokterController.getStatus);

// layanan buat dokter 
router.get("/antrian", verifyToken, allowRoles("dokter"), dokterController.getAntrianDokter);
router.post("/antrian/panggil/:antrian_id", verifyToken, allowRoles("dokter"), dokterController.panggilPasien);
router.post("/antrian/batal/:antrian_id", verifyToken, allowRoles("dokter"), dokterController.batalPasien);
router.post("/antrian/selesai/:antrian_id", verifyToken, allowRoles("dokter"), dokterController.selesaiPasien);
router.put("/antrian/delete/:id", verifyToken, dokterController.hapusAntrian);

module.exports = router;

