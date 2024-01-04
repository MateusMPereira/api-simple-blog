const mongoose = require('mongoose');
const ComentarioArtigo = require('../models/comentariosArtigosModel');
const express = require('express');
const authMiddleware = require('../middlewares/basicAuthMiddleware');
const comentariosArtigosRouter = express.Router();

const listarComentariosArtigos = async (req, res) => {
  try {
    const comentarios = await ComentarioArtigo.find();

    if (!comentarios) {
      return res.status(404).send('Comentário de artigo não encontrado.');
    }

    res.json(comentarios);
  } catch (error) {
    console.error('Erro ao listar comentários de artigos: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const obterComentarioArtigo = async (req, res) => {
  try {
    const comentarioId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(comentarioId)) {
      return res.status(400).send('ID de comentário de artigo inválido.');
    }

    const comentario = await ComentarioArtigo.findById(comentarioId);

    if (!comentario) {
      return res.status(404).send('Comentário de artigo não encontrado.');
    }

    res.json(comentario);
  } catch (error) {
    console.error('Erro ao obter comentário de artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const criarComentarioArtigo = async (req, res) => {
  try {
    const novoComentario = req.body;

    if (!novoComentario.usuario || !novoComentario.comentarioOrigem || !novoComentario.comentario) {
      return res.status(400).send('Campos obrigatórios não preenchidos.');
    }

    const comentarioCriado = await ComentarioArtigo.create(novoComentario);

    res.status(201).json({ message: 'Comentário de artigo criado com sucesso', comentario: comentarioCriado });
  } catch (error) {
    console.error('Erro ao criar comentário de artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const atualizarComentarioArtigo = async (req, res) => {
  try {
    const comentarioId = req.params.id;
    const dadosAtualizados = req.body;

    if (!mongoose.Types.ObjectId.isValid(comentarioId)) {
      return res.status(400).send('ID de comentário de artigo inválido.');
    }

    const comentarioExistente = await ComentarioArtigo.findById(comentarioId);

    if (!comentarioExistente) {
      return res.status(404).send('Comentário de artigo não encontrado.');
    }

    const comentarioAtualizado = await ComentarioArtigo.findByIdAndUpdate(comentarioId, dadosAtualizados, { new: true });

    res.json({ message: `Comentário de artigo ${comentarioId} atualizado com sucesso`, comentario: comentarioAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar comentário de artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const deletarComentarioArtigo = async (req, res) => {
  try {
    const comentarioId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(comentarioId)) {
      return res.status(400).send('ID de comentário de artigo inválido.');
    }

    const comentarioExistente = await ComentarioArtigo.findById(comentarioId);

    if (!comentarioExistente) {
      return res.status(404).send('Comentário de artigo não encontrado.');
    }

    await ComentarioArtigo.findByIdAndDelete(comentarioId);

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir comentário de artigo: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

comentariosArtigosRouter.get('/', authMiddleware, listarComentariosArtigos);
comentariosArtigosRouter.get('/:id', authMiddleware, obterComentarioArtigo);
comentariosArtigosRouter.post('/', authMiddleware, criarComentarioArtigo);
comentariosArtigosRouter.put('/:id', authMiddleware, atualizarComentarioArtigo);
comentariosArtigosRouter.delete('/:id', authMiddleware, deletarComentarioArtigo);

module.exports = comentariosArtigosRouter;
