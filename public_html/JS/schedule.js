document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cancel").addEventListener("click", cancel);
    document.getElementById("bookingButton").addEventListener("click", showBookingForm);
    document.getElementById("classSelect").addEventListener("change", handleClassChange);
    document.getElementById("book").addEventListener("click", handleBooking);

    let Form = new bootstrap.Modal(document.getElementById("bookingForm"));
    let flatpickrInstance = null;

    function showBookingForm() {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) {
            alert("You must register or log in before booking a class.");
            window.location.href = "register.html";
            return;
        }

        Form.show();
    }

    function handleClassChange() {
        const selectedClass = this.value;
        if (!selectedClass) return;

        const xmlhttpBook = new XMLHttpRequest();
        xmlhttpBook.open("POST", "/schedule", true);
        xmlhttpBook.setRequestHeader("Content-Type", "application/json");

        xmlhttpBook.onload = function () {
            if (xmlhttpBook.status === 200) {
                const response = JSON.parse(xmlhttpBook.responseText);
                const dates = response.availableDates;

                console.log("Received dates:", dates);
                alert("Available Dates: " + dates.join(", "));

                if (flatpickrInstance) {
                    flatpickrInstance.destroy();
                }

                flatpickrInstance = flatpickr("#class-date", {
                    dateFormat: "Y-m-d",
                    enable: dates
                });

                Form.show();
            } else {
                console.error("Failed to fetch available dates");
            }
        };

        xmlhttpBook.send(JSON.stringify({ className: selectedClass, action: "available" }));
    }

    function handleBooking() {
        const userId = sessionStorage.getItem("user_id");
        if (!userId) {
            alert("You must register or log in before booking a class.");
            window.location.href = "register.html";
            return;
        }

        let classSelection = document.getElementById("classSelect").value;
        let dateOfClass = document.getElementById("class-date").value;
        let firstNameOfUser = document.getElementById("first-name").value;
        let lastNameOfUser = document.getElementById("last-name").value;
        let emailOfUser = document.getElementById("email").value;

        if (!classSelection || !dateOfClass || !firstNameOfUser || !lastNameOfUser || !emailOfUser) {
            alert("Please fill in all fields.");
            return;
        }

        if (/^\d+$/.test(firstNameOfUser)) {
            alert("Please enter a valid first name.");
            return;
        }

        if (/^\d+$/.test(lastNameOfUser)) {
            alert("Please enter a valid last name.");
            return;
        }

        if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(emailOfUser)) {
            alert("Please enter a valid email.");
            return;
        }

        let bookedAppointments = {
            user_id: userId,
            class_name: classSelection,
            class_date: dateOfClass,
            first_name: firstNameOfUser,
            last_name: lastNameOfUser,
            email: emailOfUser,
            action: "book"
        };

        const xmlhttpBooked = new XMLHttpRequest();
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
    }

    function cancel() {
        const xmlhttpCancel = new XMLHttpRequest();
        xmlhttpCancel.open("GET", "/schedule?action=cancel", true);

        xmlhttpCancel.onload = function () {
            if (xmlhttpCancel.status === 200) {
                console.log("Booking canceled:", xmlhttpCancel.responseText);
                Form.hide();
            } else {
                console.log("Failed to cancel booking", xmlhttpCancel.status);
            }
        };

        xmlhttpCancel.send();
    }
    setTimeout(() => {
        const userId = sessionStorage.getItem("user_id");
        if (userId) {
            Form.show();
        }
    }, 5000);
    


});
