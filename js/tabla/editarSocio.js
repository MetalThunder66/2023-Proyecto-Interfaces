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


//id del socio a editar
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//agarramos la tabladinamica
let tablaDinamicaDom = document.querySelector("#tablaDinamica");
let editMember = document.querySelector("#edit-member");
let editSuccess = document.querySelector('#edit-success');

editMember.addEventListener('click', function (e) {
    e.preventDefault();
    edit();
})

putData();

//x cada btn q elegimos le agregamos un evento
async function edit() {

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


    try {//buscamos ese obj en el que hayamos hecho click y lo reemplazamos x el obj creado para reemplazarlo
        let res = await fetch(`https://64a08f0eed3c41bdd7a75c41.mockapi.io/socio/${id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(obj)
        });

        if (res.ok) {
            window.location.href = "/pages/admin/members.html";
        }
    }
    catch (error) {
        console.log(error);
    }

    editSuccess.classList.remove("hidden");
}

async function putData() {
    //agarramos todos los inputs para filearlos
    let nombreApellidoInput = document.querySelector('#nombre-usuario');
    let fechaNacimientoInput = document.querySelector('#fecha-nacimiento');
    let dniInput = document.querySelector('#dni');
    let domicilioInput = document.querySelector('#domicilio-usuario');
    let emailInput = document.querySelector('#exampleInputEmail1');

    try {
        let res = await fetch(`https://64a08f0eed3c41bdd7a75c41.mockapi.io/socio/${id}`);

        if (res.ok) {

            let data = await res.json(); //agarramos el arreglo de obj json de la api

            nombreApellidoInput.value = data.nombre_apellido;

            let fechaNacimiento = new Date(data.fecha_nacimiento);
            let formattedFechaNacimiento = fechaNacimiento.toISOString().split('T')[0];
            // Assign the formatted date value to the input field
            fechaNacimientoInput.value = formattedFechaNacimiento;

            dniInput.value = data.dni;
            domicilioInput.value = data.domicilio;
            emailInput.value = data.email;
            if (data.club === 'rotary') {
                // Remove the 'selected' class from all buttons
                interactButton.classList.remove('selected');
                rotaractButton.classList.remove('selected');
                rotaryButton.classList.add('selected');
            } else if (data.club === 'rotaract') {
                // Remove the 'selected' class from all buttons
                interactButton.classList.remove('selected');
                rotaractButton.classList.add('selected');
                rotaryButton.classList.remove('selected');

            } else if (data.club === 'interact') {
                // Remove the 'selected' class from all buttons
                interactButton.classList.add('selected');
                rotaractButton.classList.remove('selected');
                rotaryButton.classList.remove('selected');

            }

        }
    }
    catch (error) {
        console.log(error);
    }
}
