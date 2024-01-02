const express = require('express');
const usuariosRouter = express.Router();
const authMiddleware = require('../src/middlewares/basicAuthMiddleware');
const {
    listarUsuarios,
    obterUsuario,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
  } = require('../src/controllers/usuariosController');

usuariosRouter.get('/', authMiddleware, listarUsuarios);
usuariosRouter.get('/:id', authMiddleware, obterUsuario);
usuariosRouter.post('/', authMiddleware, criarUsuario);
usuariosRouter.put('/:id', authMiddleware, atualizarUsuario);
usuariosRouter.delete('/:id', authMiddleware, deletarUsuario);

module.exports = usuariosRouter;
