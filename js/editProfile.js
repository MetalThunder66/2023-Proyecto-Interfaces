"use strict";

let editButtons = document.querySelectorAll('.edit-button');
let editPopup = document.querySelector('.edit-popup-container');
let email = document.querySelector('#profile-email');
let address = document.querySelector('#profile-address');
let editError = document.querySelector('#edit-error');
let editSuccess = document.querySelector('#edit-success');
let acceptButton = document.querySelector('#edit-popup-btn-accept');
let declineButton = document.querySelector('#edit-popup-btn-decline');

for (const BUTTON of editButtons) {
    BUTTON.addEventListener("click", function(e) {
        e.preventDefault();
        editPopup.classList.remove("hidden");
        
        let atributo = BUTTON.getAttribute("data-id");
        let field = document.querySelector('#edit-field');

        acceptButton.addEventListener("click", function(e) {
            if (field.value !== '') {
                if (atributo == 'email') {
                    email.textContent = "Email: " + field.value;
                    field.value = '';   //lo limpia
                    editError.classList.add("hidden");
                    editPopup.classList.add("hidden");
                    editSuccess.classList.remove("hidden");
                } else if (atributo == 'address') {
                    address.textContent = "Domicilio: " + field.value;
                    field.value = '';   //lo limpia
                    editError.classList.add("hidden");
                    editPopup.classList.add("hidden");
                    editSuccess.classList.remove("hidden");
                }
            } else {
                editError.classList.remove("hidden");
            }
            
        });

        declineButton.addEventListener("click", function(e) {
            editError.classList.add("hidden");
            editPopup.classList.add("hidden");
        });
    });
}
