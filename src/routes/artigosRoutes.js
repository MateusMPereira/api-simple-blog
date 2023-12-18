const express = require('express');
const artigosRoutes = express.Router();
const authMiddleware = require('../middlewares/basicAuthMiddleware');
const artigosController = require('../controllers/artigosController');

artigosRoutes.get('/', authMiddleware, artigosController);

module.exports = artigosRoutes;