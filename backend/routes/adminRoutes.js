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

module.exports = router;
