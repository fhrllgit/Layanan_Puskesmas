const express = require("express");
const router = express.Router();
const konsultasiController = require("../controller/konsultasiController");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.post("/mulai", verifyToken, allowRoles("pasien"), konsultasiController.mulaiChat);
router.post("/kirim", verifyToken, allowRoles("pasien", "dokter"), konsultasiController.kirimPesan);
router.post("/akhiri", verifyToken, allowRoles("pasien", "dokter"), konsultasiController.akhiriKonsultasi);
router.get("/chat/:konsultasi_id", verifyToken, allowRoles("pasien", "dokter"), konsultasiController.getChat);
router.get("/aktif", verifyToken, allowRoles("dokter"), konsultasiController.daftarKonsultasiAktif);
router.post("/read/:id", verifyToken, konsultasiController.tandaiDibaca);
router.get("/detail/:id", konsultasiController.getKonsultasiDetail);
router.get("/total-hari-ini/:dokter_id", verifyToken, konsultasiController.getTotalKonsultasiHariIni);
// router.get("/resep/:konsultasi_id", verifyToken, allowRoles("pasien", "dokter"), konsultasiController.getResep);
// router.post("/resep", verifyToken, allowRoles("dokter"), konsultasiController.createResep);

module.exports = router;
