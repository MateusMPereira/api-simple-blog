const mongoose = require('mongoose');

const papelUsuarioSchema = new mongoose.Schema({
  role: { type: String, required: true },
});

const papeisUsuariosModel = mongoose.model('papeis-usuarios', papelUsuarioSchema);

module.exports = papeisUsuariosModel;
