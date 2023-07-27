//creation des elements de la page de

const formulaire = document.querySelector("form");
const emailInput = document.querySelector('input[name="email"]');
const passwordInput = document.querySelector('input[name="psw"]');

// Événement se connecter

formulaire.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêche l'envoi du formulaire par défaut

  const email = emailInput.value;
  const password = passwordInput.value;

  // Envoi des données d'identification à l'API pour vérification

  const response = fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    //Reponses post identification

    .then((response) => {
      //Si la réponse n'est pas ok

      if (!response.ok) {
        throw new Error("Erreur dans l'identifiant ou le mot de passe");
      }
      return response.json();
    }) 

    // Si data.token est retourné

    .then((data) => {
      if (data.token) {
        // Stockage du token dans localstorage

        localStorage.setItem("token", data.token);
        // Redirection page d'accueil

        window.location.href = "./index.html";
      } else {
        throw new Error("Erreur lors de la connexion");
      }
    });
});
