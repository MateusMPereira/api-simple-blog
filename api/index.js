const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = express.Router();
const artigosController = require('../src/controllers/artigosController');
const categoriasArtigosController = require('../src/controllers/categoriasArtigosController');
const comentariosArtigosController = require('../src/controllers/comentariosArtigosController');
const usuariosController = require('../src/controllers/usuariosController');
const papeisUsuariosController = require('../src/controllers/papeisUsuariosController');
const authMiddleware = require('../src/middlewares/basicAuthMiddleware');
const errorHandler = require('errorhandler');

const app = express();

mongoose.connect('mongodb+srv://owner:QHJCpoM4l3z7b2Tc@blog360.v1oqwf5.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado MDB!');
});

app.set('port', 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.get('/api/artigos/', authMiddleware, artigosController.listarArtigos);
router.get('/api/artigos/:id', authMiddleware, artigosController.obterArtigo);
router.post('/api/artigos/', authMiddleware, artigosController.criarArtigo);
router.put('/api/artigos/:id', authMiddleware, artigosController.atualizarArtigo);
router.delete('/api/artigos/:id', authMiddleware, artigosController.deletarArtigo);

router.get('/api/categorias-artigos/', authMiddleware, categoriasArtigosController.listarCategoriasArtigos);
router.get('/api/categorias-artigos/:id', authMiddleware, categoriasArtigosController.obterCategoriaArtigo);
router.post('/api/categorias-artigos/', authMiddleware, categoriasArtigosController.criarCategoriaArtigo);
router.put('/api/categorias-artigos/:id', authMiddleware, categoriasArtigosController.atualizarCategoriaArtigo);
router.delete('/api/categorias-artigos/:id', authMiddleware, categoriasArtigosController.deletarCategoriaArtigo);

router.get('/api/comentarios-artigos/', authMiddleware, comentariosArtigosController.listarComentariosArtigos);
router.get('/api/comentarios-artigos/:id', authMiddleware, comentariosArtigosController.obterComentarioArtigo);
router.post('/api/comentarios-artigos/', authMiddleware, comentariosArtigosController.criarComentarioArtigo);
router.put('/api/comentarios-artigos/:id', authMiddleware, comentariosArtigosController.atualizarComentarioArtigo);
router.delete('/api/comentarios-artigos/:id', authMiddleware, comentariosArtigosController.deletarComentarioArtigo);

router.get('/api/usuarios/', authMiddleware, usuariosController.listarUsuarios);
router.get('/api/usuarios/:id', authMiddleware, usuariosController.obterUsuario);
router.post('/api/usuarios/', authMiddleware, usuariosController.criarUsuario);
router.put('/api/usuarios/:id', authMiddleware, usuariosController.atualizarUsuario);
router.delete('/api/usuarios/:id', authMiddleware, usuariosController.deletarUsuario);

router.get('/api/papeis-usuarios/', authMiddleware, papeisUsuariosController.listarPapeisUsuarios);
router.get('/api/papeis-usuarios/:id', authMiddleware, papeisUsuariosController.obterPapelUsuario);
router.post('/api/papeis-usuarios/', authMiddleware, papeisUsuariosController.criarPapelUsuario);
router.put('/api/papeis-usuarios/:id', authMiddleware, papeisUsuariosController.atualizarPapelUsuario);
router.delete('/api/papeis-usuarios/:id', authMiddleware, papeisUsuariosController.deletarPapelUsuario);

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
})
