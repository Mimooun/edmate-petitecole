function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
  
    // Hardcoded credentials for example purposes
    const correctUsername = "petiteecole";
    const correctPassword = "petite2024";
  
    if (username === correctUsername && password === correctPassword) {
      message.textContent = "Connexion réussie!";
      message.style.color = "green";

      // Set a login flag in localStorage
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to index.html after successful login
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      message.textContent = "Invalid username or password";
      message.style.color = "red";
    }
}
