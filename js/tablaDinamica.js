"use strict";

json = [];//arreglo de obj json

//agarramos la tabladinamica
let tablaDinamicaDom = document.querySelector("#tablaDinamica");
let createMember = document.querySelector("#create-member");

createMember.addEventListener('click', function (e) {
    e.preventDefault();
    add();
})

//mostramos nro actual de la tabla 
let pageNum = 1;

let pageNumDom = document.querySelector("#page-number")

pageNumDom.innerHTML = pageNum;

//mostramos al principio para q no quede en blanco
show();

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
        let response = await fetch(`https://6227692cd1b3ff08c1af0eaf.mockapi.io/api/producto?page=${pageNum}&limit=4`, {
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


async function show() {
    let tbody = document.querySelector("#products-list"); //agarramos el tbody de la tabla
    tbody.innerHTML = ""; //vaciamos para que no se repitan los contenidos de la api cuando hacemos algun cambio

    try {
        let response = await fetch(`https://64a08f0eed3c41bdd7a75c41.mockapi.io/socio?page=${pageNum}&limit=4`);

        if (response.ok) {//si el fetch dio correcto

            let json = await response.json(); //agarramos el arreglo de obj json de la api

            for (const item of json) {//entramos a cada valor de las propiedades y lo mostramos en el html. eso x cada obj que haya.
                tbody.innerHTML += `
            <tr>
                  <td>${item.dni}</td>
                  <td>${item.email}</td>
                  <td><button class="edit-btn" id="${item.id}">Editar</button></td> 
                  <td><button class="delete-btn" id="${item.id}">Eliminar</button></td>
            </tr>
            `; //de paso tmb creamos un boton para eliminar y un boton para editar los con clases para ponerles eventos y id para identificar cuál botón apretamos.
            }
        } else {
            console.log("paso algo con la url");
        }
    }
    catch (error) {
        console.log(error);
    }

    //botones eliminar

    let deleteButtons = document.querySelectorAll(".delete-btn");
    //x cada btn q elegimos le agregamos un evento
    deleteButtons.forEach(boton => {
        boton.addEventListener('click', async function (e) {

            e.preventDefault();

            try {//buscamos ese obj en el que hayamos hecho click y lo eliminamos
                let res = await fetch(`${`https://64a08f0eed3c41bdd7a75c41.mockapi.io/socio`}/${boton.id}?page=${pageNum}&limit=4`, {
                    "method": "DELETE"
                });
            }
            catch (error) {
                console.log(error);
            }

            show();

        })
    });

    //botones paginacion

    //al apretar alguno de estos dos botones lo unico que hacemos es cambiar el valor de la variable y al mostrar cuando fetchee el link de la API lo va a hacer con el nro cambiado
    let goBackBtn = document.querySelector("#go-back-btn");
    let nextBtn = document.querySelector("#next-btn");

    nextBtn.addEventListener("click", function (e) {
        e.preventDefault();

        pageNum = pageNum + 1;

        pageNumDom.innerHTML = pageNum;//esto para que el usuario sepa en qué pág está

        show();
    });


    goBackBtn.addEventListener("click", function (e) {
        e.preventDefault();

        pageNum = pageNum - 1;

        pageNumDom.innerHTML = pageNum;//esto para que el usuario sepa en qué pág está

        show();
    });
}