const express = require("express");
const router = express.Router();
const antrianController = require("../controller/antrianController");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.post("/", verifyToken, allowRoles("pasien"), antrianController.tambahAntrian);
router.get("/", verifyToken, allowRoles("admin", "dokter"), antrianController.getAntrianList);
router.get("/sekarang", verifyToken, antrianController.getAntrianSekarang);
router.get("/antrianPoli/:id", verifyToken, antrianController.getAntrianByPasien);


module.exports = router;
