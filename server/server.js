const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const bp = require("body-parser");

require("dotenv/config");

//ROUTES
const userRoutes = require("./routes/userRoutes");

//MIDDLEWARES
app.use(cors());
app.use(bp.json());

// TODO: Error Handling Middlewares should be implemented

//PATHS
app.use("/api/user", userRoutes);

app.get("/", async (req, res) => {
	res.send("Server is working");
});

//DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION);

module.exports = app;
