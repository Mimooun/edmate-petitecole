function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  fetch("/users.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du fichier JSON");
      }
      return response.json();
    })
    .then(users => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        message.textContent = "Connexion réussie ✅";
        message.style.color = "green";

        // ⏳ Redirection après 1 seconde
        setTimeout(() => {
          window.location.href = "index.html"; // Chemin vers la page d’accueil
        }, 1000);

      } else {
        message.textContent = "Identifiant ou mot de passe incorrect ❌";
        message.style.color = "red";
      }
    })
    .catch(error => {
      console.error(error);
      message.textContent = "Erreur serveur ou fichier introuvable.";
      message.style.color = "red";
    });
}
