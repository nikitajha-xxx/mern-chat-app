//JWT Token is used to authorize the user when he is trying to access any resource from the backend
//it is token that gets generated with some unique fields for the user
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const generateToken = (id) => {
    //the jwt sign method takes in the unique id, a secret key and the time after which the token expires
    return jwt.sign({id}, JWT_SECRET, {
        expiresIn:"30d"
    })
}

module.exports = generateToken


