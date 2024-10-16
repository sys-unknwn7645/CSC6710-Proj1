**Project description**

In this project, you will create a user table and then use it to register a new user and then allows the user to sign into a website. This project will take 4 weeks. 

Watch this video: https://www.youtube.com/watch?v=vrj9AohVhPA

Please implement the following interface and functoinalty: 
1. User registration.
2. User sign-in.
3. search users by first and/or last name.
4. search users by userid;
5. search all users whose salary is between X and Y. 
6. Search all users whose ages are between X and Y.
7. Search users who registered after john registered, where ```john``` is the userid.
8. search users who never signed in.
9. Search users who registered on the same day that john registered. 
10. Return the users who registered today;

Show and explain the results above in a video. Submit all SQL statements in a file called sql.txt. 

Consider to create the user table using the following CREATE TABLE stmt (feel free to revise it): 


```SQL
CREATE TABLE Users(
   userid VARCHAR(50) primary key,
   firstname VARCHAR(50),
   lastname VARCHAR(50),
   salary FLOAT,
   age INTEGER,
   registerday DATE,
   signintime DATETIME
) 
```


Note: the grading will be based on the correct result of the query, the design of the interface and your explnation skill of the results. 
doenv is a file that you need to customize and rename it to .env to work.

**How to run the sample code**
1. We will use the Apache web server. Create the first webpage index.html under ```C:\xampp\htdocs>``` (or similar directory where you installed XAMPP) and point your browser to ```http://localhost/index.html```. You should see your first webpage.
2. At ```C:\xampp\htdocs```, run ```git clone https://github.com/shiyonglu/database_javascript.git``` to copy the whole sample code to the current directory.
3. Now you can access the Frontend via [http://localhost/database_javascript/project1/Frontend/index.html](http://localhost/database_javascript/project1/Frontend/index.html).
4. Configure the MySql database according to ```C:\xampp\htdocs\database_javascript\project1\Backend\dotenv```, that is, to create a database called ```web_app``` and a user ```john``` with password ```1234``` via the Admin interface ```http://localhost/phpmyadmin/```. The user ```john``` will be granted with all priviledges for the ```web_app``` database. To get started, you might also change the file as follows to only use the root user:
```javascript
PORT=5000
USER=root
PASSWORD=
DATABASE=web_app
DB_PORT=3306
HOST=localhost
```
5. You need to rename dotenv to .env by command ```move dotenv .env```.
6.  Under the database ```web_app```, create an empty table as follows: 
```SQL
create table names (id INTEGER PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100), date_added DATE);
```
7. Go the Backend directory ```C:\xampp\htdocs\database_javascript\project1\Backend```.
8. npm init -y
9. npm install express mysql cors nodemon dotenv
10. Modify the scripts section of the Backend/package.json as follows:
```javasript
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
```
8. Start the Backend by running ```npm start```.
9. Feel free to access some of the Backend endpoints directly such as [http://localhost:5000/getall](http://localhost:5000/getall). You will only receive JSON data without nice rendering. 
10. Now you can interact with the Frontend [http://localhost/database_javascript/project1/Frontend/index.html](http://localhost/database_javascript/project1/Frontend/index.html). 
