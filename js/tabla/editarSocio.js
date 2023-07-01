"use strict";

//agarramos la tabladinamica
let tablaDinamicaDom = document.querySelector("#tablaDinamica");

let editMember = document.querySelector("#edit-member");

editMember.addEventListener('click', function (e) {
    e.preventDefault();
    add();
})

