const mongoose = require('mongoose');
const PapeisUsuariosModel = require('../models/papeisUsuariosModel');
const express = require('express');
const papeisUsuariosRouter = express.Router();
const authMiddleware = require('../middlewares/basicAuthMiddleware');

const listarPapeisUsuarios = async (req, res) => {
  try {
    const papeisUsuarios = await PapeisUsuariosModel.find();

    if (!papeisUsuarios) {
      return res.status(404).send('Papel de usuário não encontrado.');
    }

    res.json(papeisUsuarios);
  } catch (error) {
    console.error('Erro ao listar papéis de usuários: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const obterPapelUsuario = async (req, res) => {
  try {
    const papelUsuarioId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(papelUsuarioId)) {
      return res.status(400).send('ID de papel de usuário inválido.');
    }

    const papelUsuario = await PapeisUsuariosModel.findById(papelUsuarioId);

    if (!papelUsuario) {
      return res.status(404).send('Papel de usuário não encontrado.');
    }

    res.json(papelUsuario);
  } catch (error) {
    console.error('Erro ao obter papel de usuário: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const criarPapelUsuario = async (req, res) => {
  try {
    const novoPapelUsuario = req.body;

    if (!novoPapelUsuario.role) {
      return res.status(400).send('Nome do papel de usuário é obrigatório.');
    }

    const papelUsuarioCriado = await PapeisUsuariosModel.create(novoPapelUsuario);

    res.status(201).json({ message: 'Papel de usuário criado com sucesso', papelUsuario: papelUsuarioCriado });
  } catch (error) {
    console.error('Erro ao criar papel de usuário: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const atualizarPapelUsuario = async (req, res) => {
  try {
    const papelUsuarioId = req.params.id;
    const dadosAtualizados = req.body;

    if (!mongoose.Types.ObjectId.isValid(papelUsuarioId)) {
      return res.status(400).send('ID de papel de usuário inválido.');
    }

    const papelUsuarioExistente = await PapeisUsuariosModel.findById(papelUsuarioId);

    if (!papelUsuarioExistente) {
      return res.status(404).send('Papel de usuário não encontrado.');
    }

    const papelUsuarioAtualizado = await PapeisUsuariosModel.findByIdAndUpdate(papelUsuarioId, dadosAtualizados, { new: true });

    res.json({ message: `Papel de usuário ${papelUsuarioId} atualizado com sucesso`, papelUsuario: papelUsuarioAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar papel de usuário: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const deletarPapelUsuario = async (req, res) => {
  try {
    const papelUsuarioId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(papelUsuarioId)) {
      return res.status(400).send('ID de papel de usuário inválido.');
    }

    const papelUsuarioExistente = await PapeisUsuariosModel.findById(papelUsuarioId);

    if (!papelUsuarioExistente) {
      return res.status(404).send('Papel de usuário não encontrado.');
    }

    await PapeisUsuariosModel.findByIdAndDelete(papelUsuarioId);

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir papel de usuário: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

papeisUsuariosRouter.get('/', authMiddleware, listarPapeisUsuarios);
papeisUsuariosRouter.get('/:id', authMiddleware, obterPapelUsuario);
papeisUsuariosRouter.post('/', authMiddleware, criarPapelUsuario);
papeisUsuariosRouter.put('/:id', authMiddleware, atualizarPapelUsuario);
papeisUsuariosRouter.delete('/:id', authMiddleware, deletarPapelUsuario);

module.exports = papeisUsuariosRouter;
