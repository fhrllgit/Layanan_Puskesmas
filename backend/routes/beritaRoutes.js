const express = require("express");
const router = express.Router();
const beritaController = require("../controller/beritaController");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");
const { uploads } = require("../middleware/uploadMiddleware");

router.post("/", verifyToken, uploads.single("gambar"), beritaController.addBerita);
router.get("/", beritaController.getBerita);
router.get("/tipe-berita", verifyToken, beritaController.getTipeBerita);
router.get("/:id", verifyToken, beritaController.getBeritaById);
router.put("/:id", verifyToken, uploads.single("gambar"), beritaController.updateBerita);
router.delete("/:id", verifyToken, beritaController.deleteBerita);


module.exports = router;
