function availableSlot () {
    const freeSlot = document.querySelectorAll(".day");

    freeSlot.forEach(slot => {
    slot.addEventListener("click", function(){
    const bookingForm = new bootstrap.Modal(document.getElementById("bookingClass"));
    bookingForm.show();
    });
   
    });
}
availableSlot();

