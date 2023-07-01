"use strict";

//id del socio a editar
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//agarramos la tabladinamica
let tablaDinamicaDom = document.querySelector("#tablaDinamica");
let editMember = document.querySelector("#edit-member");

editMember.addEventListener('click', function (e) {
    e.preventDefault();
    edit();
})

//x cada btn q elegimos le agregamos un evento
async function edit() {

    let formData = new FormData(tablaDinamicaDom);
    let dniInput = formData.get("dni"); //hacemos FormData para agarrar el valor de éste input
    let emailInput = formData.get("email"); //hacemos FormData para agarrar el valor de éste input

    //creamos un nuevo obj para insertarlo
    let obj = {
        dni: dniInput,
        email: emailInput,
    }//este obj va a reemplazar a aquel q elijamos en la API


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
}
