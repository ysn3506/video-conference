const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const generateToken = require("../utils/generateToken.js");

// authentication with email and password
const authUser = asyncHandler(async (req, res) => {
	const { userEmail, userPassword } = req.body;

	const user = await User.findOne({ userEmail });

	if (user && (await user.matchPassword(userPassword))) {
		res.status(200).json({
			_id: user._id,
			userName: user.userName,
			userEmail: user.userEmail,
			userType: user.userType,
			token: generateToken(user._id),
		});
	} else {
		res
			.status(401)
			.json({ success: false, message: "Invalid Email or Password" });
	}
});

// register new company
const registerUser = asyncHandler(async (req, res) => {
	const { userName, userEmail, userPassword, userType } = req.body;

	console.log(userName, userEmail, userPassword, userType);

	try {
		const userExists = await User.findOne({ userEmail, userName });

		if (userExists) {
			return res
				.status(404)
				.json({ success: false, message: "User already exists" });
		}

		const user = await User.create({
			userName,
			userEmail,
			userPassword,
			userType,
		});

		res.status(201).json({
			_id: user._id,
			userName: user.companyName,
			userEmail: user.userEmail,
			userType: user.userType,
			token: generateToken(user._id),
		});
	} catch (error) {
		res.status(400).json({ success: false, message: "Something went wrong" });
	}
});

// authentication with token
const tokenAuth = asyncHandler(async (req, res) => {
	try {
		return res.status(201).json({
			_id: req.user._id,
			userName: req.user.userName,
			userEmail: req.user.userEmail,
			userType: req.user.userType,
			token: req.user.token,
		});
	} catch (error) {
		return res.status(404).json({ success: false, message: "Not authorized" });
	}
});

module.exports = {
	authUser,
	registerUser,
	tokenAuth,
};
