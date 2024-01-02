const express = require('express');
const papeisUsuariosRouter = express.Router();
const authMiddleware = require('../src/middlewares/basicAuthMiddleware');
const {
    listarPapeisUsuarios,
    obterPapelUsuario,
    criarPapelUsuario,
    atualizarPapelUsuario,
    deletarPapelUsuario,
  } = require('../src/controllers/papeisUsuariosController');

papeisUsuariosRouter.get('/', authMiddleware, listarPapeisUsuarios);
papeisUsuariosRouter.get('/:id', authMiddleware, obterPapelUsuario);
papeisUsuariosRouter.post('/', authMiddleware, criarPapelUsuario);
papeisUsuariosRouter.put('/:id', authMiddleware, atualizarPapelUsuario);
papeisUsuariosRouter.delete('/:id', authMiddleware, deletarPapelUsuario);

module.exports = papeisUsuariosRouter;
