const mongoose = require('mongoose');

const artigoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  metaTags: [{ tag: String }],
  conteudo: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios', required: true },
  dataCriacao: { type: String, required: true },
  dataUltimaModificacao: { type: String, required: true },
  autorUltimaModificacao: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },
  capa: { type: String, required: true }, // Armazenar como BASE64 ou um link para a imagem
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'categorias-artigos', required: true },
  idPostAnterior: { type: mongoose.Schema.Types.ObjectId, ref: 'artigos' },
  idPostPosterior: { type: mongoose.Schema.Types.ObjectId, ref: 'artigos' },
  totalVisitantes: { type: Number, default: 0 },
  totalCurtidas: { type: Number, default: 0 },
  totalComentarios: { type: Number, default: 0 },
});

const artigosModel = mongoose.model('artigos', artigoSchema);

module.exports = artigosModel;
