const express = require("express");
const router = express.Router();
const pasienController = require("../controller/pasienController");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.get("/profil", verifyToken, allowRoles("pasien"), pasienController.getProfilPasien);
router.get("/jadwal/hari-ini", verifyToken, allowRoles("pasien"), pasienController.getJadwalDokterDay);
router.get("/riwayat", verifyToken, allowRoles("pasien"), pasienController.getRiwayatKunjungan);
router.get("/status-obat", verifyToken, allowRoles("pasien"), pasienController.getStatusObat);
router.get("/resep/:id/detail", verifyToken, allowRoles("pasien"), pasienController.getDetailResep);

// router.get("/riwayat", pasienController.getRiwayatKunjungan);


module.exports = router