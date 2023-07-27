  //Création de l'affichage
  
  function affichage(elementsGalerie) {
    // Choix de l'emplacement parent (balise qui accueui les fiches)
  
    const sectionAffichage = document.querySelector(".gallery");
    sectionAffichage.innerHTML = "";
    for (let i = 0; i < elementsGalerie.length; i++) {
      const articleGalerie = elementsGalerie[i];
  
      // Création de l'affiçchage de la galerie par defaut
  
      const fiche = document.createElement("div");
      fiche.classList.add("fiche");
      const image = document.createElement("img");
      image.src = articleGalerie.imageUrl;
      const titre = document.createElement("p");
      titre.innerText = articleGalerie.title;
  
      //Rattachement des elements
  
      sectionAffichage.appendChild(fiche);
      fiche.appendChild(image);
      fiche.appendChild(titre);
    }
  }

// Catégorie de filtrage

function recuperationCategories() {
    // Récupération des catégories de l'API
  
    fetch("http://localhost:5678/api/categories")
      .then((reponse) => reponse.json())
      .then((category) => {
        categoriesFiltres = category;
  
        // Choix de l'emplacement parent
  
        const sectionFiltres = document.querySelector(".filtres");
  
        // Création du bouton filtre

  
        const bouttonTous = document.createElement("button");
        bouttonTous.classList.add("bouttonTous");
        bouttonTous.innerText = "Tous";
  
        // Rattachement du bouton
  
        sectionFiltres.appendChild(bouttonTous);
  
        // Evenement au clique
  
        bouttonTous.addEventListener("click", () => {
          recuperationTravaux();
        });
  
        // assignation des catégories au boutons filtres
  
        for (let i = 0; i < category.length; i++) {
          const categories = category[i];
  
          // creation boutons filtres
  
          const boutonsFiltres = document.createElement("button");
          boutonsFiltres.classList.add("boutonsFiltres");
          boutonsFiltres.innerText = categories.name;
          sectionFiltres.appendChild(boutonsFiltres);
  
          // evenement click
  
          boutonsFiltres.addEventListener("click", () => {
            recuperationTravaux(categories.name);
          });
        }
      });
  }
  
  // Récupération des donnés Travaux de l'API
  
  function recuperationTravaux(filtre = "tous") {
    /*le parametre de la fonction recuperationTravaux indique 
    l'affichage de filtre tous et l'affichage par defaut par defaut*/
  
    // Récupération elements du tableau travaux de l'API
  
    fetch("http://localhost:5678/api/works")
      .then((reponse) => reponse.json())
      .then((travaux) => {
        // informations fonctionnement affichage
        if (filtre == "tous") {
          affichage(travaux);
  
          // information d'affichage filtrer
        } else {
          const filtrage = travaux.filter(function (afichageFiltrer) {
            return afichageFiltrer.category.name === filtre;
          });
          affichage(filtrage);
          //appel de la fonction affichage avec fitrage pour argument
        }
      });
  }
  
  
  // Appel de la fonction recuperation des travaux
  
  recuperationCategories();
  
  // Appel de la fonction d'affichage par defaut
  
  recuperationTravaux();
  



  // Action logout déconnection
  function seDeconnecter() {
    const logout = document.getElementById("logout");
  
    logout.addEventListener("click", (e) => {
      e.preventdefault;
      deconnection();
    });
  
  }
  
  function deconnection() {
    const actionDeconnection = localStorage.clear();
    location.reload();
  }
  seDeconnecter();

  // DISPLAY OF INDEX PAGE AFTER LOGIN
  
  function statutConnecte() {
    const token = localStorage.getItem("token");
    const login = document.getElementById("login");
  
    // Condition
  
    if (token != null) {
      login.style.display = "none";
      const header = document.querySelector("header");
      header.style.flexDirection = "column-reverse";
      const barreModification = document.createElement("div");
      barreModification.classList.add("barre-modif");
      const labelModif = document.createElement("h3");
      labelModif.innerText = "Mode édition";
      const boutonPublier = document.createElement("button");
      boutonPublier.innerText = "publier les changements";
      boutonPublier.type = "submit";
      boutonPublier.classList.add("bouton-publier");
      //Rattachement
  
      header.appendChild(barreModification);
      barreModification.appendChild(labelModif);
      barreModification.appendChild(boutonPublier);
    } 
    else {
      logout.style.display = "none";
      login.style.display = "block";
      const modalNone = document.querySelector(".modalNone");
      modalNone.style.display = "none";
    }
  }
  statutConnecte();

  const btnErease = window.localStorage.getItem("token");
  if (btnErease) {
    const Filtres = document.querySelector(".filtres");
    Filtres.style.display = "none"
  }


  
  // POUR LA MODAL

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0]; 
// Get le modal2
const modal1 = document.querySelector('.modal1')
// Get le modal2
const modal2 = document.querySelector('.modal2')
// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  modal2.style.display="none";
  modal1.style.display="block";
}
// Get button that contains modal2
const btnAjouter = document.querySelector('.addImg');
btnAjouter.onclick=function(){
  modal2.style.display="block";
  modal1.style.display="none";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// back modal1
const retourModal1 = document.querySelector('.back');
retourModal1.onclick=function(){
  modal1.style.display="block";
  modal2.style.display="none"
}
// TO HIDE THE MODAL ONCE ON THE MODAL 2
span2.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// TO GENERATE AUTOMATICALLY THE PHOTOS IN THE MODAL
const urlPhoto = fetch("http://localhost:5678/api/works")
 .then((reponse) => reponse.json())
      .then((travaux) => {  
      for(let i=0; i<travaux.length; i++){
        const articlePhotoMod = travaux[i];
        const divPhotoMod = document.querySelector('.galleryModal');
        const sectionElement = document.createElement('article');
        const image = document.createElement("img");
      image.src = articlePhotoMod.imageUrl;
      const titre = document.createElement("p");
      titre.innerText = "editer";
      divPhotoMod.appendChild(sectionElement);
      sectionElement.appendChild(image);
      sectionElement.appendChild(titre);
    }
      })



// //TO ADD PHOTOS
























