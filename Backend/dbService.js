// database services, accessbile by DbService methods.

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); // read from .env file

let instance = null; 

/* for debugging
console.log(process.env.HOST);
console.log(process.env.USER);
console.log(process.env.PASSWORD);
*/

const connection = mysql.createConnection({
     host: process.env.HOST,
     user: process.env.USER,        
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
     port: process.env.DB_PORT
});


connection.connect((err) => {
     if(err){
        console.log(err.message);
     }
     console.log('db ' + connection.state);    // to see if the DB is connected or not
});

// the following are database functions, 

class DbService{
    static getDbServiceInstance(){ // only one instance is sufficient
        return instance? instance: new DbService();
    }

   /*
     This code defines an asynchronous function getAllData using the async/await syntax. 
     The purpose of this function is to retrieve all data from a database table named 
     "names" using a SQL query.

     Let's break down the code step by step:
         - async getAllData() {: This line declares an asynchronous function named getAllData.

         - try {: The try block is used to wrap the code that might throw an exception 
            If any errors occur within the try block, they can be caught and handled in 
            the catch block.

         - const response = await new Promise((resolve, reject) => { ... });: 
            This line uses the await keyword to pause the execution of the function 
            until the Promise is resolved. Inside the await, there is a new Promise 
            being created that represents the asynchronous operation of querying the 
            database. resolve is called when the database query is successful, 
            and it passes the query results. reject is called if there is an error 
            during the query, and it passes an Error object with an error message.

         - The connection.query method is used to execute the SQL query on the database.

         - return response;: If the database query is successful, the function returns 
           the response, which contains the results of the query.

        - catch (error) {: The catch block is executed if an error occurs anywhere in 
           the try block. It logs the error to the console.

        - console.log(error);: This line logs the error to the console.   
    }: Closes the catch block.

    In summary, this function performs an asynchronous database query using await and a 
   Promise to fetch all data from the "names" table. If the query is successful, 
   it returns the results; otherwise, it catches and logs any errors that occur 
   during the process. It's important to note that the await keyword is used here 
   to work with the asynchronous nature of the connection.query method, allowing 
   the function to pause until the query is completed.
   */
    async getAllData(){
        try{
           // use await to call an asynchronous function
           const response = await new Promise((resolve, reject) => 
              {
                  const query = "SELECT * FROM names;";
                  connection.query(query, 
                       (err, results) => {
                             if(err) reject(new Error(err.message));
                             else resolve(results);
                       }
                  );
               }
            );
        
            // console.log("dbServices.js: search result:");
            // console.log(response);  // for debugging to see the result of select
            return response;

        }  catch(error){
           console.log(error);
        }
   }


   async insertNewName(name){
         try{
            const dateAdded = new Date();
            // use await to call an asynchronous function
            const insertId = await new Promise((resolve, reject) => 
            {
               const query = "INSERT INTO names (name, date_added) VALUES (?, ?);";
               connection.query(query, [name, dateAdded], (err, result) => {
                   if(err) reject(new Error(err.message));
                   else resolve(result.insertId);
               });
            });
            console.log(insertId);  // for debugging to see the result of select
            return{
                 id: insertId,
                 name: name,
                 dateAdded: dateAdded
            }
         } catch(error){
               console.log(error);
         }
   }

// Added
   async insertNewNameRgst(name, pass, age, salary, lname, fname){
      try{
         const dateAdded = new Date();
         // use await to call an asynchronous function
         const insertId = await new Promise((resolve, reject) => 
         {
            const query = "INSERT INTO Users (userid, upass, firstname, lastname, salary, age, registerday) VALUES (?, ?, ?, ?, ?, ?, ?);";
            connection.query(query, [name, pass, fname, lname, parseFloat(salary), Number(age), dateAdded], (err, result) => {
                if(err) reject(new Error(err.message));
                else resolve(result.insertId);
            });
         });
         console.log(insertId);  // for debugging to see the result of select
         return{
              name: name,
              pass: pass,
              salary: salary,
              age: age,
              fname: fname,
              lname: lname,
              dateAdded: dateAdded
         }
      } catch(error){
            console.log(error);
      }
}



   async searchByName(name){
        try{

            let sqlQuery
            const values = []

             const dateAdded = new Date();
             
             const getLocalDate = () => {
               const year = dateAdded.getFullYear();
               const month = ('0' + (dateAdded.getMonth() + 1)).slice(-2);  // Ensure two digits for month
               const day = ('0' + dateAdded.getDate()).slice(-2);           // Ensure two digits for day
               return `${year}-${month}-${day}`;  // Format as 'YYYY-MM-DD'
             };
             const dateToday = dateAdded.toISOString().split('T')[0]
             const localDate = getLocalDate();

             // use await to call an asynchronous function

             if (name === "byNever") {
               sqlQuery = "SELECT * FROM Users Where signintime IS NOT NULL;"
            } else if (name === "byRgstToday"){
               sqlQuery = `SELECT * FROM Users Where registerday = ?;`
               values.push(localDate)
            } else {
               sqlQuery = 'SELECT * FROM Users where userid = ?;'
               values.push(name)
            }

             const response = await new Promise((resolve, reject) => 
                  {
                     const query = "SELECT * FROM Users where userid = ?;";
                     // const query = "SELECT * FROM names where name = ?;";
                     connection.query(sqlQuery, values, (err, results) => {
                         if(err) reject(new Error(err.message));
                         else resolve(results);
                     });
                  }
             );

             console.log(response);  // for debugging to see the result of select
             return response;

         }  catch(error){
            console.log(error);
         }
   }

   // Added this for searching
   async searchByName2(query1, query2, query3){
      try{
           const dateAdded = new Date();
           // use await to call an asynchronous function
            
           let sqlQuery
           const values = []
           const conditions = []

           if (query1 === "byName") {

            if (query2 != "empty") {
               conditions.push('firstname = ?');
               values.push(query2);
             }
           
            if (query3 != "empty") {
            conditions.push('lastname = ?');
            values.push(query3);
            }
            
            if(conditions.length > 1) {
               sqlQuery = 'Where ' + conditions.join(' OR ')
            } else if (conditions.length == 1 ) {
               sqlQuery = 'Where ' + conditions
            }
            
           } else if (query1 === "bySalary") {

            if (query2 != "empty") {
               conditions.push('?');
               values.push(query2);
             }
           
            if (query3 != "empty") {
            conditions.push('?');
            values.push(query3);
            }
            
            if(conditions.length > 1) {
               sqlQuery = 'Where salary BETWEEN ' + conditions.join(' AND ')
            } else if (conditions.length == 1 && query2 == "empty") {
               sqlQuery = 'Where salary BETWEEN 0 AND ?'
            } else if (conditions.length == 1 && query3 == "empty") {
               sqlQuery = 'Where salary BETWEEN ? AND 9999'
            }

           } else if (query1 === "byAge") {

            if (query2 != "empty") {
               conditions.push('?');
               values.push(query2);
             }
           
            if (query3 != "empty") {
            conditions.push('?');
            values.push(query3);
            }
            
            if(conditions.length > 1) {
               sqlQuery = 'Where age BETWEEN ' + conditions.join(' AND ')
            } else if (conditions.length == 1 && query2 == "empty") {
               sqlQuery = 'Where age BETWEEN 0 AND ?'
            } else if (conditions.length == 1 && query3 == "empty") {
               sqlQuery = 'Where age BETWEEN ? AND 9999'
            }

           } else if (query1 == "byUserid") {
            sqlQuery = 'Where userid = ?;' // for by userid
            values.push(query2)
           } else if (query1 === "byRgstDate") {

            if (query2 != "empty") {
               conditions.push('?');
               values.push(query2);
             }
           
            if (query3 != "empty") {
            conditions.push('?');
            values.push(query3);
            }
            
            if(conditions.length > 1) {
               sqlQuery = 'Where age BETWEEN ' + conditions.join(' AND ')
            } else if (conditions.length == 1 && query2 == "empty") {
               sqlQuery = 'Where age BETWEEN 0 AND ?'
            } else if (conditions.length == 1 && query3 == "empty") {
               sqlQuery = 'Where age BETWEEN ? AND 9999'
            }
         }
         

           const response = await new Promise((resolve, reject) => 
                {
                   const query = "SELECT * FROM Users "+ sqlQuery;
                   // const query = "SELECT * FROM names where name = ?;";
                   connection.query(query, values, (err, results) => {
                       if(err) reject(new Error(err.message));
                       else resolve(results);
                   });
                }
           );

           console.log(response);  // for debugging to see the result of select
           return response;

       }  catch(error){
          console.log(error);
       }
   }

   async deleteRowById(id){
         try{
              id = parseInt(id, 10);
              // use await to call an asynchronous function
              const response = await new Promise((resolve, reject) => 
                  {
                     const query = "DELETE FROM names WHERE id = ?;";
                     connection.query(query, [id], (err, result) => {
                          if(err) reject(new Error(err.message));
                          else resolve(result.affectedRows);
                     });
                  }
               );

               console.log(response);  // for debugging to see the result of select
               return response === 1? true: false;

         }  catch(error){
              console.log(error);
         }
   }

  
  async updateNameById(id, newName){
      try{
           console.log("dbService: ");
           console.log(id);
           console.log(newName);
           id = parseInt(id, 10);
           // use await to call an asynchronous function
           const response = await new Promise((resolve, reject) => 
               {
                  const query = "UPDATE names SET name = ? WHERE id = ?;";
                  connection.query(query, [newName, id], (err, result) => {
                       if(err) reject(new Error(err.message));
                       else resolve(result.affectedRows);
                  });
               }
            );

            // console.log(response);  // for debugging to see the result of select
            return response === 1? true: false;
      }  catch(error){
         console.log(error);
      }
  }
  async updateNameById(id, newName){
      try{
           console.log("dbService: ");
           console.log(id);
           console.log(newName);
           id = parseInt(id, 10);
           // use await to call an asynchronous function
           const response = await new Promise((resolve, reject) => 
               {
                  const query = "UPDATE names SET name = ? WHERE id = ?;";
                  connection.query(query, [newName, id], (err, result) => {
                       if(err) reject(new Error(err.message));
                       else resolve(result.affectedRows);
                  });
               }
            );

            // console.log(response);  // for debugging to see the result of select
            return response === 1? true: false;
      }  catch(error){
         console.log(error);
      }
  }

  async updateNameById2(newName){
   try{
        console.log("dbService: ");
        console.log(newName);
        const dateAdded = new Date();
        // use await to call an asynchronous function
        const response = await new Promise((resolve, reject) => 
            {
               const query = "UPDATE Users SET signintime = ? WHERE userid = ?;";
               connection.query(query, [dateAdded, newName], (err, result) => {
                    if(err) reject(new Error(err.message));
                    else resolve(result.affectedRows);
               });
            }
         );

         // console.log(response);  // for debugging to see the result of select
         return response === 1? true: false;
   }  catch(error){
      console.log(error);
   }
}

}

module.exports = DbService;
