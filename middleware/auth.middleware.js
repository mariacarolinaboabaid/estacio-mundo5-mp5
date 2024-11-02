const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: 'Access denied: No token provided' });
    }
    const secretKey = process.env.SECRET_KEY || 'default_secret';
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Access denied: Token expired' });
            }
            return res.status(403).json({ error: 'Access denied: Invalid token' });
        }
        req.userId = decoded.usuario_id;
        req.userProfile = decoded.perfil;
        next();
    });
}

function isAdmin(req, res, next) {
    if (req.userProfile !== 'admin') {
        return res.status(403).json({ error: 'Access denied: Admins only' });
    }
    next();
};

module.exports = { authMiddleware, isAdmin };