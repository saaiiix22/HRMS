const jwt = require('jsonwebtoken');

const blacklistedTokens = new Set();

const blacklistToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const expiresInMs = (decoded.exp * 1000) - Date.now();

        if (expiresInMs > 0) {
            blacklistedTokens.add(token);
            setTimeout(() => {
                blacklistedTokens.delete(token);
            }, expiresInMs);
        }
    } catch (err) {
        console.error("Failed to verify token for blacklisting:", err.message);
    }
};

module.exports = {
    blacklistToken,
    blacklistedTokens
};
