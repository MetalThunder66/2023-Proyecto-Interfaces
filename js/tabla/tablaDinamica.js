"use strict";

let json = [];//arreglo de obj json

//mostramos nro actual de la tabla
let pageNum = 1;

let pageNumDom = document.querySelector("#page-number")

pageNumDom.innerHTML = pageNum;

//mostramos al principio para q no quede en blanco
show();

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
                  <td><a href="editMember.html?id=${item.id}"><img class="btn-primary modificar-socio" src="/images/edit.png"
                  alt="edit-member" /></a> 
                  <a class="delete-btn" id="${item.id}"><img class="btn-danger modificar-socio" src="/images/delete.png"
                  alt="delete-member" /></a></td>
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
}

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