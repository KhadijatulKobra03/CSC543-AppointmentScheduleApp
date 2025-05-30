const http = require('http');
const url = require('url');

const readFile = require('./readFile.js');

const pric = require('./pricing_server.js');
const clas = require('./classes_server.js');
const cont = require('./contact_server.js');


const schedule = require('./schedule_server.js');
const mysql = require('mysql');
const nodemailer = require('nodemailer');

//by khadija
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
  
  //by khadija
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
				clas.classes(queryObj, res);
				break;
			}
			case "/pricing": {
				console.log("in app.js pricing")
				pric.pricing(queryObj, res);
				break;	
			}
			case "/schedule": { 
				console.log("in app.js schedule")
				if (queryObj.action === "cancel"){
					schedule.cancel(queryObj, res);	
				}

				break;	
			}
			
			// by khadija
			case "/dashboard": {
				console.log("in app.js dashboard");
			
				if (!queryObj.user_id || queryObj.user_id === "null") {
					res.writeHead(400, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ message: "User ID required" }));
					return;
				}
			
				const sql = `
					SELECT 
						cb.booking_id, 
						c.name AS class_name, 
						cb.class_date, 
						cb.first_name, 
						cb.last_name, 
						cb.email
					FROM class_bookings cb
					JOIN classes c ON cb.class_id = c.id
					WHERE cb.user_id = ?
					ORDER BY cb.class_date ASC
				`;
				db.query(sql, [queryObj.user_id], (err, results) => {
					if (err) {
						console.error("Dashboard query error:", err);
						res.writeHead(500, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify({ message: "Failed to retrieve bookings" }));
					} else {
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify(results));
					}
				});
				break;
			}
			// by khadija
			case "/cancel-booking": {
				console.log("in app.js cancel-booking");
			
				const bookingId = queryObj.booking_id;
				if (!bookingId) {
					res.writeHead(400, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ message: "Booking ID is required" }));
					return;
				}
			
				const sql = `DELETE FROM class_bookings WHERE booking_id = ?`;
			
				db.query(sql, [bookingId], (err, result) => {
					if (err) {
						console.error("Cancel booking error:", err);
						res.writeHead(500, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify({ message: "Failed to cancel booking" }));
					} else {
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify({ message: "Booking cancelled successfully" }));
					}
				});
				break;
			}
			// by khadija
			case "/user/delete": {
				console.log("in app.js delete user");
		  
				const userId = queryObj.user_id;
				if (!userId) {
				  res.writeHead(400, { 'Content-Type': 'application/json' });
				  res.end(JSON.stringify({ message: "User ID required" }));
				  return;
				}
		  
				const sql = "DELETE FROM users WHERE id = ?";
				db.query(sql, [userId], (err, result) => {
				  if (err) {
					console.error("Delete account error:", err);
					res.writeHead(500, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ message: "Failed to delete account." }));
				  } else {
					res.writeHead(200, { 'Content-Type': 'application/json' });
					res.end(JSON.stringify({ message: "Account deleted successfully." }));
				  }
				});
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
	const path = url.parse(req.url, true).pathname;
	console.log("POST request to:", path);
  
	let body = '';
	req.on('data', chunk => { body += chunk; });
  
	req.on('end', () => {
	  try {
		const queryObj = JSON.parse(body);
		console.log("Body:", queryObj);
  
		if (path === "/update-account") // by khadija
			 {
		  const { user_id, username, email, password } = queryObj;
  
		  if (!user_id || !username || !email || !password) {
			res.writeHead(400, { 'Content-Type': 'text/plain' });
			return res.end("Missing required fields.");
		  }
  
		  const sql = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
		  db.query(sql, [username, email, password, user_id], (err, result) => {
			if (err) {
			  console.error("Update error:", err);
			  res.writeHead(500, { 'Content-Type': 'text/plain' });
			  res.end("Failed to update user.");
			} else {
			  res.writeHead(200, { 'Content-Type': 'text/plain' });
			  res.end("User updated successfully.");
			}
		  });
  
		} else if (path === "/schedule") 
			 {
		  if (queryObj.action === "available") {
			schedule.availableSlot(queryObj, res);
		  } else if (queryObj.action === "book") {
			schedule.book(queryObj, res, db);
		  }
  
		} else if (path === "/contact") {
		  cont.contact(queryObj, res);
  
		} else if (path === "/register") // by khadija
			 {
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
  
		} else if (path === "/login") // by khadija
			 {
			console.log("in app.js login");
			const { email, username, password } = queryObj;
		  
			const loginInput = email || username; // support either key
			const sql = "SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?";
		  
			db.query(sql, [loginInput, loginInput, password], (err, results) => {
			  if (err) {
				res.writeHead(500, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: "Server error" }));
			  } else if (results.length > 0) {
				const user = results[0];
				res.writeHead(200, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({
				  message: "Login successful",
				  user_id: user.id,
				  username: user.username
				}));
			  } else {
				res.writeHead(401, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: "Invalid credentials" }));
			  }
			});
		  
  
		} else if (path === "/register_event") // by khadija
			{
		  const { firstName, lastName, email, eventName } = queryObj;
		  const fullName = firstName + " " + lastName;
		  const sql = "INSERT INTO event_registrations (name, email, event_name) VALUES (?, ?, ?)";
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
				  console.log("Email sent:", info.response);
				  res.writeHead(200, { 'Content-Type': 'text/plain' });
				  res.end("Reservation successful! Confirmation email sent.");
				}
			  });
			}
		  });
  
		} else {
		  // fallback to static file
		  let fileName = './public_html' + path;
		  console.log("Fallback to file:", fileName);
		  readFile.readFile(fileName, res);
		}
  
	  } catch (err) {
		console.error("Invalid POST body:", err);
		res.writeHead(400, { 'Content-Type': 'text/plain' });
		res.end("Invalid request body.");
	  }
	});
  }
  
}

	// creating server object
	const myServer = http.createServer(handle_incoming_requests);

	// server starts listenig on port 3000
	myServer.listen(3000, function () { console.log("Listening on port 3000") });
