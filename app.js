const http = require('http');
const url = require('url');
const readFile = require('./public_html/js/readFile.js');
const fun = require('./functions.js')
const schedule = require('./schedule_server.js');

const handle_incoming_requests = function (req, res) {
	console.log(req.url);

	if (req.method == "GET")
		processGet(req, res);
	else if (req.method == "POST")
		processPost(req, res);
	else {
		res.writeHead(404, { 'Content-Type': 'application/json'});
		res.write(JSON.stringify("Http method not supported"));
		res.end();
	}

	function processGet(req,res) {
		// get path from request
		const path = url.parse(req.url, "true").pathname;
		// parsing query string into object
		const queryObj = url.parse(req.url, "true").query;
		
		switch (path) {
			case "/classes": {
				console.log("in app.js classes")
				fun.classes(queryObj, res);
				break;
			}
			case "/pricing": {
				console.log("in app.js pricing")
				fun.pricing(queryObj, res);
				break;	
			}
			case "/bookaclass": { // Marina GET response from schedule.js calling function availableSlot
				console.log("in app.js schedule")
				schedule.availableSlot(queryObj, res);
				break;	
			}
			case "/cancel": { // Marina GET response from schedule.js calling function cancel
				console.log("in app.js schedule")
				schedule.cancel(queryObj, res);
				break;	
			}
			default: {
				let fileName = './public_html' + path //url.parse(req.url, "true").pathname;
				console.log(fileName);
				// call readFile.js module
				readFile.readFile(fileName, res);
			}
		}
	}

	function processPost(req, res) {
		// get path from request
		const path = url.parse(req.url, "true").pathname;

		let body = '';
		// gets the whole data
		req.on('data', data => { body += data; });
		
		// when full data is received, starts processing routing
		req.on('end', () => {
			console.log("in app.js end", body)
			const queryObj = JSON.parse(body);
			switch (path) {
				case "/newsletter": {
					console.log("in app.js newsletter")
					fun.newsletter(queryObj, res);
					break;
				}
				case "/bookclass": { // Marina's case calling book function from scheduling.js
					console.log("in app.js scheduling")
					schedule.book(queryObj, res);
					break;
				}
				default: {
					let fileName = './public_html' + path //url.parse(req.url).pathname;
					console.log(fileName);
					// call readFile.js module
					readFile.readFile(fileName, res);
				}
			}
		}
		)
	}
}

	// creating server object
	const myServer = http.createServer(handle_incoming_requests);

	// server starts listenig on port 80
	myServer.listen(80, function () { console.log("Listening on port 80") });
