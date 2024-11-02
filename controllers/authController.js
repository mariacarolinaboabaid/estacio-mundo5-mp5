const doLogin = require('../services/do-login');
const getPerfil = require('../services/get-perfil');
const getContracts = require('../services/get-contracts');
const generateToken = require('../services/generateToken')
const users = require('../mock/users');

const login = (req, res) => {
    const credentials = req.body
    let userData;
    userData = doLogin(credentials);
    if (userData) {
        const token = generateToken(userData.id);
        return res.json({ sessionid: token });
    } else {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
};

const decryptSessionId = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const secretKey = process.env.SECRET_KEY || 'default_secret';
    try {
        const decoded = jwt.verify(token, secretKey);
        res.json({ decryptedSessionid: decoded.usuario_id });
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

const getPerfilBySessionId = (req, res) => {
    const sessionid = req.params.sessionid;
    const perfil = getPerfil(sessionid);
    if (perfil !== 'admin') {
        res.status(403).json({ message: 'Forbidden' });
    } else {
        res.status(200).json({ data: users })
    }
};

const getUserData = (req, res) => {
    const user = users.find(u => u.id === req.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id: user.id, username: user.username, profile: user.profile });
};


const getExistingContracts = (req, res) => {
    const empresa = req.params.empresa;
    const dtInicio = req.params.inicio;
    const sessionid = req.params.sessionid;
    const result = getContracts(empresa, dtInicio);
    if (result)
        res.status(200).json({ data: result })
    else
        res.status(404).json({ data: 'Dados Não encontrados' })
};

module.exports = { login, decryptSessionId, getPerfilBySessionId, getExistingContracts, getUserData };