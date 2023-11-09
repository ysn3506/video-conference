const https = require("http");
const app = require("./server");
const fs = require("fs");
const path = require("path");

// const keyFile = fs.readFileSync(
//     path.resolve(__dirname, "../../../etc/nginx/ssl/private.key") ;

// const cert = fs.readFileSync(
// 	path.resolve(__dirname, "../../../etc/nginx/ssl/certificate.crt")
// );

https
	.createServer({}, app)
	.listen(
		process.env.PORT || 8080,
		console.log("Server is running", process.env.PORT)
	);
