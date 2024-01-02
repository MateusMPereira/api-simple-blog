const express = require('express');
const comentariosArtigosController = require('../src/controllers/comentariosArtigosController');
const authMiddleware = require('../src/middlewares/basicAuthMiddleware');
const comentariosArtigosRouter = express.Router();

comentariosArtigosRouter.get('/', authMiddleware, comentariosArtigosController.listarComentariosArtigos);
comentariosArtigosRouter.get('/:id', authMiddleware, comentariosArtigosController.obterComentarioArtigo);
comentariosArtigosRouter.post('/', authMiddleware, comentariosArtigosController.criarComentarioArtigo);
comentariosArtigosRouter.put('/:id', authMiddleware, comentariosArtigosController.atualizarComentarioArtigo);
comentariosArtigosRouter.delete('/:id', authMiddleware, comentariosArtigosController.deletarComentarioArtigo);

module.exports = comentariosArtigosRouter;
