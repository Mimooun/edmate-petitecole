function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // ✅ Enregistre que l'utilisateur est connecté
    localStorage.setItem("isLoggedIn", "true");

    message.textContent = "Connexion réussie ✅";
    message.style.color = "green";

    // Redirection vers la page d'accueil
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    message.textContent = "Identifiants incorrects ❌";
    message.style.color = "red";
  }
}
