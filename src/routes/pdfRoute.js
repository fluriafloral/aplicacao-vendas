// Modules
const { Router } = require('express');
const pdfController = require("../controllers/pdfController");

// Initialization
const pdfRouter = Router();

// Requests
crudRouter.get('/sales/pdf', pdfController.getSalesPDF);

module.exports = pdfRouter;