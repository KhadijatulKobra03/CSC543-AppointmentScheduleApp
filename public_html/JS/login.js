document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
  
        try {
          const res = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
  
          const msg = await res.text();
          alert(msg);
          if (res.ok) {
            window.location.href = "index.html";
          }
        } catch (error) {
          console.error("Login error:", error);
          alert("An error occurred during login.");
        }
      });
    }
  });
  