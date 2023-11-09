const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
		},
		userEmail: {
			type: String,
			required: true,
		},
		userPassword: {
			type: String,
			required: true,
		},
		userType: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.userPassword);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
	if (!this.isModified("userPassword")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.userPassword = await bcrypt.hash(this.userPassword, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
