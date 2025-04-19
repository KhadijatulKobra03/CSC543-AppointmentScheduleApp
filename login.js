document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });
    alert(await res.text());
  });
  