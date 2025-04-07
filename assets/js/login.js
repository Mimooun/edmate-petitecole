// function login() {
//   const username = document.getElementById("username").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const message = document.getElementById("message");

//   const user = users.find(u => u.username === username && u.password === password);

//   if (user) {
//     // ✅ Enregistre que l'utilisateur est connecté
//     localStorage.setItem("isLoggedIn", "true");

//     message.textContent = "Connexion réussie ✅";
//     message.style.color = "green";

//     // Redirection vers la page d'accueil
//     setTimeout(() => {
//       window.location.href = "index.html";
//     }, 1000);
//   } else {
//     message.textContent = "Identifiants incorrects ❌";
//     message.style.color = "red";
//   }
// }
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", user.username);

    const now = new Date().toLocaleString();
    localStorage.setItem("loginTime", now);

    // ✅ Corrigé ici : ajoute logout: null
    const record = { username: user.username, login: now, logout: null };

    let history = JSON.parse(localStorage.getItem("loginHistory")) || [];
    history.push(record);
    localStorage.setItem("loginHistory", JSON.stringify(history));

    message.textContent = "Connexion réussie ✅";
    message.style.color = "green";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    message.textContent = "Identifiants incorrects ❌";
    message.style.color = "red";
  }
}

function logout() {
  const logoutTime = new Date().toLocaleString();
  let history = JSON.parse(localStorage.getItem("loginHistory")) || [];

  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].username === localStorage.getItem("username") && history[i].logout === null) {
      history[i].logout = logoutTime;
      break;
    }
  }

  localStorage.setItem("loginHistory", JSON.stringify(history));
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  localStorage.removeItem("loginTime");

  window.location.href = "login.html";
}

