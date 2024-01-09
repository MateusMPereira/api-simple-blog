const mongoose = require('mongoose');
const CategoriaArtigo = require('../models/categoriasArtigosModel');

const listarCategoriasArtigos = async (req, res) => {
  try {
    const categorias = await CategoriaArtigo.find();

    if (!categorias) {
      return res.status(404).send('Categoria de artigo não encontrada.');
    }

    res.json(categorias);
  } catch (error) {
    console.error('Erro ao listar categorias de artigos: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const obterCategoriaArtigo = async (req, res) => {
  try {
    const categoriaId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(categoriaId)) {
      return res.status(400).send('ID de categoria de artigo inválido.');
    }

    const categoria = await CategoriaArtigo.findById(categoriaId);

    if (!categoria) {
      return res.status(404).send('Categoria de artigo não encontrada.');
    }

    res.json(categoria);
  } catch (error) {
    console.error('Erro ao obter categoria de artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const criarCategoriaArtigo = async (req, res) => {
  try {
    const novaCategoria = req.body;

    if (!novaCategoria.nome) {
      return res.status(400).send('Nome da categoria é obrigatório.');
    }

    const categoriaCriada = await CategoriaArtigo.create(novaCategoria);

    res.status(201).json({ message: 'Categoria de artigo criada com sucesso', categoria: categoriaCriada });
  } catch (error) {
    console.error('Erro ao criar categoria de artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const atualizarCategoriaArtigo = async (req, res) => {
  try {
    const categoriaId = req.params.id;
    const dadosAtualizados = req.body;

    if (!mongoose.Types.ObjectId.isValid(categoriaId)) {
      return res.status(400).send('ID de categoria de artigo inválido.');
    }

    const categoriaExistente = await CategoriaArtigo.findById(categoriaId);

    if (!categoriaExistente) {
      return res.status(404).send('Categoria de artigo não encontrada.');
    }

    const categoriaAtualizada = await CategoriaArtigo.findByIdAndUpdate(categoriaId, dadosAtualizados, { new: true });

    res.json({ message: `Categoria de artigo ${categoriaId} atualizada com sucesso`, categoria: categoriaAtualizada });
  } catch (error) {
    console.error('Erro ao atualizar categoria de artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const deletarCategoriaArtigo = async (req, res) => {
  try {
    const categoriaId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(categoriaId)) {
      return res.status(400).send('ID de categoria de artigo inválido.');
    }

    const categoriaExistente = await CategoriaArtigo.findById(categoriaId);

    if (!categoriaExistente) {
      return res.status(404).send('Categoria de artigo não encontrada.');
    }

    await CategoriaArtigo.findByIdAndDelete(categoriaId);

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir categoria de artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const categoriasArtigosController = {
  listarCategoriasArtigos,
  obterCategoriaArtigo,
  criarCategoriaArtigo,
  atualizarCategoriaArtigo,
  deletarCategoriaArtigo
};

module.exports = categoriasArtigosController;
