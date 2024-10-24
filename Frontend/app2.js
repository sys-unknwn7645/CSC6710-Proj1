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

// Search users by Registration Date
function searchByRgstDate() {
  const userid = document.getElementById('searchId').value;

  const searchType = "byRgstDate";
  const searchVal = searchType + "/" + userid + "/" + userid; // Had to do the double input in order to keep a single search.

  console.log(`${apiUrl}/search2/${searchVal}`)

  fetch(`${apiUrl}/search2/${searchVal}`)
  .then(response => response.json())
  // .then(data => console.log(data['data']))
  .then(data => loadHTMLTable(data['data']))
  .catch(error => console.error('Error:', error));

}

// Search users by Same Date REgistration
function searchBySameDate() {
  const userid = document.getElementById('searchId').value;

  const searchType = "bySameDate";
  const searchVal = searchType + "/" + userid + "/" + userid; // Had to do the double input in order to keep a single search.

  console.log(`${apiUrl}/search2/${searchVal}`)

  fetch(`${apiUrl}/search2/${searchVal}`)
  .then(response => response.json())
  // .then(data => console.log(data['data']))
  .then(data => loadHTMLTable(data['data']))
  .catch(error => console.error('Error:', error));

}


// Search users that have never signed on
function searchNeverSignedIn() {
  const searchType = "byNever";

  console.log(`${apiUrl}/search/${searchType}`)

  fetch(`${apiUrl}/search/${searchType}`)
  .then(response => response.json())
  // .then(data => console.log(data['data']))
  .then(data => loadHTMLTable(data['data']))
  .catch(error => console.error('Error:', error));
}

// Search users Registered today
function searchRgstToday() {
  const searchType = "byRgstToday";

  console.log(`${apiUrl}/search/${searchType}`)

  fetch(`${apiUrl}/search/${searchType}`)
  .then(response => response.json())
  // .then(data => console.log(data['data']))
  .then(data => loadHTMLTable(data['data']))
  .catch(error => console.error('Error:', error));
}

// Load data 
function loadHTMLTable(data){
  debug("index.js: loadHTMLTable called.");

  const table = document.querySelector('table tbody'); 
  
  if(data.length === 0){
      table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
      return;
  }

  let tableHtml = "";
  data.forEach(function ({userid, firstname, lastname, salary,age, signintime}){
       tableHtml += "<tr>";
       tableHtml +=`<td>${userid}</td>`;
       tableHtml +=`<td>${firstname}</td>`;
       tableHtml +=`<td>${lastname}</td>`;
       tableHtml +=`<td>${salary}</td>`;
       tableHtml +=`<td>${age}</td>`;
       tableHtml +=`<td>${signintime}</td>`;
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