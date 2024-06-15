// Local modules
let userService = require('./userService.js');

const userController = {
    // Processes /register endpoint call
    register: (req, res) => {
        const { email, password } = req.body;
    
        if(!email || !password) {
            return res.status(400).send('Email e senha não podem ser vazios\n');
        }

        try { 
            const token = userService.addNewUser(email, password);
        
            if(token == Error) {
                return res.status(500).send("Erro no cadastro de usuário");
            }
        
            res.status(201).send(token);
        } catch(err) {
            res.status(500).send("Erro no servidor\n");
        }
    },

    // Processes /login endpoint call
    login: async (req, res) => {
        const { email, password } = req.body;
    
        if(!email || !password) {
            return res.status(400).send('Email e senha não podem ser vazios\n');
        }

        try { 
            await userService.validateLogin(email, password).then(
                (token) => {
                    res.cookie("token", token, {httpOnly: true});

                    res.status(200).send(token);
                },
                (token) => {
                    if(!token) {
                        return res.status(401).send('Email não encontrado\n');
                    }

                    return res.status(404).send('Senha incorreta\n');
                }
            );
        } catch(err) {
            console.log(err);
            res.status(500).send("Erro no servidor\n");
        }
    }
}

module.exports = userController;