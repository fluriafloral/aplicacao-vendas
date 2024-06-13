// 3d Party Modules
const sqlite3 = require('sqlite3').verbose();

// Database object creation
let db =  new sqlite3.Database('../shared/db/database.sqlitedb/database.sqlite');

// Inserts a new user in users table
const insertNewUser = (email, password) => {
    db.run('INSERT INTO users(email, password) VALUES(?)', [email, password],
        function(err) {
            if (err) {
                throw err;
            }
        }
    )
}

export default {insertNewUser}