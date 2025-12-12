const express = require("express");
const router = express.Router();
const apotekerController = require("../controller/apotekerController");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.get("/resep", verifyToken, allowRoles("apoteker"), apotekerController.getResep);
router.get("/resep/:id", verifyToken, allowRoles("apoteker"), apotekerController.getDetailResep);
router.patch("/resep/:id/status", verifyToken, allowRoles("apoteker"), apotekerController.updateStatus);
// konsultasi
router.get("/resep-konsultasi", verifyToken, allowRoles("apoteker"), apotekerController.getResepKonsultasi);
router.get("/resep-konsultasi/:id",  verifyToken,  allowRoles("apoteker"), apotekerController.getDetailResepKonsultasi);
router.patch("/resep-konsultasi/:id/status", verifyToken, allowRoles("apoteker"), apotekerController.updateStatusKonsultasi);

module.exports = router;
