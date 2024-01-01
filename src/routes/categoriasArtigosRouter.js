const express = require('express');
const categoriasArtigosRouter = express.Router();
const authMiddleware = require('../middlewares/basicAuthMiddleware');
const categoriasArtigosController = require('../controllers/categoriasArtigosController');

categoriasArtigosRouter.get('/', authMiddleware, categoriasArtigosController.listarCategoriasArtigos);
categoriasArtigosRouter.get('/:id', authMiddleware, categoriasArtigosController.obterCategoriaArtigo);
categoriasArtigosRouter.post('/', authMiddleware, categoriasArtigosController.criarCategoriaArtigo);
categoriasArtigosRouter.put('/:id', authMiddleware, categoriasArtigosController.atualizarCategoriaArtigo);
categoriasArtigosRouter.delete('/:id', authMiddleware, categoriasArtigosController.deletarCategoriaArtigo);

module.exports = categoriasArtigosRouter;
