"use strict";
let formLogin = document.querySelector('.form-login');
let errorLogin = document.querySelector('#login-error');




//cuando "submit" 'validamos' para form login
formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(formLogin);
    let email = formData.get("email");
    let password = formData.get("password");

    if (email == 'user@gmail.com' && password == 'user') {
        window.location.href = "../index.html";
    } else if (email == 'admin@gmail.com' && password == 'admin') {
        window.location.href = "../index.html";
    } else {
        errorLogin.classList.remove("hidden");
    }
    
})