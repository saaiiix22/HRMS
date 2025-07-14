const jwt = require('jsonwebtoken');
const { blacklistedTokens } = require('./blackListToken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    if (blacklistedTokens.has(token)) {
        return res.status(403).json({ message: 'Token has been blacklisted' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        req.user = decoded.user;
        next();
    });
};

module.exports = verifyToken;
