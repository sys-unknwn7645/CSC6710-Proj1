// Backend: application services, accessible by URIs

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test
app.get('/', (req, res) => {
    return res.json("Welcome to the DB class.");
});

// Create user
app.post('/insert', (req, res) => {
    console.log("app: insert a row.");
    const { name } = req.body;

    const db = dbService.getDbServiceInstance();
    const result = db.insertNewName(name);

    result
        .then(data => res.json({ data }))
        .catch(err => console.log(err));
});

// Registration
app.post('/insertRgst', (req, res) => {
    const { name, pass, age, salary, lname, fname } = req.body;

    const db = dbService.getDbServiceInstance();
    const result = db.insertNewNameRgst(name, pass, age, salary, lname, fname);

    result
        .then(data => res.json({ data }))
        .catch(err => console.log(err));
});

// User registration route
app.post('/register', (req, res) => {
    const { firstname, lastname, salary, age } = req.body;
    const registerday = new Date();
    const signtime = null;

    const db = dbService.getDbServiceInstance();
    const result = db.registerUser(firstname, lastname, salary, age, registerday, signtime);

    result
        .then(data => res.json({ success: true, data }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Search users by first and/or last name
app.get('/search/user', (req, res) => {
    const { firstname, lastname } = req.query;

    const db = dbService.getDbServiceInstance();
    const result = db.searchUsersByName(firstname, lastname);

    result
        .then(data => res.json({ success: true, data }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Search users by userid
app.get('/search/userid/:id', (req, res) => {
    const { id } = req.params;

    const db = dbService.getDbServiceInstance();
    const result = db.searchUserById(id);

    result
        .then(data => res.json({ success: true, data }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Search users by salary range
app.get('/search/salary', (req, res) => {
    const { minSalary, maxSalary } = req.query;

    const db = dbService.getDbServiceInstance();
    const result = db.searchUsersBySalaryRange(minSalary, maxSalary);

    result
        .then(data => res.json({ success: true, data }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Search users by age range
app.get('/search/age', (req, res) => {
    const { minAge, maxAge } = req.query;

    const db = dbService.getDbServiceInstance();
    const result = db.searchUsersByAgeRange(minAge, maxAge);

    result
        .then(data => res.json({ success: true, data }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Search users who registered after John (or any other user)
app.get('/search/registered-after/:userid', (req, res) => {
    const { userid } = req.params;

    const db = dbService.getDbServiceInstance();
    const result = db.searchUsersRegisteredAfter(userid);

    result
        .then(data => res.json({ success: true, data }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Search users who never signed in
app.get('/search/no-signin', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.searchUsersNeverSignedIn();

    result
        .then(data => res.json({ success: true, data }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Get all data
app.get('/getAll', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();

    result
        .then(data => res.json({ data }))
        .catch(err => console.log(err));
});

// Search by name
app.get('/search/:name', (req, res) => {
    const { name } = req.params;

    const db = dbService.getDbServiceInstance();
    let result;

    if (name === "all") {
        result = db.getAllData();
    } else {
        result = db.searchByName(name);
    }

    result
        .then(data => res.json({ data }))
        .catch(err => console.log(err));
});

// Update
app.patch('/update', (req, res) => {
    const { id, name } = req.body;

    const db = dbService.getDbServiceInstance();
    const result = db.updateNameById(id, name);

    result
        .then(() => res.json({ success: true }))
        .catch(err => console.log(err));
});

// Delete
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    const db = dbService.getDbServiceInstance();
    const result = db.deleteRowById(id);

    result
        .then(() => res.json({ success: true }))
        .catch(err => console.log(err));
});

// Test DB function
app.get('/testdb', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.deleteById("10");

    result
        .then(data => res.json({ data }))
        .catch(err => console.log(err));
});

// Start server listener
app.listen(process.env.PORT, () => {
    console.log("I am listening on port " + process.env.PORT);
});
