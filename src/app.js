// Modules
const express = require('express');
require('dotenv/config');

const route = require('./routes/authenticationRoute.js');

// Server Initialization
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/route', route);

//Server Listen
app.listen(PORT, (error) =>{
    if(error)
        console.log("Erro na inicialização do servidor")
    else
        console.log("Servidor iniciado com sucesso! Aplicação escutando na porta " + PORT);
    }
);