const express = require('express');
const authMiddleware = require('../src/middlewares/basicAuthMiddleware');
const comentariosArtigosRouter = express.Router();
const {
    listarComentariosArtigos,
    obterComentarioArtigo,
    criarComentarioArtigo,
    atualizarComentarioArtigo,
    deletarComentarioArtigo,
  } = require('../src/controllers/comentariosArtigosController');

comentariosArtigosRouter.get('/', authMiddleware, listarComentariosArtigos);
comentariosArtigosRouter.get('/:id', authMiddleware, obterComentarioArtigo);
comentariosArtigosRouter.post('/', authMiddleware, criarComentarioArtigo);
comentariosArtigosRouter.put('/:id', authMiddleware, atualizarComentarioArtigo);
comentariosArtigosRouter.delete('/:id', authMiddleware, deletarComentarioArtigo);

module.exports = comentariosArtigosRouter;
