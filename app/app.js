// 3d party modules
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv/config');

// Local modules
const userController = require('./api/user/userController.js');
const salesController = require('./api/sales/salesController.js');

// Server initialization
const app = express();

// Environment Variables 
const port = process.env.PORT;
 
// Middlewares 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Function to authenticate JWT token
function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send('Token não pode ser vazio');
    }

    jwt.verify(token, jwt_key, (err, decoded) => {
        if(err) {
            return res.status(500).send('Falha na autenticação do token');
        }

        req.userId = decoded.id;
        next();
    });
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
        console.log("Servidor iniciado com sucesso! Aplicação escutando na porta " + port);
    }
);