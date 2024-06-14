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

const salesRepository = {
    // Gets all sales in sales table
    getSales: () => {
        return new Promise((resolve, reject) => {
            let db = InitializeDatabaseObj();

            db.all('SELECT * FROM sales', [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
    
                resolve(rows);
            });

            db.close();
        });
    },

    // Inserts new sale in sales
    createSale: (costumer_name, product, value, sale_date, user_id) => {
        let db = InitializeDatabaseObj();

        let query = 'INSERT INTO sales(costumer_name, product, value, sale_date, user_id) VALUES(?, ?, ?, ?, ?)';
        db.run(query, [costumer_name, product, value, sale_date, user_id], (err) => {
            if(err) {
                throw err;
            }

            return this.lastID;
        });

        db.close();
    },

    // Edits existing sale
    updateSale: (sale_id, costumer_name, product, value, sale_date) => {
        return new Promise((resolve, reject) => {
            let db = InitializeDatabaseObj();

            let query = 'UPDATE sales SET costumer_name = ?, product = ?, value = ?, sale_date = ? WHERE id = ?';
            db.run(query, [costumer_name, product, value, sale_date, sale_id], (err) => {
                if (err) {
                    return reject(err);
                }

                resolve({sale_id, costumer_name, product, value, sale_date, user_id});
            });

            db.close();
        });
    },

    // deletes sale
    deleteSale: (sale_id) => {
        return new Promise((resolve, reject) => {
            let db = InitializeDatabaseObj();

            db.run('DELETE FROM sales WHERE id = ?', [sale_id], (err) => {
                if (err) {
                    return reject(err);
                }

                resolve();
            })

            db.close();
        });
    },

    // Gets all sales between a date range
    getSalesInDateRange: (startDate, endDate) => {
        return new Promise((resolve, reject) => {
            let db = InitializeDatabaseObj();

            db.get('SELECT * FROM sales WHERE sale_date BETWEEN ? AND ?', [startDate, endDate], (err, rows) => {
                if(err) {
                    return reject(err);
                }

                resolve(rows);
            });

            db.close();
        });
    } 
}

module.exports = salesRepository;