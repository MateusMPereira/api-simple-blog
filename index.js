const express = require('express');
const mongoose = require('mongoose');
const artigosRouter = require('./routes/artigosRouter');
const usuariosRouter = require('./routes/usuariosRouter');
const categoriasArtigosRouter = require('./routes/categoriasArtigosRouter');
const comentariosArtigosRouter = require('./routes/comentariosArtigosRouter');
const papeisUsuariosRouter = require('./routes/papeisUsuariosRouter');

const app = express();

mongoose.connect('mongodb+srv://owner:QHJCpoM4l3z7b2Tc@blog360.v1oqwf5.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado MDB!');
});

app.use('/v1/artigos', artigosRouter);
app.use('/v1/usuarios', usuariosRouter);
app.use('/v1/categorias-artigos', categoriasArtigosRouter);
app.use('/v1/comentarios-artigos', comentariosArtigosRouter);
app.use('/v1/papeis-usuarios', papeisUsuariosRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});