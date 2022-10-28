type Score = {
    p1 : number;
    p2 : number;
}

class Partie{
    score : Score = {p1 : 0, p2 : 0};

    lastPlayed : number = 0;

    play (j1 : number) : 0|1|2 {
        let j2 = Math.ceil(Math.random() * 3);
        this.lastPlayed = j2;
        if((j1 == 1 && j2 == 3) || (j1 == 2 && j2 == 1) || (j1 == 3 && j2 == 2)){
            this.score.p1++;
            return 1;
        }
        else if(j1 == j2){
            return 0;
        }
        else{
            this.score.p2++;
            return 2;
        }
    }
}

class Manager{
    partie : Partie = new Partie();

    historique : Array<Partie> = new Array<Partie>();

    player1Score = document.getElementById("player1Score")!;
    player2Score = document.getElementById("player2Score")!;

    pierre = document.getElementById("bPierre")!;
    feuille = document.getElementById("bFeuille")!;
    ciseaux = document.getElementById("bCiseaux")!;

    resultat = document.getElementById("resultat")!;

    imgJ1 = document.createElement("img");
    imgJ2 = document.createElement("img");
    pResult = document.createElement("p");

    imgs = [
        "img/rock.svg",
        "img/paper.svg",
        "img/scissors.svg"
    ]

    updateScore(): void{
        this.player1Score.innerText = this.partie.score.p1.toString();
        this.player2Score.innerText = this.partie.score.p2.toString();
    }

    constructor(){
        this.pierre.dataset.coup = "1";
        this.pierre.addEventListener("click", this.handleClick.bind(this));
        this.feuille.dataset.coup = "2";
        this.feuille.addEventListener("click",this.handleClick.bind(this));
        this.ciseaux.dataset.coup = "3";
        this.ciseaux.addEventListener("click", this.handleClick.bind(this));
        this.updateScore();
    }

    private handleClick(e : MouseEvent){
        let played : number;
        this.resultat.innerHTML = "";
        this.pResult.className = "";

        if(e.currentTarget instanceof HTMLElement){
            played = parseInt(e.currentTarget.dataset.coup!);
            switch(this.partie.play(played)){
                case 0:
                    this.pResult.classList.add("draw");
                    this.pResult.innerText = "Egalité !";
                    break;
                case 1:
                    this.pResult.classList.add("win");
                    this.pResult.innerText = "Gagné !";
                    break;
                case 2:
                    this.pResult.classList.add("lose");
                    this.pResult.innerText = "Perdu !";
                    break;
            }
            this.imgJ1.src = this.imgs[played - 1];
            this.imgJ2.src = this.imgs[this.partie.lastPlayed - 1];
            this.resultat.appendChild( this.imgJ1);
            this.resultat.append(" - ");
            this.resultat.appendChild( this.imgJ2);
            this.resultat.appendChild(this.pResult);
            this.updateScore();
        }}
}
window.onload = () =>{
    let mananger = new Manager();
}