import jwt from 'jsonwebtoken';

// Generate a JWT token
const generateSecretToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d',  // Expiry set to 1 day
    });
};

// Verify the JWT token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired');
        } else {
            throw new Error('Invalid token');
        }
    }
};

export { generateSecretToken, verifyToken };
