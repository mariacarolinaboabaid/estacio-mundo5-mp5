const users = require('../mock/users');
const decrypt = require('./decrypt');

function getPerfil(sessionId) {
    const user = JSON.parse(decrypt(sessionId));
    const userData = users.find(item => {
        if (parseInt(user.usuario_id) === parseInt(item.id))
            return item;
    });
    return userData.perfil;
};

module.exports = { getPerfil };