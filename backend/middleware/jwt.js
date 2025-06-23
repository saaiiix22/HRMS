const jwt = require('jsonwebtoken');
const blacklistedTokens = new Set();


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


// const verifyToken = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ auth: false, message: 'No token provided' });
//     }
//     if (blacklistedTokens.has(token)) {
//         return res.status(401).json({ auth: false, message: 'Token has been invalidated' });
//     }
//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ auth: false, message: "Invalid token" });
//         } else {
//             req.user = decoded.user;
//             next();
//         }
//     });
// };
// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({ auth: false, message: 'No token provided' });
//     }

//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ auth: false, message: 'Invalid token' });
//         }

//         req.user = decoded.user;
//         next();
//     });
// };

module.exports = verifyToken;
