const express = require("express");
const router = express.Router();
const poliController = require("../controller/poliController");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.get("/", verifyToken, poliController.getPoli);
router.post("/", verifyToken, allowRoles("admin"), poliController.tambahPoli);
router.put("/:id", verifyToken, allowRoles("admin"), poliController.updatePoli);
router.delete("/:id", verifyToken, allowRoles("admin"), poliController.deletePoli);
router.get("/:id", verifyToken, poliController.getPoliById);

module.exports = router;
