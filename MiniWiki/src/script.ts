const apiElt = document.getElementById("apiList");
const catList = document.getElementById("filter");

type Category = { // Type personnalisé pour les catégories
    name: string;
}

type Entry = { // Type personnalisé pour les entries
    API : string;
    Description : string;
    Auth : string;
    HTTPS : boolean;
    Cors : string;
    Link : string;
    category : string;
}

type CategoryModel = { // Conteneur des données de type Catégory
    count : number;
    categories : string[];
}

type EntryModel = { // Conteneur des données de type Entry
    count : number;
    entries : Entry[]; // spécifications du format de données récupèrer de l'API
}

function typedFetch<T>(url : string) : Promise<T>{
    return fetch(url).then(reponse => {
        if(!reponse.ok){
            throw new Error(reponse.statusText);
        }
        return reponse.json();
    });
}

class Component{
     /*
        Autre method possible  pour les données:
        Categories : Array<Category> = new Array<Category>();
        Entries : Array<Entry> = new Array<Entry>();
    */

     // Données a traiter + déclaration des Attributs que l'on va manipuler
    Categories : Category[] = [];
    Entries : Entry[] = [];

    // Element HTML
    apiElt : HTMLElement = document.getElementById("apiList")!;
    catList : HTMLElement = document.getElementById("filter")!;

    constructor(){
         // Charger les API
        this.catList!.addEventListener('change', (event) => {
          if(event.currentTarget instanceof HTMLSelectElement)
            this.load(event.currentTarget.value);
        });
        this.loadCategory();
        this.load('');
    }

    loadCategory(){
        // Charger  les catégories
        let comp : Component = this;
        fetch('https://api.publicapis.org/categories')
        .then((response)=>{response.json()
            .then((data : CategoryModel)=>{
                data.categories.forEach((element : string)=> {
                    this.Categories.push({name : element});
                });
                this.refreshview();
            });
        })
    }

    load(filter : string){
        // Charger les entries
        fetch('https://api.publicapis.org/entries?Category='+filter)
        .then((response)=>{
            response.json().then((data : EntryModel) => {
                this.Entries = data.entries;
                this.refreshview();
            });
        })
    /*
        typedFetch<EntryModel>('https://api.publicapis.org/entries?Category='+filter)
            .then(response => {
                this.Entries = response.entries
            })
    */
    }

    refreshview(){
        // Mise a jour des catégories
        this.catList.innerHTML = "";
        const option = document.createElement("option")
        option.value = ""
        option.innerText = "Selectionnez une catégorie...";

        this.catList.appendChild(option);
        for(let i = 0; i < this.Categories.length; i++){
            const option = document.createElement("option")
            option.value = this.Categories[i].name;
            option.innerText = this.Categories[i].name;

            this.catList.appendChild(option);
        }

        // Mise a jour des API
        // On remet la liste des API à zéro
        this.apiElt.innerHTML = "";
        // Puis on rajoute les nouveaux elements
        for(let i = 0; i < this.Entries.length; i++){
            const tr = document.createElement("tr");

            let tds = []
            tds.push(document.createElement("td"));
            tds[0].innerText = this.Entries[i].API;

            tds.push(document.createElement("td"));
            tds[1].innerText = this.Entries[i].Description;

            tds.push(document.createElement("td"));
            tds[2].innerText = this.Entries[i].Auth;

            tds.push(document.createElement("td"));
            if(this.Entries[i].HTTPS == true)
                tds[3].innerHTML = '<i class="bi bi-check"></i>';
            else
                tds[3].innerHTML = '<i class="bi bi-x"></i>';
            
            tds.push(document.createElement("td"));
            if(this.Entries[i].Cors == "yes")
                tds[4].innerHTML = '<i class="bi bi-check"></i>';
            else
                tds[4].innerHTML = '<i class="bi bi-x"></i>';
            
            tds.push(document.createElement("td"));
            let link = document.createElement("a");
            link.href = this.Entries[i].Link;
            link.innerText = this.Entries[i].Link;
            tds[5].appendChild(link);

            tds.push(document.createElement("td"));
            tds[6].innerText = this.Entries[i].category;
            
            for(let j = 0; j < tds.length; j++)
                tr.appendChild(tds[j]);
            
            this.apiElt.appendChild(tr);
        }
    }
}

window.onload = () =>{
    let component = new Component();
}
