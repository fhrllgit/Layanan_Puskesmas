const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { uploads } = require("../middleware/uploadMiddleware");
const { verifyToken, allowRoles } = require("../middleware/authMiddleware");

router.post("/register", uploads.single("ktp_file"), userController.register);
router.post("/login", userController.login);
router.post("/logout", verifyToken, userController.logout);
router.get("/pending", verifyToken, allowRoles("admin"), userController.getPendingUsers)
router.post("/add-user", verifyToken, allowRoles("admin"), userController.addUser)
router.put("/status/:id", verifyToken, allowRoles("admin"), userController.updateUserStatus)

module.exports = router;
