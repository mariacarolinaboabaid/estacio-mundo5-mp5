const users = require('../mock/users');

function doLogin(credentials) {
    let userData;
    userData = users.find(item => {
        if (credentials?.username === item.username && credentials?.password ===
            item.password)
            return item;
    });
    return userData;
};

module.exports = { doLogin };