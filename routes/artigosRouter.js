const express = require('express');
const artigosRouter = express.Router();
const authMiddleware = require('../src/middlewares/basicAuthMiddleware');
const artigosController = require('../src/controllers/artigosController');

console.log('artigosRouter!');

artigosRouter.get('/', authMiddleware, artigosController.listarArtigos);
artigosRouter.get('/:id', authMiddleware, artigosController.obterArtigo);
artigosRouter.post('/', authMiddleware, artigosController.criarArtigo);
artigosRouter.put('/:id', authMiddleware, artigosController.atualizarArtigo);
artigosRouter.delete('/:id', authMiddleware, artigosController.deletarArtigo);

module.exports = artigosRouter;
