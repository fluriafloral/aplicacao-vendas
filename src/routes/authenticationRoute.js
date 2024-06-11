// Modules
const { Router } = require('express');
const authController = require('../controllers/authenticationController');

// Initialization
const authRouter = Router();

// Requests
authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

module.exports = authRouter;