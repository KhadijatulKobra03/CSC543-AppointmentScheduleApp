document.addEventListener("DOMContentLoaded", () => {
    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");
  
    // ✅ Safely update the welcome message
    const userSpan = document.getElementById("username");
    if (userSpan) {
      userSpan.innerHTML = username || "Guest";
    }
  
    
  
    // Fetch bookings
    fetch(`/dashboard?user_id=${user_id}`)
      .then(res => res.json())
      .then(bookings => {
        const bookingList = document.getElementById("bookingList");
        bookingList.innerHTML = ""; // Clear before appending
  
        bookings.forEach(booking => {
          const div = document.createElement("div");
          div.className = "card p-3 m-2 col-md-6";
          div.innerHTML = `
            <h5>${booking.class_name}</h5>
            <p>Date: ${booking.class_date}</p>
            <p>Name: ${booking.first_name} ${booking.last_name}</p>
            <p>Email: ${booking.email}</p>
            <button class="btn btn-danger cancel-btn" data-id="${booking.booking_id}">Cancel</button>
          `;
          bookingList.appendChild(div);
        });
  
        // Attach cancel handlers
        document.querySelectorAll(".cancel-btn").forEach(button => {
          button.addEventListener("click", () => {
            const booking_id = button.getAttribute("data-id");
            fetch(`/schedule?action=cancel&booking_id=${booking_id}`)
              .then(res => res.text())
              .then(msg => {
                alert("Booking cancelled.");
                location.reload();
              });
          });
        });
      });
  });
  