let scoreJ1 = 0; // creation d'un variable modifiable du scord du joueur 1
let scoreJ2 = 0; // creation d'un variable modifiable du scord du joueur 2

const player1Score = document.getElementById("player1Score"); // affectaction du l'objet HTML qui affiche le score du joueur 1 a une constante
const player2Score = document.getElementById("player2Score"); // affectaction du l'objet HTML qui affiche le score du joueur 2 a une constante

const pierre = document.getElementById("bPierre"); // affectation de l'objet HTML qui affiche le bouton Pierre a une constante
const feuille = document.getElementById("bFeuille"); // affectation de l'objet HTML qui affiche le bouton Feuille a une constante
const ciseaux = document.getElementById("bCiseaux"); // affectation de l'objet HTML qui affiche le bouton Ciseaux a une constante

const resultat = document.getElementById("resultat"); // affectation de la div resultat a un constante

const imgJ1 = document.createElement("img"); // creation de l'objet HTML image pour afficher le choix du joueur 1
const imgJ2 = document.createElement("img"); // creation de l'objet HTML image pour afficher le choix du joueur 2
const pResult = document.createElement("p"); // creation d'un paragraphe pour l'affichage du resultat

const imgs = [
    "img/rock.svg",
    "img/paper.svg",
    "img/scissors.svg"
]

updateScore(); // lance la fonction nommé

let play = function(j1){ // déclaration de la fonction de jeu
    let j2 = Math.ceil(Math.random() * 3); // choix du joueur 2 (l'IA)
    resultat.innerHTML = ""; // affectation d'un espace vide pour le resultat
    pResult.className = ""; // affectation d'un espace vide pour la situation de la mannche
    imgJ1.src = imgs[j1 - 1]; // recupération de l'image choisi du joueur 1
    imgJ2.src = imgs[j2 - 1];  // recupération de l'image choisi du joueur 2
    resultat.appendChild(imgJ1); // affectation de l'image au resultat
    resultat.append(" - ");
    resultat.appendChild(imgJ2); // affectation de l'image au resultat
    
    if((j1 == 1 && j2 == 3) || (j1 == 2 && j2 == 1) || (j1 == 3 && j2 == 2)){ // condition choisi pour que joueur 1 gagne la manche
        scoreJ1++; // incrémentation du score du joueur 1 de 1
        pResult.classList.add("win");
        pResult.innerText = "Gagné !"; // affiche la situation de la manche
    }
    else if(j1 == j2){
        pResult.classList.add("draw"); 
        pResult.innerText = "Egalité !"; // affiche la situation de la manche
    }
    else{
        scoreJ2++; // incrémentation du score du joueur 2 de 1
        pResult.classList.add("lose");
        pResult.innerText = "Perdu !"; // affiche la situation de la manche
    }
    resultat.appendChild(pResult);
    updateScore(); // lance la fonction nommé
}


pierre.addEventListener("click", function(){ // déclaration de l'event au moment du clique sur le bouton pierre
    play(1); // lance la fonction play avec comme paramettre du choix du joueur 1 la valeur 1 (pierre)
});
feuille.addEventListener("click", function(){ // déclaration de l'event au moment du clique sur le bouton feuille
    play(2); // lance la fonction play avec comme paramettre du choix du joueur 1 la valeur 2 (feuille)
});
ciseaux.addEventListener("click", function(){ // déclaration de l'event au moment du clique sur le bouton ciseaux
    play(3); // lance la fonction play avec comme paramettre du choix du joueur 1 la valeur 3 (ciseaux)
});

function updateScore(){ // fonction qui se charge de mettre a jour les scores et de les afficher
    player1Score.innerText = scoreJ1;
    player2Score.innerText = scoreJ2;
}