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

// layanan buat dokter 
router.get("/antrian", verifyToken, allowRoles("dokter"), dokterController.getAntrianDokter);
router.post("/antrian/panggil/:antrian_id", verifyToken, allowRoles("dokter"), dokterController.panggilPasien);
router.post("/antrian/batal/:antrian_id", verifyToken, allowRoles("dokter"), dokterController.batalPasien);
router.post("/antrian/selesai/:antrian_id", verifyToken, allowRoles("dokter"), dokterController.selesaiPasien);
router.delete("/antrian/delete/:id", verifyToken, dokterController.hapusAntrian);

module.exports = router;
