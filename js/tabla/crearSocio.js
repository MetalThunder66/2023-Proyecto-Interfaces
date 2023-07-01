"use strict";

//agarramos la tabladinamica
let tablaDinamicaDom = document.querySelector("#tablaDinamica");

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

    //creamos un nuevo obj para insertarlo
    let obj = {
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
}

