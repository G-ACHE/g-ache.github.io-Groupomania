const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/:id", userCtrl.delete);
router.get("/me", auth, userCtrl.me);
router.get("/all", userCtrl.getAllUsers);
router.put("/:id", userCtrl.editUser);

module.exports = router;
