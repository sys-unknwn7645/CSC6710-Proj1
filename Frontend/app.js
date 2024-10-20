
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
            console.log("login success");
        } else {
            console.log("Wrong Password");
            window.location.href='login.html';
        }
    })
}

// when the register is clicked
const signUp = document.querySelector('#sign-up-btn');
signUp.onclick = function (){
    const fnameInput = document.querySelector('.fname.ele');
    const lnameInput = document.querySelector('.lname.ele');
    const salaryInput = document.querySelector('.salary.ele');
    const ageInput = document.querySelector('.age.ele');
    const nameInput = document.querySelector('.signup-box .userid.ele');
    const passInput = document.querySelector('.signup-box .password.ele');

    const fname = fnameInput.value
    const lname = lnameInput.value
    const salary = salaryInput.value
    const age = ageInput.value
    const name = nameInput.value;
    const password = passInput.value;

    nameInput.value = "";
    passInput.value = "";

    console.log(fname)
    console.log(lname)
    console.log(age)
    console.log(salary)
    console.log(name)
    console.log(password)

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            fname:fname,
            lname: lname,
            age: age,
            salary:salary,
            name: name,
            pass: password
        })
    })
    .then(response => response.json())
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


