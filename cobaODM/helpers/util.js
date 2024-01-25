var jwt = require('jsonwebtoken');
const config = require('../config/config.json')

class Response {
    constructor(data, success = true) {
        this.data = data
        this.success = success
    }
}

module.exports = {
    tokenValid: (req, res, next) => {
        try {
            const token = req.header('Authorization');
            req.user = jwt.verify(token.slice(7), config.secretKey);
            next()
        } catch (err) {
            res.status(401).json({ succsess: false, message:  'access denied' })
        }

    },
    Response
}