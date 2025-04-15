const http = require('http');
const url = require('url');
readFileModule = require('./public_html/js/readFileModule.js'); 

serving = function (req, res) {
	console.log(req.url);
	let fileName = './public_html' + url.parse(req.url).pathname;
	console.log(fileName);
	// call readFileModule.js
	readFileModule.readFile(fileName,res);
}

// creating server object
const myServer = http.createServer(serving);

// server starts listenig on port 80
myServer.listen(80, function() {console.log("Listening on port 80")});

