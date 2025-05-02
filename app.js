const http = require('http');
const url = require('url');
const readFile = require('./public_html/js/readFile.js');
const fun = require('./functions.js')
const schedule = require('./schedule_server.js');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const db = mysql.createConnection({
	host: '35.202.25.101',
	user: 'yogauser',
	password: 'CSC543',
	database: 'yoga_database'
  });
  
  db.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
  });
  
  const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'khadijatulkobra3399@gmail.com',
	  pass: 'fihi nbnd pckv onww'
	}
  });
  
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
			case "/schedule": { 
				console.log("in app.js schedule")
				if (queryObj.action === "cancel"){
					schedule.cancel(queryObj, res);	
				}
				
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
				/*
				case "/newsletter": {
					console.log("in app.js newsletter")
					fun.newsletter(queryObj, res);
					break;
				}*/
				case "/schedule": {
					console.log("in app.js scheduling")
					if (queryObj.action == "available"){
						schedule.availableSlot(queryObj, res);
				
					} else if (queryObj.action == "book"){
						schedule.book(queryObj, res, db);
					}
					break;
				}
				case "/contact": {
					console.log("in app.js contact")
					fun.contact(queryObj, res);
					break;
				}
				case "/register": {
					console.log("in app.js register");
					const { username, email, password } = queryObj;
					const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
					db.query(sql, [username, email, password], (err, result) => {
					  if (err) {
						res.writeHead(400, { 'Content-Type': 'text/plain' });
						res.end("User already exists or error occurred.");
					  } else {
						res.writeHead(200, { 'Content-Type': 'text/plain' });
						res.end("Registered successfully");
					  }
					});
					break;
				  }
				  case "/login": {
					console.log("in app.js login");
					const { email, password } = queryObj;
					const sql = "SELECT * FROM users WHERE (email = ? or username = ?) AND password = ?";
					db.query(sql, [email,email, password], (err, results) => {
					  if (err) {
						res.writeHead(500, { 'Content-Type': 'text/plain' });
						res.end("Server error");
					  } else if (results.length > 0) {
						res.writeHead(200, { 'Content-Type': 'text/plain' });
						res.end("Login successful");
					  } else {
						res.writeHead(401, { 'Content-Type': 'text/plain' });
						res.end("Invalid credentials");
					  }
					});
					break;}

					case "/register_event": {
						console.log("in app.js register_event");
						const { firstName, lastName, email, eventName } = queryObj;
						const sql = "INSERT INTO event_registrations (name, email, event_name) VALUES (?, ?, ?)";
						const fullName = firstName + " " + lastName;
						db.query(sql, [fullName, email, eventName], (err, result) => {
							if (err) {
								res.writeHead(500, { 'Content-Type': 'text/plain' });
								res.end("Failed to reserve your spot.");
							} else {
								const mailOptions = {
									from: 'your_email@gmail.com',
									to: email,
									subject: `Reservation Confirmed: ${eventName}`,
									text: `Hi ${firstName},\n\nYou have successfully reserved a spot for "${eventName}".\n\nSee you there!\n\nInner Bliss Yoga`
								};
					
								transporter.sendMail(mailOptions, (error, info) => {
									if (error) {
									  console.error("Email sending error:", error); 
									  res.writeHead(500, { 'Content-Type': 'text/plain' });
									  res.end("Reservation successful, but email failed.");
									} else {
									  console.log("Email sent: " + info.response);
									  res.writeHead(200, { 'Content-Type': 'text/plain' });
									  res.end("Reservation successful! Confirmation email sent.");
									}
								  });
								  

							}
						});
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
