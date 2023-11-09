const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
	let token = req.body.token;

	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token");
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decoded.id).select("-password");
		req.user.token = token;

		next();
	} catch (error) {
		res.status(401);
		throw new Error("Not authorized, token failed");
	}
});

module.exports = { protect };
