// 3d Party Modules
const express = require('express');

// Local Modules
const route = require('./api/user/userController.js');
const route = require('./api/pdfGen/api/pdfGenRoute.js');
const route = require('./api/sales/api/salesRoute.js');

// Server Initialization
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

// Routes are written here
app.use('/route', route);

//Server Listen and Database Connection
app.listen(PORT, (error) =>{
    if(error)
        console.log("Erro na inicialização do servidor")
    else
        console.log("Servidor iniciado com sucesso! Aplicação escutando na porta " + PORT);
    }
);