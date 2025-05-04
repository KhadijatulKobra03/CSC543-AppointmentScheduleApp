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
                  body: JSON.stringify({ email, password })
              });

              const data = await res.json();

              if (res.ok && data.user_id) {
                localStorage.setItem("user_id", data.user_id);
                localStorage.setItem("username", data.username);
                  alert("Login successful!");
                  window.location.href = "index.html";
              } else {
                  alert(data.message || "Login failed");
              }
          } catch (error) {
              console.error("Login error:", error);
              alert("An error occurred during login.");
          }
      });
  }
});



