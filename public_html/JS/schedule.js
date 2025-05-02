
document.getElementById("bookingButton").addEventListener("click", () => {
    const userSelection = document.getElementById("classSelect").value;

    if (!userSelection) {
        alert("Please select a class before checking availability.");
        return;
    }
    availableSlot(userSelection);
});
document.getElementById("cancel").addEventListener("click", cancel);
document.getElementById("book").addEventListener("click", book);

let Form = new bootstrap.Modal(document.getElementById("bookingForm"));

let booking = [];

let availableDates = [];

function availableSlot (className) {

    let xmlhttpAvailableSlot = new XMLHttpRequest();
    xmlhttpAvailableSlot.open("POST", "/schedule?action=available", true);
    xmlhttpAvailableSlot.onload = function () { // when request is loaded, xmlhttpAvailableSlots will be parsed as JSON
        if (xmlhttpAvailableSlot.status === 200) {
            const response = JSON.parse(xmlhttpAvailableSlot.responseText);
            const availableDates = response.availableDates; 
                Form.show();

                flatpickr("#class-date", {
                    enable: availableDates, 
                    dateFormat: "Y-m-d"
                });
       
        } else {
            console.log("Failed to fetch available dates:", xmlhttpAvailableSlot.status);
        }
    };
        xmlhttpAvailableSlot.send((JSON.stringify({ className }))); 

} 

function book(){

        let nameOfClass = document.getElementById("classSelect").value;;
        let dateOfClass = document.getElementById("class-date").value;
        let firstNameOfUser = document.getElementById("first-name").value;
        let lastNameOfUser = document.getElementById("last-name").value;
        let emailOfUser = document.getElementById("email").value;
        
        let bookedAppointments = {
            className: nameOfClass, 
            classDate: dateOfClass,
            firstName: firstNameOfUser, 
            lastName: lastNameOfUser, 
            email: emailOfUser
        };
        
        let xmlhttpAddBookedClass = new XMLHttpRequest();
        xmlhttpAddBookedClass.open("POST", "/schedule?action=book", true); // POST request on AJAX
        xmlhttpAddBookedClass.setRequestHeader("Content-Type", "application/json");

        xmlhttpAddBookedClass.onload = function () {
            if (xmlhttpAddBookedClass.status === 200) {
                booking.push(bookedAppointments);
                console.log("Your class has been booked!:", xmlhttpAddBookedClass.responseText);

                let confirmation = JSON.parse(xmlhttpAddBookedClass.responseText);
                alert(confirmation.message);
                if (Form){
                    Form.hide();
                }

            } else {
                console.error("Booking failed:", xmlhttpAddBookedClass.status);
            }
        };
        xmlhttpAddBookedClass.send(JSON.stringify(bookedAppointments));
             
    }
   
    function cancel (){
        let xmlhttpCancel = new XMLHttpRequest();
        xmlhttpCancel.open("GET", "/schedule?action=cancel", true);
        xmlhttpCancel.onload = function () { 
            if (xmlhttpCancel.status === 200) {
                console.log("Booking canceled:", xmlhttpCancel.responseText);
                if (Form) {
                    Form.hide();
                }
            } else {
                console.log("Failed to cancel booking request", xmlhttpCancel.status);
            }
        };
        xmlhttpCancel.send(); 
    
    } 
