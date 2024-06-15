// 3rd Party Modules
const pdf = require('pdfkit-table');
const fs = require('fs');

// salesRepository Methods Import
const salesRepository = require('./salesRepository');

const salesService = {
    // Calls salesRepository to get all sales from table
    getAllSales: async () => {
        return new Promise(async (resolve, reject) => {
            const sales = await salesRepository.getSales();

            if(!sales) {
                return reject(err);
            }

            resolve(sales);
        });
    },

    // Calls salesRepository to insert new sale
    addNewSale: (costumerName, product, value, saleDate, userID) => {
        try {
            return salesRepository.createSale(costumerName, product, value, saleDate, userID);
        } catch(err) {
            console.log(err);
            return err;
        }
    },

    // Calls salesRepository to update a row in sales
    editSale: async (saleID, costumerName, product, value, saleDate) => {
        return new Promise(async (resolve, reject) => {
            const row = await salesRepository.updateSale(saleID, costumerName, product, value, saleDate);
            
            if(!row) {
                return reject(err);
            }

            resolve(row);
        });
    },

    // Calls salesRepository to delete a row in sales
    deleteSale: async (saleID) => {
        return new Promise(async (resolve, reject) => {
            const saleID = await salesRepository.deleteSale(saleID);

            if(!saleID) {
                reject(err);
            }

            resolve(saleID);
        });
    },

    // Calls salesRepository to get sales in a date range
    generateSalesPDF: async (startDate, endDate) => {
        return new Promise(async (resolve, reject) => {
            const sales = await salesRepository.getSalesInDateRange(startDate, endDate);

            if(!sales) {
                reject(err);
            }

            const doc = new pdf({margin: 30, size: 'A4'});
            const filename = `sales_${startDate}_${endDate}.pdf`;
            doc.pipe(fs.createWriteStream(filename));

            // Table
            const table = {
                title: `Vendas entre ${startDate} e ${endDate}`,
                headers: ['ID', 'Nome do cliente', 'Produto', 'Valor', 'Data da venda', 'ID do vendedor'],
                rows: sales
            };

            // Widht
            await doc.table(table, { width: 300 });

            doc.end();

            resolve(filename);
        });
    }
}

module.exports = salesService;