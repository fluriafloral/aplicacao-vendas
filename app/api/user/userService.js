// 3rd Party Modules
const jwt = require('jsonwebtoken');
require('dotenv/config');

// userRepository Methods Import
const userRepository = require('./userRepository');

// Environment Variables 
const jwt_key = process.env.PRIVATE_KEY;
const jwt_token_expiration_time = process.env.JWT_TOKEN_EXPIRE_TIME;

const userService = {
    // Calls userRepository to insert new user in database and creates the jwt token
    addNewUser: (email, password) => {
        try {
            let userId = userRepository.createUser(email, password);
            
            // Token expires in jwt_token_expiration_time seconds
            const token = jwt.sign({ id: userId }, jwt_key, {expiresIn: jwt_token_expiration_time});
            return token;
        } catch(err) {
            console.log(err);
            return err;
        }
    },

    // Authenticates user and password 
    validateLogin: async (email, password) => {
        return new Promise(async (resolve, reject) => {
            const user = await userRepository.findUser(email);

            if(!user) {
                return reject(null);
            }

            if(password !== user.password) {
                return reject(1);
            }

            // Token expires in jwt_token_expiration_time seconds
            const token = jwt.sign({ id: user.id }, jwt_key, {expiresIn: jwt_token_expiration_time});
            resolve(token);
        });
    }
}

module.exports = userService;