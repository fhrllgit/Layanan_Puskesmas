const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.get("/antrian/today", verifyToken, allowRoles("admin"), adminController.getAntrianToday);
router.get("/antrian/filter", verifyToken, allowRoles("admin"), adminController.filterAntrian);
router.get("/users/dokter", verifyToken, allowRoles("admin"), adminController.getDokterByPoli);
router.get("/pasien/search", verifyToken, allowRoles("admin"), adminController.searchPasien);
router.post("/pasien", verifyToken, allowRoles("admin"), adminController.addPasien);
router.post("/antrian", verifyToken, allowRoles("admin"),adminController.addAntrian);
router.delete("/antrian/:id", verifyToken, allowRoles("admin"), adminController.deleteAntrian);
router.get("/users/admin", verifyToken, allowRoles("admin"), adminController.getUsers)
router.get("/users/admin-filter", verifyToken, allowRoles("admin"), adminController.getUserFilteres)
router.get("/laporan/layanan-", verifyToken, allowRoles("admin"), adminController.getLaporanLayananAdmin)
router.get("/poli", verifyToken, allowRoles("admin"), adminController.getAllPoli);
router.get("/dokter", verifyToken, allowRoles("admin"), adminController.getAllDokter);
router.get("/laporan/export-pdf", verifyToken, allowRoles("admin"), adminController.exportPDF);
router.get("/laporan/export-excel", verifyToken, allowRoles("admin"), adminController.exportExcel);
router.get("/jadwal-dokter", verifyToken, allowRoles("admin"), adminController.getJadwalDokter);
router.get("/dashboard-antrian", verifyToken, allowRoles("admin"), adminController.getAntrian);

module.exports = router;
