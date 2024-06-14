// salesService methods import
const salesService = require('./salesService');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const jwt_key = process.env.PRIVATE_KEY;

const salesController = {
    // Processes /sales GET endpoint call
    get: async (req, res) => {
        try {
            await salesService.getAllSales().then(
                (sales) => {
                    res.status(200).send(sales);
                },
                () => {
                    return res.status(500).send("Erro na consulta");
                }
            );
        } catch(err) {
            res.status(500).send("Erro no servidor");
        }
    },

    // Processes /sales POST endpoint call
    insert: (req, res) => {
        const {costumerName, product, value, saleDate} = req.body;

        try {
            const saleID = salesService.addNewSale(costumerName, product, value, saleDate, req.userId);
            res.status(200).send(saleID);
        } catch(err) {
            res.status(500).send("Erro no servidor");
        }
    },

    // Processes /sales/:id PUT endpoint call
    update: async (req, res) => {
        const id = req.params.id;
        const {costumerName, product, value, saleDate} = req.body;

        try {
            await salesService.editSale(id, costumerName, product, value, saleDate).then(
                (row) => {
                    res.status(200).send(row);
                },
                () => {
                    return res.status(500).send("Erro na edição");
                }
            );
        } catch(err) {
            res.status(500).send("Erro no servidor");
        }
    },

    // Processes /sales/:id DELETE endpoint call
    delete: async (req, res) => {
        const id = req.params.id;

        try {
            await salesService.deleteSale(id).then(
                () => {
                    res.status(200);
                },
                () => {
                    return res.status(500).send("Erro na exclusão");
                }
            );
        } catch(err) {
            res.status(500).send("Erro no servidor");
        }
    },

    // Processes /sales/pdf?start_date=DD-MM-YYYY&end_date=DD-MM-YYYY GET endpoint call
    getPDF: async (req, res) => {
        const { startDate, endDate } = req.query;
        
        try { 
            await pdfGenService.generateSalesPDF(startDate, endDate).then(
                (filename) => {
                    res.download(filename);
                },
                () => {
                    return res.status(500).send("Erro na geração de PDF");
                }
            );
        } catch(err) {
            res.status(500).send("Erro no servidor");
        }
    }
}

module.exports = salesController;