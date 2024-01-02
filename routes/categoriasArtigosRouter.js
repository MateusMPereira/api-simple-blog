const express = require('express');
const categoriasArtigosRouter = express.Router();
const authMiddleware = require('../src/middlewares/basicAuthMiddleware');
const {
    listarCategoriasArtigos,
    obterCategoriaArtigo,
    criarCategoriaArtigo,
    atualizarCategoriaArtigo,
    deletarCategoriaArtigo,
  } = require('../src/controllers/categoriasArtigosController');

categoriasArtigosRouter.get('/', authMiddleware, listarCategoriasArtigos);
categoriasArtigosRouter.get('/:id', authMiddleware, obterCategoriaArtigo);
categoriasArtigosRouter.post('/', authMiddleware, criarCategoriaArtigo);
categoriasArtigosRouter.put('/:id', authMiddleware, atualizarCategoriaArtigo);
categoriasArtigosRouter.delete('/:id', authMiddleware, deletarCategoriaArtigo);

module.exports = categoriasArtigosRouter;
