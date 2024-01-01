const mongoose = require('mongoose');

const categoriaArtigoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
});

const categoriasArtigosModel = mongoose.model('categorias-artigos', categoriaArtigoSchema);

module.exports = categoriasArtigosModel;
