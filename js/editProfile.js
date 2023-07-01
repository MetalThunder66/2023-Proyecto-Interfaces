"use strict";

let editButtons = document.querySelectorAll('edit-button');
let editPopup = document.querySelector('.edit-popup-container');
let formEditPopup = document.querySelector('#form-edit-popup');
let acceptButton = document.querySelector('#edit-popup-btn-accept');
let declineButton = document.querySelector('#edit-popup-btn-decline');

for (const BUTTON of editButtons) {
    BUTTON.addEventListener("click", function(e) {
        editPopup.classList.remove("hidden");
    });
}

// formEditPopup.addEventListener("submit", function(e) {
//     e.preventDefault();
//     let formData = new FormData(formEditPopup);
//     let field = formData.get("edit-field");

//     //hacer algo con el valor del field

//     editPopup.classList.add("hidden");
// });