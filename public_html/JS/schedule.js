
document.getElementById("cancel").addEventListener("click", cancel);
document.getElementById("bookingButton").addEventListener("click", showBookingForm);

let Form = new bootstrap.Modal(document.getElementById("bookingForm"));

let booking = [];

function showBookingForm (){
    Form.show();
}

let availableDates = [];

document.getElementById("classSelect").addEventListener("change", function () {
const selectedClass = this.value;

if (selectedClass == "")
    return;


    let xmlhttpBook = new XMLHttpRequest();
    xmlhttpBook.open("POST", "/schedule", true);
    xmlhttpBook.setRequestHeader("Content-Type", "application/json");
    
    xmlhttpBook.onload = function () { // when request is loaded, xmlhttpAvailableSlots will be parsed as JSON
        if (xmlhttpBook.status === 200) {
            const response = JSON.parse(xmlhttpBook.responseText);
            const dates = response.availableDates; 
                Form.show();

                flatpickr("#class-date", {
                    dateFormat: "Y-m-d",
                    enable: dates,   
                    disable: [
                        function(date) {
                          const disabledDates = date.toISOString().split('T')[0]; 
                          return !dates.includes(disabledDates); // Disable dates not in the  array
                        }
                      ] 
                });
         
        } else {
            console.error("Failed to fetch available dates");
        }
    };
        xmlhttpBook.send(JSON.stringify({className:selectedClass, action: "available"}));
});

    document.getElementById("book").addEventListener("click", function () {
                let classSelection = document.getElementById("classSelect").value;
                let dateOfClass = document.getElementById("class-date").value;
                let firstNameOfUser = document.getElementById("first-name").value;
                let lastNameOfUser = document.getElementById("last-name").value;
                let emailOfUser = document.getElementById("email").value;
                
                if (!classSelection) {
                    alert("Please select a class");
                    return;
                }

                if (!dateOfClass) {
                    alert("Please select a date");
                    return;
                }

                if (!firstNameOfUser) {
                    alert("Please fill in with mandatory personal information");
                    return;
                }
                
                if (!lastNameOfUser) {
                    alert("Please fill in with mandatory personal information");
                    return;
                }

                if (!emailOfUser) {
                    alert("Please fill in with mandatory personal information");
                    return;
                }

                let bookedAppointments = {
                    className: classSelection, 
                    classDate: dateOfClass,
                    firstName: firstNameOfUser, 
                    lastName: lastNameOfUser, 
                    email: emailOfUser,
                    action: "book"
                };
              
                
            let xmlhttpBooked = new XMLHttpRequest();
                xmlhttpBooked.open("POST", "/schedule", true);
                xmlhttpBooked.setRequestHeader("Content-Type", "application/json");

                xmlhttpBooked.onload = function () {
                    if (xmlhttpBooked.status === 200) {
                        const confirmation = JSON.parse(xmlhttpBooked.responseText);
                        alert(confirmation.message);
                        Form.hide();
                
                    } else {
                        alert("Booking failed");
                        console.error("Error:", xmlhttpBooked.responseText);
                    }
                };
            xmlhttpBooked.send(JSON.stringify(bookedAppointments)); 

            });
 
             
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

