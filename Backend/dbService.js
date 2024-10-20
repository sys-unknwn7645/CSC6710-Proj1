// database services, accessible by DbService methods.

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); // read from .env file

let instance = null;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.error('Connection error:', err.message);  // Log detailed error
    } else {
        console.log('DB connection status:', connection.state);  // Successful connection
    }
});

// The following are database functions
class DbService {
    static getDbServiceInstance() { // only one instance is sufficient
        return instance ? instance : new DbService();
    }

    // Get all data
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Insert new user
    async insertNewName(firstname, lastname, age, salary) {
        try {
            const registerday = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (firstname, lastname, age, salary, registerday) VALUES (?, ?, ?, ?, ?);";
                connection.query(query, [firstname, lastname, age, salary, registerday], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.insertId);
                });
            });
            return {
                id: insertId,
                firstname: firstname,
                lastname: lastname,
                age: age,
                salary: salary,
                registerday: registerday
            };
        } catch (error) {
            console.log(error);
        }
    }

    // Insert new user with registration details
    async insertNewNameRgst(firstname, lastname, pass, age, salary) {
        try {
            const registerday = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (firstname, lastname, pass, age, salary, registerday) VALUES (?, ?, ?, ?, ?, ?);";
                connection.query(query, [firstname, lastname, pass, age, salary, registerday], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.insertId);
                });
            });
            return {
                id: insertId,
                firstname: firstname,
                lastname: lastname,
                pass: pass,
                age: age,
                salary: salary,
                registerday: registerday
            };
        } catch (error) {
            console.log(error);
        }
    }

    // Register user
    async registerUser(firstname, lastname, salary, age) {
        try {
            const registerday = new Date();
            const signtime = null;
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (firstname, lastname, salary, age, registerday, signtime) VALUES (?, ?, ?, ?, ?, ?)";
                connection.query(query, [firstname, lastname, salary, age, registerday, signtime], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.insertId);
                });
            });
            return {
                id: insertId,
                firstname,
                lastname,
                salary,
                age,
                registerday,
                signtime
            };
        } catch (error) {
            console.log(error);
        }
    }

    // Search users by first and/or last name
    async searchUsersByName(firstname, lastname) {
        try {
            const response = await new Promise((resolve, reject) => {
                let query = "SELECT * FROM users WHERE 1=1";
                const params = [];
                if (firstname) {
                    query += " AND firstname = ?";
                    params.push(firstname);
                }
                if (lastname) {
                    query += " AND lastname = ?";
                    params.push(lastname);
                }
                connection.query(query, params, (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Search user by ID
    async searchUserById(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE userid = ?";
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Search users by salary range
    async searchUsersBySalaryRange(minSalary, maxSalary) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE salary BETWEEN ? AND ?";
                connection.query(query, [minSalary, maxSalary], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Search users by age range
    async searchUsersByAgeRange(minAge, maxAge) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE age BETWEEN ? AND ?";
                connection.query(query, [minAge, maxAge], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Search users who registered after a specific user
    async searchUsersRegisteredAfter(userid) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM users WHERE registerday > 
                              (SELECT registerday FROM users WHERE userid = ?)`;
                connection.query(query, [userid], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Search users who never signed in
    async searchUsersNeverSignedIn() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE signtime IS NULL";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Search users who registered on the same day as another user
    async searchUsersSameRegistrationDay(userid) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM users WHERE DATE(registerday) = 
                              (SELECT DATE(registerday) FROM users WHERE userid = ?)`;
                connection.query(query, [userid], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Delete user by ID
    async deleteRowById(id) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM users WHERE userid = ?";
                connection.query(query, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
        }
    }

    // Update user by ID
    async updateNameById(id, newName) {
        try {
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE users SET firstname = ? WHERE userid = ?";
                connection.query(query, [newName, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;
