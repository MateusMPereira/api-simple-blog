const mongoose = require('mongoose');
const CategoriaArtigo = require('../models/categoriasArtigosModel');

const get = async (req, res) => {
  res.json({message: 'Hello World! From Get'});
};

const post = async (req, res) => {
  res.json({message: 'Hello World! From Post'});
};

const testeController = {
    get,
    post
};

module.exports = testeController;