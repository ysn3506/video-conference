const express = require("express");
const {
	authUser,
	registerUser,
	tokenAuth,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/token-login").post(protect, tokenAuth);
module.exports = router;
