document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("user_id");
  
    // ✅ Redirect if not logged in
    if (!userId) {
      alert("Please log in to access your dashboard.");
      window.location.href = "login.html";
      return;
    }
  
    // ✅ Show username in welcome message
    const userSpan = document.getElementById("username");
    if (username && userSpan) userSpan.textContent = username;
  
    // ✅ Load booked classes
    fetch(`/dashboard?user_id=${userId}`)
      .then(res => res.json())
      .then(bookings => {
        if (!Array.isArray(bookings)) throw new Error("Invalid bookings");
  
        const bookingList = document.getElementById("bookingList");
        bookingList.innerHTML = "";
  
        bookings.forEach(booking => {
          const card = document.createElement("div");
          card.className = "card p-3 m-2 col-md-5";
          card.innerHTML = `
            <h5>${booking.class_name}</h5>
           <p>Date: ${new Date(booking.class_date).toLocaleDateString()}</p>
            <p>Name: ${booking.first_name} ${booking.last_name}</p>
            <p>Email: ${booking.email}</p>
            <button class="btn btn-sm btn-outline-danger cancel-btn" data-id="${booking.booking_id}">Cancel Booking</button>
          `;
          bookingList.appendChild(card);
        });
  
        // ✅ Handle booking cancellation
        document.querySelectorAll(".cancel-btn").forEach(button => {
          button.addEventListener("click", () => {
            const bookingId = button.getAttribute("data-id");
            if (confirm("Are you sure you want to cancel this booking?")) {
              fetch(`/cancel-booking?booking_id=${bookingId}`, { method: "GET" })
                .then(res => res.json())
                .then(data => {
                  alert(data.message);
                  location.reload();
                })
                .catch(err => {
                  alert("Failed to cancel booking.");
                  console.error(err);
                });
            }
          });
        });
      })
      .catch(err => {
        console.error("Error loading bookings:", err);
        alert("Could not load bookings.");
      });
  
    // ✅ Handle account update form submission
    const updateForm = document.getElementById("updateForm");
    if (updateForm) {
      updateForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const newUsername = document.getElementById("updateUsername").value;
        const newEmail = document.getElementById("updateEmail").value;
        const newPassword = document.getElementById("updatePassword").value;
  
        const res = await fetch("/update-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            username: newUsername,
            email: newEmail,
            password: newPassword
          })
        });
  
        const msg = await res.text();
        alert(msg);
  
        if (res.ok) {
          // Hide modal and update welcome message + localStorage
          const modal = bootstrap.Modal.getInstance(document.getElementById("updateModal"));
          modal.hide();
          localStorage.setItem("username", newUsername);
          localStorage.setItem("email", newEmail);
          document.getElementById("username").textContent = newUsername;
        }
      });
    }
  
    // ✅ Handle account delete button
    const deleteBtn = document.getElementById("deleteAccountBtn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete your account? This action is irreversible.")) {
          fetch(`/user/delete?user_id=${userId}`, { method: "GET" })
            .then(res => res.json())
            .then(data => {
              alert(data.message);
              localStorage.clear();
              window.location.href = "index.html";
            })
            .catch(err => {
              alert("Failed to delete account.");
              console.error(err);
            });
        }
      });
    }
  });
  