const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const artigosRouter = require('../src/controllers/artigosController');
const usuariosRouter = require('../src/controllers/usuariosController');
const categoriasArtigosRouter = require('../src/controllers/categoriasArtigosController');
const comentariosArtigosRouter = require('../src/controllers/comentariosArtigosController');
const papeisUsuariosRouter = require('../src/controllers/papeisUsuariosController');
const errorHandler = require('errorhandler');

const app = express();

mongoose.connect('mongodb+srv://owner:QHJCpoM4l3z7b2Tc@blog360.v1oqwf5.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado MDB!');
});

app.set('port', 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {

});
app.get('/artigos', artigosRouter);
app.get('/usuarios', usuariosRouter);
app.get('/categorias-artigos', categoriasArtigosRouter);
app.get('/comentarios-artigos', comentariosArtigosRouter);
app.get('/papeis-usuarios', papeisUsuariosRouter);

if (app.get('env') === 'development') {
  app.use(errorHandler())
}

var server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'))
})
