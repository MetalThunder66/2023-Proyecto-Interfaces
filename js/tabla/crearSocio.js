"use strict";

// Get references to the buttons
const interactButton = document.querySelector('#interact-button');
const rotaractButton = document.querySelector('#rotaract-button');
const rotaryButton = document.querySelector('#rotary-button');

// Add event listeners to the buttons
interactButton.addEventListener('click', handleButtonClick);
rotaractButton.addEventListener('click', handleButtonClick);
rotaryButton.addEventListener('click', handleButtonClick);

// Event handler for button click
function handleButtonClick(event) {
    // Remove the 'selected' class from all buttons
    interactButton.classList.remove('selected');
    rotaractButton.classList.remove('selected');
    rotaryButton.classList.remove('selected');

    // Add the 'selected' class to the clicked button
    event.target.classList.add('selected');
}

//agarramos la tabladinamica
let tablaDinamicaDom = document.querySelector("#tablaDinamica");

let creationSuccess = document.querySelector('#creation-success');
let createMember = document.querySelector("#create-member");

createMember.addEventListener('click', function (e) {
    e.preventDefault();
    add();
})

//con esta funcion agregamos un nuevo objeto a la API
async function add() {

    let formData = new FormData(tablaDinamicaDom);
    let dniInput = formData.get("dni"); //hacemos FormData para agarrar el valor de éste input
    let emailInput = formData.get("email"); //hacemos FormData para agarrar el valor de éste input
    let nombreApellidoInput = formData.get("nombre_apellido");
    let domicilioInput = formData.get("domicilio");
    let fechaNacimientoInput = formData.get("fecha_nacimiento");
    let clubInput = '';

    // Check which button has the 'selected' class
    if (interactButton.classList.contains('selected')) {
        clubInput = 'interact';
    } else if (rotaractButton.classList.contains('selected')) {
        clubInput = 'rotaract';
    } else if (rotaryButton.classList.contains('selected')) {
        clubInput = 'rotary';
    }


    //creamos un nuevo obj para insertarlo
    let obj = {
        nombre_apellido: nombreApellidoInput,
        domicilio: domicilioInput,
        fecha_nacimiento: fechaNacimientoInput,
        club: clubInput, 
        dni: dniInput,
        email: emailInput,
    }

    try {//fetcheamos la API y le insertamos el obj creado stringifeado
        let response = await fetch(`https://64a08f0eed3c41bdd7a75c41.mockapi.io/socio`, {
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify(obj)
        });
    }
    catch (error) {
        console.log(error);
    };

    creationSuccess.classList.remove("hidden");
}