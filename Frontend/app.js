// const express = require('express');


// const app = express();


// // app.post("/login", async function(req,res){
// //     const username = req.body.username;


// // ; 
// // });

// when the login is clicked
const logIn = document.querySelector('#log-in-btn');
logIn.onclick = function (){
    const nameInput = document.querySelector('.userid.ele');
    const passInput = document.querySelector('.password.ele');
    const name = nameInput.value;
    const password = passInput.value;
    nameInput.value = "";
    passInput.value = "";

    console.log(name)
    console.log(password)

    fetch('http://localhost:5000/search/' + name)
    .then(response => response.json())
    // .then(data => console.log(data))
    // .then(data => (data['data']['0'].name === name)? (window.location.href='index.html'):(console.log("fail")))
    .then( data =>{
        if(!data['data']['0']) {
            console.log("User Does Not Exist");
            window.location.href='login.html';
        } else if (data['data']['0'].name === name) {
            window.location.href='index.html';
        } else {
            console.log("Wrong Password");
            window.location.href='login.html';
        }
    })
    // .then()

    
    // fetch('http://localhost:5000/insert', {
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     method: 'POST',
    //     body: JSON.stringify({name: name})
    // })
    // .then(response => response.json())
    // .then(data => insertRowIntoTable(data['data']));
}

// Slider to switch between login and signup/registration page.
let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});


