// 3d party modules
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');
require('dotenv/config');

// Local modules
const userController = require('./api/user/userController.js');
const salesController = require('./api/sales/salesController.js');

// Server initialization
const app = express();

// Environment Variables 
const port = process.env.PORT;
const jwt_key = process.env.PRIVATE_KEY;
 
// Middlewares 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookies());

// Function to authenticate JWT token
function verifyToken(req, res, next) {
    const token = req.headers['token'];
    if (!token) {
        return res.status(403).send('Token não pode ser vazio\n');
    }

    const userID = jwt.verify(token, jwt_key);

    req.userID = userID;
    next();
    
}

// Endpoints
app.post('/register', userController.register);
app.post('/login', userController.login);

app.get('/sales', verifyToken, salesController.get);
app.post('/sales', verifyToken, salesController.insert);
app.put('/sales/:id', verifyToken, salesController.update);
app.delete('/sales/:id', verifyToken, salesController.delete);
app.get('/sales/pdf', verifyToken, salesController.getPDF);

//Server listen 
app.listen(port, (error) =>{
    if(error)
        console.log("Erro na inicialização do servidor")
    else
        console.log(`Servidor iniciado com sucesso! Aplicação escutando na porta ${port}`);
    }
);