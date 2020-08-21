const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = getAuthToken(req) // 'Bearer TOKEN'
        if (!token) {
            return res.status(401).json({
                message: 'No authorization'
            })
        }

        const decoded = verifyAuthToken(token)
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({
            message: 'No authorization'
        })
    }
}

function getAuthToken(req) {
    return req.headers.authorization.split(' ')[1]
}

function verifyAuthToken(token) {
    return jwt.verify(token, config.get('jwtSecret'))
} 