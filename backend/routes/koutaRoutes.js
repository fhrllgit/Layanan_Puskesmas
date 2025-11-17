const express = require("express");
const router = express.Router();
const kuotaController = require("../controller/koutaController");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.post("/", verifyToken, allowRoles("admin"), kuotaController.tambahKuota);
router.get("/", verifyToken, allowRoles("admin", "dokter"), kuotaController.getKuota);
router.put("/:id", verifyToken, allowRoles("admin"), kuotaController.updateKuota);
router.delete("/:id", verifyToken, allowRoles("admin"), kuotaController.deleteKuota);

module.exports = router;
