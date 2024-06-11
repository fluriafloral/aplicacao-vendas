// Modules
const { Router } = require('express');
const crudController = require("../controllers/crudController");

// Initialization
const crudRouter = Router();

// Requests
crudRouter.get('/sales', crudController.getAllSales);
crudRouter.post('/sales', crudController.addNewSale);
crudRouter.put('/sales/:id', crudController.updateSale);
crudRouter.delete('/sales/:id', crudController.deleteSale);

module.exports = crudRouter;