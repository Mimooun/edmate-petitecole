document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");
  
    fetch("users.json")
      .then(response => response.json())
      .then(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          message.textContent = "Connexion réussie ! ✅";
          message.style.color = "green";
        } else {
          message.textContent = "Email ou mot de passe incorrect ❌";
          message.style.color = "red";
        }
      })
      .catch(error => {
        message.textContent = "Erreur lors du chargement des données.";
        message.style.color = "red";
        console.error(error);
      });
  });
  