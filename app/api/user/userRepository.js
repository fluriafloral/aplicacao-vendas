// 3rd party modules
const sqlite3 = require('sqlite3').verbose();
require('dotenv/config');

// Environment Variables 
const databasePath = process.env.DATABASE_PATH;

// Opens database for access
function InitializeDatabaseObj() {
    //Initializes SQLite database
    let db = new sqlite3.Database(databasePath, (err) => {
        if (err) {
            throw err;
        }
    });

    return db;
}

const userRepository = {
    // Inserts a new user in users table
    createUser: (email, password) => {
        let db = InitializeDatabaseObj();

        db.run('INSERT INTO users(email, password) VALUES(?, ?)', [email, password], (err) => {
            if (err) {
                throw err;
            }

            return this.lastID;
        });

        db.close();
    },

    // Searches for a user in users table by email
    findUser: (email) => {
        return new Promise((resolve, reject) => {
            let db = InitializeDatabaseObj();

            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(row);
            });

            db.close();
        });
    }
}

module.exports = userRepository;