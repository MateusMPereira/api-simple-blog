const express = require('express');
const mongoose = require('mongoose');
const artigosRouter = require('../src/controllers/artigosController');
const usuariosRouter = require('../src/controllers/usuariosController');
const categoriasArtigosRouter = require('../src/controllers/categoriasArtigosController');
const comentariosArtigosRouter = require('../src/controllers/comentariosArtigosController');
const papeisUsuariosRouter = require('../src/controllers/papeisUsuariosController');

const app = express();

mongoose.connect('mongodb+srv://owner:QHJCpoM4l3z7b2Tc@blog360.v1oqwf5.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado MDB!');
});

app.use('/api/artigos', artigosRouter);
app.use('/api/usuarios', usuariosRouter);
app.use('/api/categorias-artigos', categoriasArtigosRouter);
app.use('/api/comentarios-artigos', comentariosArtigosRouter);
app.use('/api/papeis-usuarios', papeisUsuariosRouter);

app.listen(3000, () => {
  console.log(`Application started.`);
});