const mongoose = require('mongoose');

const comentarioArtigoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: true },
  comentarioOrigem: { type: mongoose.Schema.Types.ObjectId, ref: 'artigos', required: true },
  respostaOrigem: { type: mongoose.Schema.Types.ObjectId, ref: 'comentarios-artigos' },
  comentario: { type: String, required: true },
});

const comentariosArtigosModel = mongoose.model('comentarios-artigos', comentarioArtigoSchema);

module.exports = comentariosArtigosModel;
