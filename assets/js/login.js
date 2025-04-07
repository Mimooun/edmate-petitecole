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

// function login() {
//   const username = document.getElementById("username").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const message = document.getElementById("message");

//   const user = users.find(u => u.username === username && u.password === password);

//   if (user) {
//     localStorage.setItem("isLoggedIn", "true");
//     localStorage.setItem("username", user.username);

//     const now = new Date().toLocaleString();
//     localStorage.setItem("loginTime", now);

//     // ✅ Corrigé ici : ajoute logout: null
//     const record = { username: user.username, login: now, logout: null };

//     let history = JSON.parse(localStorage.getItem("loginHistory")) || [];
//     history.push(record);
//     localStorage.setItem("loginHistory", JSON.stringify(history));

//     message.textContent = "Connexion réussie ✅";
//     message.style.color = "green";

//     setTimeout(() => {
//       window.location.href = "index.html";
//     }, 1000);
//   } else {
//     message.textContent = "Identifiants incorrects ❌";
//     message.style.color = "red";
//   }
// }

// function logout() {
//   const logoutTime = new Date().toLocaleString();
//   let history = JSON.parse(localStorage.getItem("loginHistory")) || [];

//   for (let i = history.length - 1; i >= 0; i--) {
//     if (history[i].username === localStorage.getItem("username") && history[i].logout === null) {
//       history[i].logout = logoutTime;
//       break;
//     }
//   }

//   localStorage.setItem("loginHistory", JSON.stringify(history));
//   localStorage.removeItem("isLoggedIn");
//   localStorage.removeItem("username");
//   localStorage.removeItem("loginTime");

//   window.location.href = "login.html";
// }

// function exportToCSV() {
//   const history = JSON.parse(localStorage.getItem("loginHistory")) || [];
//   const currentUser = localStorage.getItem("username");

//   if (!currentUser) {
//     alert("Aucun utilisateur connecté.");
//     return;
//   }

//   // 📌 Filtrer les connexions de l'utilisateur connecté uniquement
//   const userHistory = history.filter(item => item.username === currentUser);

//   if (userHistory.length === 0) {
//     alert("Aucune connexion enregistrée pour cet utilisateur.");
//     return;
//   }

//   let csv = "Email,Date de connexion,Date de déconnexion\n";
//   userHistory.forEach(item => {
//     const login = item.login || "inconnu";
//     const logout = item.logout || "";
//     csv += `${item.username},${login},${logout}\n`;
//   });

//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);

//   const filename = `${currentUser}_historique_connexions.csv`;

//   const link = document.createElement("a");
//   link.href = url;
//   link.download = filename;
//   link.click();
// }

// --------------------------------------------------------------- fichier excel 
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

    // ✅ Crée l'enregistrement local + distant
    const record = { username: user.username, login: now, logout: null };

    // Enregistre en local
    let history = JSON.parse(localStorage.getItem("loginHistory")) || [];
    history.push(record);
    localStorage.setItem("loginHistory", JSON.stringify(history));

    // ✅ Envoie vers Google Sheets
    fetch("https://script.google.com/macros/s/AKfycbxJvg_oXGO8I9hWEU4OB_hINLg4hUktgEADWQIF4q7PXlr-8aoRufwD07laF9wIcAFMZg/exec", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Affiche message + redirection
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
  const currentUser = localStorage.getItem("username");

  let lastRecord = null;

  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].username === currentUser && history[i].logout === null) {
      history[i].logout = logoutTime;
      lastRecord = history[i];
      break;
    }
  }

  // Enregistre localement la déconnexion
  localStorage.setItem("loginHistory", JSON.stringify(history));

  // ✅ Envoie mise à jour vers Google Sheets
  if (lastRecord) {
    fetch("https://script.google.com/macros/s/AKfycbxJvg_oXGO8I9hWEU4OB_hINLg4hUktgEADWQIF4q7PXlr-8aoRufwD07laF9wIcAFMZg/exec", {
      method: "POST",
      body: JSON.stringify(lastRecord),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  // Nettoyage session
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  localStorage.removeItem("loginTime");

  window.location.href = "login.html";
}

function exportToCSV() {
  const history = JSON.parse(localStorage.getItem("loginHistory")) || [];
  const currentUser = localStorage.getItem("username");

  if (!currentUser) {
    alert("Aucun utilisateur connecté.");
    return;
  }

  const userHistory = history.filter(item => item.username === currentUser);

  if (userHistory.length === 0) {
    alert("Aucune connexion enregistrée pour cet utilisateur.");
    return;
  }

  let csv = "Email,Date de connexion,Date de déconnexion\n";
  userHistory.forEach(item => {
    const login = item.login || "inconnu";
    const logout = item.logout || "";
    csv += `${item.username},${login},${logout}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const filename = `${currentUser}_historique_connexions.csv`;

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
}
