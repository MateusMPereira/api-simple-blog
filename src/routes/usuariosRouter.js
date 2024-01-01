const express = require('express');
const usuariosRouter = express.Router();
const authMiddleware = require('../middlewares/basicAuthMiddleware');
const usuariosController = require('../controllers/usuariosController');

usuariosRouter.get('/', authMiddleware, usuariosController.listarUsuarios);
usuariosRouter.get('/:id', authMiddleware, usuariosController.obterUsuario);
usuariosRouter.post('/', authMiddleware, usuariosController.criarUsuario);
usuariosRouter.put('/:id', authMiddleware, usuariosController.atualizarUsuario);
usuariosRouter.delete('/:id', authMiddleware, usuariosController.deletarUsuario);

module.exports = usuariosRouter;
