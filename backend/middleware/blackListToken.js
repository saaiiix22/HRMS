const blacklistedTokens = new Set();
const jwtDecode = require('jwt-decode');


const blacklistToken = (token) => {
    try {
        const { exp } = jwtDecode(token);
        const expiresInMs = (exp * 1000) - Date.now();

        if (expiresInMs > 0) {
            blacklistedTokens.add(token);

            setTimeout(() => {
                blacklistedTokens.delete(token);
            }, expiresInMs);
        }
    } catch (err) {
        console.error("Failed to decode token for blacklisting:", err);
    }
};

module.exports = blacklistToken
