const apiElt = document.getElementById("apiList");
const catList = document.getElementById("filter");

function load(filter){
    fetch('https://api.publicapis.org/entries?Category='+filter).then(function(response){
        response.json().then(function(data){
            let apiList = data;

            // On remet la liste des API à zéro
            apiElt.innerHTML = "";
            // Puis on rajoute les nouveaux elements
            for(let i = 0; i < apiList.entries.length; i++){
                const tr = document.createElement("tr");

                let tds = []
                tds.push(document.createElement("td"));
                tds[0].innerText = apiList.entries[i].API;

                tds.push(document.createElement("td"));
                tds[1].innerText = apiList.entries[i].Description;

                tds.push(document.createElement("td"));
                tds[2].innerText = apiList.entries[i].Auth;

                tds.push(document.createElement("td"));
                if(apiList.entries[i].HTTPS == true)
                    tds[3].innerHTML = '<i class="bi bi-check"></i>';
                else
                    tds[3].innerHTML = '<i class="bi bi-x"></i>';
                
                tds.push(document.createElement("td"));
                if(apiList.entries[i].Cors == "yes")
                    tds[4].innerHTML = '<i class="bi bi-check"></i>';
                else
                    tds[4].innerHTML = '<i class="bi bi-x"></i>';
                
                tds.push(document.createElement("td"));
                let link = document.createElement("a");
                link.href = apiList.entries[i].Link;
                link.innerText = apiList.entries[i].Link;
                tds[5].appendChild(link);

                tds.push(document.createElement("td"));
                tds[6].innerText = apiList.entries[i].Category;
                
                for(let j = 0; j < tds.length; j++)
                    tr.appendChild(tds[j]);
                
                apiElt.appendChild(tr);
            }
        });
    });
}

function loadCategories(){
    fetch('https://api.publicapis.org/categories').then(function(response){
        response.json().then(function(data){
            let apiList = data;

            for(let i = 0; i < apiList.categories.length; i++){
                const option = document.createElement("option")
                option.value = apiList.categories[i];
                option.innerText = apiList.categories[i];

                catList.appendChild(option);
            }
        });
    });
}

// Chargement des elements au début de la page
// Premier set d'APIs + catégories
load('');
loadCategories();

// Quand on selectionne l'élément dans notre select
catList.addEventListener('change', function(event){
    load(event.target.value);
});