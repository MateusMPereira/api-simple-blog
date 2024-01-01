const express = require('express');
const comentariosArtigosController = require('../controllers/comentariosArtigosController');
const authMiddleware = require('../middlewares/basicAuthMiddleware');
const comentariosArtigosRouter = express.Router();

comentariosArtigosRouter.get('/', authMiddleware, comentariosArtigosController.listarComentariosArtigos);
comentariosArtigosRouter.get('/:id', authMiddleware, comentariosArtigosController.obterComentarioArtigo);
comentariosArtigosRouter.post('/', authMiddleware, comentariosArtigosController.criarComentarioArtigo);
comentariosArtigosRouter.put('/:id', authMiddleware, comentariosArtigosController.atualizarComentarioArtigo);
comentariosArtigosRouter.delete('/:id', authMiddleware, comentariosArtigosController.deletarComentarioArtigo);

module.exports = comentariosArtigosRouter;
