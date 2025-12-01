import {DatabaseSync} from 'node:sqlite'; //Will have all of the logic of the database using sqlite

//Creates our database, in memory
const db = new DatabaseSync(':memory:');

/*
    We must execute SQL satements from strings
    We use .exec to execute a sql command and act it upon our database 
*/
db.exec(`CREATE TABLE users
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)`);

db.exec(
    `CREATE TABLE todos
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`);

//Allows us to interact with this database, all stored wihtin this variable (db)
export default db; 