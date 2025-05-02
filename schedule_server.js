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

    function book(params, res) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: "Class has been booked",
            booking: params
        }));
    }
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

