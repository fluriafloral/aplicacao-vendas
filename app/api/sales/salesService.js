// 3rd Party Modules
const pdf = require('pdfkit-table');
const fs = require('fs');

// salesRepository Methods Import
const salesRepository = require('./salesRepository');

const salesService = {
    // Calls salesRepository to get all sales from table
    getAllSales: async () => {
        await salesRepository.getSales().then(
            (sales) => {
                return sales;
            },
            (err) => {
                console.log(err);
                return err;
            }
        );
    },

    // Calls salesRepository to insert new sale
    addNewSale: (costumer_name, product, value, sale_date, user_id) => {
        try {
            return salesRepository.createSale(costumer_name, product, value, sale_date, user_id);
        } catch(err) {
            console.log(err);
            return err;
        }
    },

    // Calls salesRepository to update a row in sales
    editSale: async (sale_id, costumer_name, product, value, sale_date) => {
        await salesRepository.updateSale(sale_id, costumer_name, product, value, sale_date).then(
            (row) => {
                return row;
            },
            (err) => {
                console.log(err);
                return err;
            }
        );
    },

    // Calls salesRepository to delete a row in sales
    deleteSale: async (sale_id) => {
        await salesRepository.deleteSale(sale_id).then(
            () => {

            },
            (err) => {
                console.log(err);
                return err;
            }
        );
    },

    // Calls salesRepository to get sales in a date range
    generateSalesPDF: async (startDate, endDate) => {
        await salesRepository.getSalesInDateRange(startDate, endDate).then(
            async (sales) => {
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

                return filename;
            },
            (err) => {
                console.log(err);
                return err;
            }
        );
    }
}

module.exports = salesService;