const jwt = require('jsonwebtoken')

const generateToken = (id ) =>{
    return jwt.sign({ id }, "chat",{
        expiresIn:'6h'
    });
}

module.exports = generateToken