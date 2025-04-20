document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        try {
          const res = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          });
  
          const msg = await res.text();
          alert(msg);
          if (res.ok) {
            window.location.href = "login.html";
          }
        } catch (error) {
          console.error("Registration error:", error);
          alert("An error occurred during registration.");
        }
      });
    }
  });
  