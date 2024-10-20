const apiUrl = 'http://localhost:5000';  // Adjust the backend URL as needed

// Register a new user
function registerUser() {
    const firstname = document.getElementById('fname').value;
    const lastname = document.getElementById('lname').value;
    const age = document.getElementById('age').value;
    const salary = document.getElementById('salary').value;

    const data = { firstname, lastname, age, salary };

    fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("User registered successfully!");
        } else {
            alert("Failed to register user");
        }
    })
    .catch(error => console.error('Error:', error));
}

// Search users by name
function searchByName() {
    const firstname = document.getElementById('searchFname').value;
    const lastname = document.getElementById('searchLname').value;

    fetch(`${apiUrl}/search/user?firstname=${firstname}&lastname=${lastname}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Search user by ID
function searchById() {
    const id = document.getElementById('searchId').value;

    fetch(`${apiUrl}/search/userid/${id}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Search users by salary range
function searchBySalary() {
    const minSalary = document.getElementById('minSalary').value;
    const maxSalary = document.getElementById('maxSalary').value;

    fetch(`${apiUrl}/search/salary?minSalary=${minSalary}&maxSalary=${maxSalary}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

// Search users by age range
function searchByAge() {
    const minAge = document.getElementById('minAge').value;
    const maxAge = document.getElementById('maxAge').value;

    fetch(`${apiUrl}/search/age?minAge=${minAge}&maxAge=${maxAge}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
