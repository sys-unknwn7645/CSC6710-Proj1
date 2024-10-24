const apiUrl = 'http://localhost:5000';  // Adjust the backend URL as needed

// Search users by name
function searchByName() {
    const firstnameInput = document.getElementById('searchFname').value;
    const lastnameInput = document.getElementById('searchLname').value;

    let firstname, lastname
    if (!firstnameInput) {
        firstname = "empty";
      } else {firstname = firstnameInput}
    
      if (!lastnameInput) {
        lastname = "empty";
      } else {lastname = lastnameInput}
     
    const searchType = "byName";
    const searchVal = searchType + "/" + firstname + "/" + lastname;

    console.log(`${apiUrl}/search2/${searchVal}`)

    fetch(`${apiUrl}/search2/${searchVal}`)
    .then(response => response.json())
    // .then(data => console.log(data['data']))
    .then(data => loadHTMLTable(data['data']))
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
    // .then(data => console.log(data['data']))
    .then(data => loadHTMLTable(data['data']))
    .catch(error => console.error('Error:', error));
}

// Search users by salary range
function searchBySalary() {
    const minSalaryInput = document.getElementById('minSalary').value;
    const maxSalaryInput = document.getElementById('maxSalary').value;

    let minSalary, maxSalary
    if (!minSalaryInput) {
        minSalary = "empty";
      } else {minSalary = minSalaryInput}
    
      if (!maxSalaryInput) {
        maxSalary = "empty";
      } else {maxSalary = maxSalaryInput}

    const searchType = "bySalary";
    const searchVal = searchType + "/" + minSalary + "/" + maxSalary;

    console.log(`${apiUrl}/search2/${searchVal}`)

    fetch(`${apiUrl}/search2/${searchVal}`)
    .then(response => response.json())
    // .then(data => console.log(data['data']))
    .then(data => loadHTMLTable(data['data']))
    .catch(error => console.error('Error:', error));
}

// Search users by age range
function searchByAge() {
    const minAgeInput = document.getElementById('minAge').value;
    const maxAgeInput = document.getElementById('maxAge').value;

    let minAge, maxAge
    if (!minAgeInput) {
        minAge = "empty";
      } else {minAge = minAgeInput}
    
      if (!maxAgeInput) {
        maxAge = "empty";
      } else {maxAge = maxAgeInput}

    const searchType = "byAge";
    const searchVal = searchType + "/" + minAge + "/" + maxAge;

    console.log(`${apiUrl}/search2/${searchVal}`)

    fetch(`${apiUrl}/search2/${searchVal}`)
    .then(response => response.json())
    // .then(data => console.log(data['data']))
    .then(data => loadHTMLTable(data['data']))
    .catch(error => console.error('Error:', error));
}

///////////////////////////
// Function to search users who registered after a certain user
function searchAfterUser() {
  const userId = document.getElementById('searchAfterUserId').value;

  fetch(`/api/users/searchAfter/${userId}`)
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => console.error('Error:', error));
}

// Function to search users who never signed in
function searchNeverSignedIn() {
  fetch('/api/users/neverSignedIn')
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => console.error('Error:', error));
}

// Function to search users who registered on the same day as a certain user
function searchSameDayUser() {
  const userId = document.getElementById('searchSameDayUserId').value;

  fetch(`/api/users/sameDayAs/${userId}`)
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => console.error('Error:', error));
}

// Function to return users who registered today
function searchRegisteredToday() {
  fetch('/api/users/registeredToday')
      .then(response => response.json())
      .then(data => displayResults(data))
      .catch(error => console.error('Error:', error));
}

// Function to display search results in the table
function displayResults(data) {
  const tableBody = document.querySelector('#table tbody');
  tableBody.innerHTML = ''; // Clear any previous results

  data.forEach(user => {
      const row = document.createElement('tr');
      const useridCell = document.createElement('td');
      const nameCell = document.createElement('td');

      useridCell.textContent = user.userid;
      nameCell.textContent = `${user.firstname} ${user.lastname}`;

      row.appendChild(useridCell);
      row.appendChild(nameCell);
      tableBody.appendChild(row);
  });
}

////////////////


function loadHTMLTable(data){
  debug("index.js: loadHTMLTable called.");

  const table = document.querySelector('table tbody'); 
  
  if(data.length === 0){
      table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
      return;
  }

  let tableHtml = "";
  data.forEach(function ({userid, firstname}){
       tableHtml += "<tr>";
       tableHtml +=`<td>${userid}</td>`;
       tableHtml +=`<td>${firstname}</td>`;
       tableHtml += "</tr>";
  });

  table.innerHTML = tableHtml;
}

// this function is used for debugging only, and should be deleted afterwards
function debug(data)
{
    fetch('http://localhost:5000/debug', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({debug: data})
    })
}
