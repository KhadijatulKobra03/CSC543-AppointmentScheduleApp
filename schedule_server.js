// Marina Schedule server side receving the AJAX request from the schedule_client.JS
// and responding to it. 

const availableClassDates = {
   "Beginner Yoga": [ "2025-07-01", "2025-07-02", "2025-07-03", "2025-08-26", "2025-08-27", "2025-08-28", "2025-08-29"],
   "Intermediate Yoga":["2025-07-21", "2025-07-22","2025-08-04", "2025-08-05", "2025-08-06"],
   "Advanced Yoga": ["2025-07-15", "2025-07-16","2025-07-17", "2025-07-18", "2025-07-19", "2025-08-18", "2025-08-19", "2025-08-21", "2025-08-22"],
   "Meditation": ["2025-06-23", "2025-06-24","2025-06-25", "2025-06-26", "2025-06-27", "2025-07-10", "2025-07-11", "2025-08-12", "2025-08-13", "2025-08-14","2025-08-15",],
   "Gentle Yoga": ["2025-07-07", "2025-07-08","2025-07-09","2025-08-08", "2025-08-09",],
   "Chair Yoga": ["2025-06-02", "2025-06-04", "2025-06-06",  "2025-06-10", "2025-06-11", "2025-06-12","2025-06-16","2025-07-30", "2025-07-31"],
   "Kids and Teens Yoga": ["2025-06-03", "2025-06-05", "2025-06-17", "2025-06-18", "2025-06-19", "2025-06-20"] }


    function availableSlot(params, res){
    
        const className = params.className;
        const availableDates = availableClassDates[className];

        if (availableDates){
        
        res.writeHead (200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ availableDates}));
        
        } else {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: "Class not found" }));
        }
    }

    /*function book(params, res, db) {
        const { user_id, class_id, class_name, class_date, first_name, last_name, email} = params;
        const sql = "INSERT INTO class_bookings(user_id, class_id, class_name, class_date, first_name, last_name, email)  VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [user_id, class_id, class_name, class_date, first_name, last_name, email], (err, result) => {
            if (err) {
            console.error(err);
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify({ message: "Class already booked" }));

            } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(JSON.stringify({
            message: "Class has been successfully booked",
            booking: params
            
        ))
    }})};*/

    function book(params, res, db) {
        const { user_id, class_name, class_date, first_name, last_name, email } = params;
    
        const getClassIdQuery = "SELECT id FROM classes WHERE name = ?";
        db.query(getClassIdQuery, [class_name], (err, result) => {
            if (err || result.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Invalid class name" }));
                return;
            }

            const class_id = result[0].id;

           // Check for duplicate booking
        const checkQuery = `
        SELECT * FROM class_bookings 
        WHERE user_id = ? AND class_id = ? AND class_date = ?`;
    db.query(checkQuery, [user_id, class_id, class_date], (checkErr, checkResult) => {
        if (checkErr) {
            console.error(checkErr);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Error checking existing booking" }));
            return;
        }

        if (checkResult.length > 0) {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "You've already booked this class on that date" }));
            return;
        }
        
        const insertQuery = `
            INSERT INTO class_bookings (user_id, class_id, class_date, first_name, last_name, email)
            VALUES (?, ?, ?, ?, ?, ?)`;
        
        db.query(insertQuery, [user_id, class_id, class_date, first_name, last_name, email], (insertErr, insertResult) => {
            if (insertErr) {
                console.error(insertErr);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: "Booking failed" }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    message: "Class successfully booked",
                    booking: {
                        class_id, class_name, class_date, first_name, last_name, email
                    }
                }));
            }
        });
    })})}
    
    function cancel(params, res){
        res.writeHead (200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({message: "Booking Canceled"}));
        res.end();
        }

module.exports ={
    availableSlot,
    book,
    cancel
}

