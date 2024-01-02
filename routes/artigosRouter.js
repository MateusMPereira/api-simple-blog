const express = require('express');
const artigosRouter = express.Router();
const authMiddleware = require('../src/middlewares/basicAuthMiddleware');
const {
    listarArtigos,
    obterArtigo,
    criarArtigo,
    atualizarArtigo,
    deletarArtigo,
  } = require('../src/controllers/artigosController');

artigosRouter.get('/', authMiddleware, listarArtigos);
artigosRouter.get('/:id', authMiddleware, obterArtigo);
artigosRouter.post('/', authMiddleware, criarArtigo);
artigosRouter.put('/:id', authMiddleware, atualizarArtigo);
artigosRouter.delete('/:id', authMiddleware, deletarArtigo);

module.exports = artigosRouter;
