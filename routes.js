const express = require('express');
const routes = express.Router();
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/auth.middleware')

routes.post('/api/auth/login', authController.login);
routes.post('/api/auth/decrypt/:sessionid', authMiddleware.authMiddleware, authMiddleware.isAdmin, authController.decryptSessionId);
routes.get('/api/users/:sessionid', authMiddleware.authMiddleware, authMiddleware.isAdmin, authController.getPerfilBySessionId)
routes.get('/user-data', authMiddleware.authMiddleware, authMiddleware.isAdmin, authController.getUserData);
routes.get('/api/contracts/:empresa/:inicio/:sessionid', authMiddleware.authMiddleware, authController.getExistingContracts);

module.exports = routes;