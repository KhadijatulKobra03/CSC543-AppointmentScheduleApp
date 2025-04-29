
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".reserve-btn").forEach(button => {
      button.addEventListener("click", (e) => {
        const eventName = e.target.getAttribute("data-event");
        document.getElementById("event_name").value = eventName;
        new bootstrap.Modal(document.getElementById('reserveModal')).show();
      });
    });
  
    document.getElementById("reservationForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const firstName = document.getElementById("first_name").value;
      const lastName = document.getElementById("last_name").value;
      const email = document.getElementById("email").value;
      const confirmEmail = document.getElementById("confirm_email").value;
      const eventName = document.getElementById("event_name").value;
  
      if (email !== confirmEmail) {
        alert("Emails do not match!");
        return;
      }
  
      const res = await fetch("/register_event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, eventName })
      });
  
      const msg = await res.text();
      alert(msg);
      document.getElementById("reservationForm").reset();
      bootstrap.Modal.getInstance(document.getElementById('reserveModal')).hide();
    });
  });
  