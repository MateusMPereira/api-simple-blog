const express = require('express');
const papeisUsuariosRouter = express.Router();
const authMiddleware = require('../middlewares/basicAuthMiddleware');
const papeisUsuariosController = require('../controllers/papeisUsuariosController');

papeisUsuariosRouter.get('/', authMiddleware, papeisUsuariosController.listarPapeisUsuarios);
papeisUsuariosRouter.get('/:id', authMiddleware, papeisUsuariosController.obterPapelUsuario);
papeisUsuariosRouter.post('/', authMiddleware, papeisUsuariosController.criarPapelUsuario);
papeisUsuariosRouter.put('/:id', authMiddleware, papeisUsuariosController.atualizarPapelUsuario);
papeisUsuariosRouter.delete('/:id', authMiddleware, papeisUsuariosController.deletarPapelUsuario);

module.exports = papeisUsuariosRouter;
