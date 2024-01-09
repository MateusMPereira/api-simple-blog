const mongoose = require('mongoose');
const ArtigosModel = require('../models/artigosModel');

const listarArtigos = async (req, res) => {
  try {
    const autor = req.query.autor;
    const dataCriacao = req.query.dataCriacao;
    const titulo = req.query.titulo;
    const categoria = req.query.categoria;

    let query = {};

    if (autor) {
      query.autor = new RegExp(autor, 'i');
    }

    if (dataCriacao) {
      query.dataCriacao = dataCriacao;
    }

    if (titulo) {
      query.titulo = new RegExp(titulo, 'i');
    }

    if (categoria) {
      query.categoria = categoria;
    }

    const artigos = await ArtigosModel.find(query);

    if (!artigos) {
      return res.status(404).send('Artigos não encontrados.');
    }

    res.json(artigos);
  } catch (error) {
    console.error('Erro ao obter artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const obterArtigo = async (req, res) => {
  try {
    const artigoId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(artigoId)) {
      return res.status(400).send('ID de artigo inválido.');
    }

    const artigo = await ArtigosModel.findById(artigoId);

    if (!artigo) {
      return res.status(404).send('Artigo não encontrado.');
    }

    res.json(artigo);
  } catch (error) {
    console.error('Erro ao obter artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const criarArtigo = async (req, res) => {
  try {
    const novoArtigo = req.body;

    if (!novoArtigo.titulo || !novoArtigo.conteudo || !novoArtigo.autor || !novoArtigo.dataCriacao || !novoArtigo.capa || !novoArtigo.categoria) {
      return res.status(400).send('Campos obrigatórios não preenchidos');
    }

    const artigoCriado = await ArtigosModel.create(novoArtigo);

    res.status(201).json({ message: 'Artigo criado com sucesso', artigo: artigoCriado });
  } catch (error) {
    console.error('Erro ao criar artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const atualizarArtigo = async (req, res) => {
  try {
    const artigoId = req.params.id;
    const dadosAtualizados = req.body;

    if (!mongoose.Types.ObjectId.isValid(artigoId)) {
      return res.status(400).send('ID de artigo inválido.');
    }

    const artigoExistente = await ArtigosModel.findById(artigoId);

    if (!artigoExistente) {
      return res.status(404).send('Artigo não encontrado.');
    }

    const artigoAtualizado = await ArtigosModel.findByIdAndUpdate(artigoId, dadosAtualizados, { new: true });

    res.json({ message: `Artigo ${artigoId} atualizado com sucesso`, artigo: artigoAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const deletarArtigo = async (req, res) => {
  try {
    const artigoId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(artigoId)) {
      return res.status(400).send('ID de artigo inválido.');
    }

    const artigoExistente = await ArtigosModel.findById(artigoId);

    if (!artigoExistente) {
      return res.status(404).send('Artigo não encontrado.');
    }

    await ArtigosModel.findByIdAndDelete(artigoId);

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const artigosController = {
  listarArtigos,
  obterArtigo,
  criarArtigo,
  atualizarArtigo,
  deletarArtigo
};

module.exports = artigosController;