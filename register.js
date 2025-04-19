document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    });
    alert(await res.text());
  });
  