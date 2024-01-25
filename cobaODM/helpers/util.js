var jwt = require('jsonwebtoken');

module.exports = {
    tokenValid: (req, res, next) => {
        try {
            const token = req.header('Authorization');
            req.user = jwt.verify(token.slice(7), 'rubicamp');
            next()
        } catch (err) {
            res.status(401).json({ succsess: false, message:  'access denied' })
        }

    }
}