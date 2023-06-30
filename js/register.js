"use strict";
let formRegister = document.querySelector('.form-register');
let successRegister = document.querySelector('#register-success');
let btn_register = document.querySelector('#btn-register');
let btn_home = document.querySelector('#btn-back-home');



//cuando "submit" 'validamos' para form register
formRegister.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(formRegister);
    //hacer lets de todos los inputs
    let name = formData.get("name");
    let date = formData.get("date");
    let dni = formData.get("dni");
    let address = formData.get("address");
    let email = formData.get("email");

    //si todos los campos estan completos, manda registro
    if (!(name.trim() === '' && date.trim() === '' && dni.trim() === '' && address.trim() === '' && email.trim() === '')) {
        successRegister.classList.remove("hidden")
        btn_register.classList.add("hidden");
        btn_home.classList.remove("hidden");
    }
})
