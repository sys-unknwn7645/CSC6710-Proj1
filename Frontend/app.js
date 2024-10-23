
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

    const msg = document.getElementById("logmsg");

    fetch('http://localhost:5000/search/' + name)
    .then(response => response.json())
    // .then(data => console.log(data))
    // .then(data => (data['data']['0'].name === name)? (window.location.href='index.html'):(console.log("fail")))
    .then( data =>{
        if(!data['data']['0']) {
            console.log("User Does Not Exist");
            msg.innerText = "User Does Not Exist. Retry"

        } else if (data['data']['0'].upass === password) {
            window.location.href='search.html';
            console.log("login success");
            msg.innerText = "Login Success";

            fetch('http://localhost:5000/updateLogT',
                {
                  headers: {
                      'Content-type': 'application/json'
                  },
                  method: 'PATCH',
                  body: JSON.stringify(
                        {
                          name: name
                        }
                  )
                }
          ) 
          .then(response => response.json())
          .then(data => {
              if(data.success){
                  console.log("login time updated");
              }
              else 
                 debug("no update occurs");
          })

        } else {
            console.log("Wrong Password");
            msg.innerText = "Wrong Password. Retry"
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

    const msg = document.getElementById("regmsg");

    fetch('http://localhost:5000/insertRgst', {
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
    .then(() => {
        msg.innerText = "Registration Success";
        console.log("Registration Successful");
        window.location.href='search.html'
    })
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


