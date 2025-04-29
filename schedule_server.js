// Marina Schedule server side receving the AJAX request from the schedule_client.JS
// and responding to it. 

function availableSlot(params, res){
    res.writeHead (200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({message: "available slot fetched"}));
    res.end();
    }

function book(params, res){
    res.writeHead (200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({message: "Class has been booked", booking: params}));
    res.end();
    }

function cancel(params, res){
    res.writeHead (200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({message: "Booking Canceled"}));
    res.end();
    }

exports.module ={
    availableSlot,
    book,
    cancel
}
