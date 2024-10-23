const apiUrl = 'http://localhost:5000';  // Adjust the backend URL as needed

// Search users by name
function searchByName() {
    const firstname = document.getElementById('searchFname').value;
    const lastname = document.getElementById('searchLname').value;

    const searchType = "byName";
    const searchVal = searchType + "/" + firstname + "/" + lastname;

    console.log(`${apiUrl}/search2/${searchVal}`)

    fetch(`${apiUrl}/search2/${searchVal}`)
    .then(response => response.json())
    .then(data => console.log(data['data']))
    .catch(error => console.error('Error:', error));
}

// Search user by ID
function searchById() {
    const userid = document.getElementById('searchId').value;

    const searchType = "byUserid";
    const searchVal = searchType + "/" + userid + "/" + userid; // Had to do the double input in order to keep a single search.

    console.log(`${apiUrl}/search2/${searchVal}`)

    fetch(`${apiUrl}/search2/${searchVal}`)
    .then(response => response.json())
    .then(data => console.log(data['data']))
    .catch(error => console.error('Error:', error));
}

// Search users by salary range
function searchBySalary() {
    const minSalary = document.getElementById('minSalary').value;
    const maxSalary = document.getElementById('maxSalary').value;

    const searchType = "bySalary";
    const searchVal = searchType + "/" + minSalary + "/" + maxSalary;

    console.log(`${apiUrl}/search2/${searchVal}`)

    fetch(`${apiUrl}/search2/${searchVal}`)
    .then(response => response.json())
    .then(data => console.log(data['data']))
    .catch(error => console.error('Error:', error));
}

// Search users by age range
function searchByAge() {
    const minAge = document.getElementById('minAge').value;
    const maxAge = document.getElementById('maxAge').value;

    const searchType = "byAge";
    const searchVal = searchType + "/" + minAge + "/" + maxAge;

    console.log(`${apiUrl}/search2/${searchVal}`)

    fetch(`${apiUrl}/search2/${searchVal}`)
    .then(response => response.json())
    .then(data => console.log(data['data']))
    .catch(error => console.error('Error:', error));
}
