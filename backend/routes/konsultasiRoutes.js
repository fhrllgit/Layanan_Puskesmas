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
router.get("/dokter/status/:id", konsultasiController.getStatusDokter);
// resep
router.post("/kirim-resep", verifyToken, allowRoles("dokter"), konsultasiController.kirimResep);
router.get("/:id", verifyToken, allowRoles("dokter", "pasien", "apoteker"), konsultasiController.getResepById);
router.put("/tebus-puskesmas/:id", verifyToken, allowRoles("pasien"), konsultasiController.tebusPuskesmas);
router.get("/tebus-luar/:id", verifyToken, allowRoles("pasien"), konsultasiController.tebusLuar);
module.exports = router;
