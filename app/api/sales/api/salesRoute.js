// Modules
const { Router } = require('express');
const salesController = require('./salesController.js');

// Initialization
const salesRouter = Router();

// Requests
salesRouter.get('/sales', salesController.getAllSales);
salesRouter.post('/sales', salesController.addNewSale);
salesRouter.put('/sales/:id', salesController.updateSale);
salesRouter.delete('/sales/:id', salesController.deleteSale);

module.exports = salesRouter;