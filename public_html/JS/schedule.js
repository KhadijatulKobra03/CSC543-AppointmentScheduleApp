document.getElementById("bookingButton").addEventListener("click", availableSlot);
document.getElementById("cancel").addEventListener("click", cancel);
document.getElementById("book").addEventListener("click", book);

let Form;

let booking = [];

function availableSlot () {
    Form = new bootstrap.Modal(document.getElementById("bookingForm"));

    let xmlhttpAvailableSlot = new XMLHttpRequest();
    xmlhttpAvailableSlot.open("GET", "/bookaclass", true);
    xmlhttpAvailableSlot.onload = function () { // when request is loaded, xmlhttpContains will be parsed as JSON
        if (xmlhttpAvailableSlot.status === 200) {
                Form.show();
       
        } else {
            console.log("Failed to send GET request to Book a Class", xmlhttpAvailableSlot.status);
        }
    };
        xmlhttpAvailableSlot.send(); 

} 

function book(){

        let nameOfClass = document.getElementById("class-name").value;
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
        xmlhttpAddBookedClass.open("POST", "/bookclass", true); // POST request on AJAX
        xmlhttpAddBookedClass.setRequestHeader("Content-Type", "application/json");

        xmlhttpAddBookedClass.onload = function () {
            if (xmlhttpAddBookedClass.status === 200) {
                console.log("Your class has been booked!:", xmlhttpAddBookedClass.responseText);
                booking.push(bookedAppointments);
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
        xmlhttpCancel.open("GET", "/cancel", true);
        xmlhttpCancel.onload = function () { // when request is loaded, xmlhttpContains will be parsed as JSON
            if (xmlhttpCancel.status === 200) {
                    Form.hide();
           
            } else {
                console.log("Failed to send GET request to cancel booking request", xmlhttpCancel.status);
            }
        };
        xmlhttpCancel.send(); 
    
    } 
