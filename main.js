const pizzas = [
    {id:1,nombre:"Calabresa",ingredientes:["Salsa","Queso","Milan"],precio:700,img:"./imgs/calabresa.jpg"},
    {id:2,nombre:"Huevo",ingredientes:["Salsa","Queso","Huevo"],precio:905,img:"./imgs/especial.jpg"},
    {id:3,nombre:"Muzza",ingredientes:["Salsa","Queso","Muzzarella"],precio:900,img:"./imgs/muzzarella.jpg"},
    {id:4,nombre:"Vegetales",ingredientes:["Salsa","Queso","Rucula"],precio:555,img:"./imgs/rucula.webp"},
    {id:5,nombre:"Salchicas",ingredientes:["Salsa","Queso","Salchichas"],precio:610,img:"./imgs/salchichas.jpg"},
    {id:6,nombre:"Papas",ingredientes:["Salsa","Queso","Papas"],precio:595,img:"./imgs/papas.jpg"},
];

//traemos variables
const cardContainer = document.querySelector(".card");
const btn = document.querySelector(".btn-send");
let small = document.querySelector(".small");

//renderizar pizza

const renderPizza = (pizza, value, input = document.querySelector(".input-pizza")) =>{
    input.classList.remove("error");
    small.innerText = "";
    input.value = "";

    saveLS(value);

    const {id,nombre,ingredientes,precio,img} = pizza[0];

    return `
        <img src=${img}></img>
        <h3>Pizza de ${nombre.toUpperCase()}</h3>
        <p>${ingredientes[0]} - ${ingredientes[1]} - ${ingredientes[2]}</p>
        <p1>$${precio}</p1>
    `
}

//guardar en ls
const saveLS = (value) => {
    localStorage.setItem("pizza", JSON.stringify(value));
}

//mostrar error

const renderError = (input, msg) => {
    input.value = "";

    input.classList.add("error");

    small.innerText = msg
}


// evento del button
btn.addEventListener("click", (e) =>{
    e.preventDefault();

    let input = document.querySelector(".input-pizza");
    let inpValue = Number(input.value);

    let objPizza = pizzas.filter(pizza => pizza.id === inpValue);

    if(objPizza.length === 0 && inpValue !== 0){
        renderError(input,"ID no coincide con ninguna pizza");
    } else if(objPizza.length === 0 && inpValue === 0){
        renderError(input,"Debes colocar un ID");
    } else {
        cardContainer.innerHTML = renderPizza(objPizza,inpValue,input);
    }
})

//traer del LS
document.addEventListener("DOMContentLoaded", () =>{
    let ls = JSON.parse(localStorage.getItem("pizza")) || "1";
    let valueLS = Number(ls);

    let objPizza = pizzas.filter(pizza => pizza.id === valueLS);

    cardContainer.innerHTML = renderPizza(objPizza,valueLS);
})

