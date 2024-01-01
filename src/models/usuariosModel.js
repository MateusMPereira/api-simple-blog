const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  dataNascimento: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'papeis-usuarios', required: true },
  categoriaFavorita: { type: mongoose.Schema.Types.ObjectId, ref: 'categorias-artigos', required: true },
  foto: { type: String, required: true }, // Armazenar como BASE64 ou um link para a imagem
});

const usuariosModel = mongoose.model('usuarios', usuarioSchema);

module.exports = usuariosModel;