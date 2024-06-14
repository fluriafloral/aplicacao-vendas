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
            const registerValidation = userService.addNewUser(email, password);
        
            if(registerValidation == Error) {
                return res.status(500).send("Erro no cadastro de usuário");
            }
        
            res.status(201).send(registerValidation);
        } catch(err) {
            res.status(500).send("Erro no servidor");
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
                (loginValidation) => {
                    if(!loginValidation.auth) {
                        return res.status(401).send('Senha incorreta\n');
                    }

                    res.status(200).send(loginValidation);
                },
                () => {
                    return res.status(404).send('Email não encontrado\n');
                }
            );
        } catch(err) {
            console.log(err);
            res.status(500).send("Erro no servidor");
        }
    }
}

module.exports = userController;