const express = require('express');
const testeRouter = express.Router();
const authMiddleware = require('../middlewares/basicAuthMiddleware');
const testeController = require('../controllers/testeController');

testeRouter.get('/', authMiddleware, testeController.get);
testeRouter.get('/', testeController.get);

testeRouter.post('/', authMiddleware, testeController.post);
testeRouter.post('/', testeController.post);

module.exports = testeRouter;
