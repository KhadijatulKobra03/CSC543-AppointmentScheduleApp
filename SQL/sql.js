-- Queries 

----------------------------------------------

// retrieving bookings

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
					ORDER BY cb.class_date ASC;

----------------------------------------------

// cancelig reservation

DELETE FROM class_bookings WHERE booking_id = ?;

----------------------------------------------

// deleting user account

DELETE FROM users WHERE id = ?;

----------------------------------------------

// updating user account

UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?;

----------------------------------------------

// registering for an account

INSERT INTO users (username, email, password) VALUES (?, ?, ?);

----------------------------------------------

// logging in

SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?;

----------------------------------------------

// Reserving spot for an event                           

INSERT INTO event_registrations (name, email, event_name) VALUES (?, ?, ?);                           
  
----------------------------------------------


                           


  



