const jwt = require('jsonwebtoken');

function generateToken(userId) {
  const secretKey = process.env.SECRET_KEY || 'default_secret';
  const token = jwt.sign({ usuario_id: userId, perfil: profile }, secretKey, { expiresIn: '1h' });
  return token;
}

module.exports = { generateToken };

