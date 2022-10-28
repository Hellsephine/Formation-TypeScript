let compteur = 0;
let element = document.getElementById("compteur");

document.getElementById("button")?.addEventListener("click", () =>{
    if (element !== null)
    element.textContent = (++compteur).toString();
});