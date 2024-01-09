const mongoose = require('mongoose');
const UsuariosModel = require('../models/usuariosModel');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuariosModel.find();

    if (!usuarios) {
      return res.status(404).send('Usuário não encontrado.');
    }

    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const obterUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
      return res.status(400).send('ID de usuário inválido.');
    }

    const usuario = await UsuariosModel.findById(usuarioId);

    if (!usuario) {
      return res.status(404).send('Usuário não encontrado.');
    }

    res.json(usuario);
  } catch (error) {
    console.error('Erro ao obter usuário: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const criarUsuario = async (req, res) => {
  try {
    const novoUsuario = req.body;

    if (!novoUsuario.nome || !novoUsuario.sobrenome || !novoUsuario.dataNascimento || !novoUsuario.email || !novoUsuario.senha || !novoUsuario.usuario || !novoUsuario.role || !novoUsuario.categoriaFavorita || !novoUsuario.foto) {
      return res.status(400).send('Campos obrigatórios não preenchidos.');
    }

    const usuarioCriado = await UsuariosModel.create(novoUsuario);

    res.status(201).json({ message: 'Usuário criado com sucesso', usuario: usuarioCriado });
  } catch (error) {
    console.error('Erro ao criar usuário: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const dadosAtualizados = req.body;

    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
      return res.status(400).send('ID de usuário inválido.');
    }

    const usuarioExistente = await UsuariosModel.findById(usuarioId);

    if (!usuarioExistente) {
      return res.status(404).send('Usuário não encontrado.');
    }

    const usuarioAtualizado = await UsuariosModel.findByIdAndUpdate(usuarioId, dadosAtualizados, { new: true });

    res.json({ message: `Usuário ${usuarioId} atualizado com sucesso`, usuario: usuarioAtualizado });
  } catch (error) {
    console.error('Erro ao atualizar usuário: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const deletarUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
      return res.status(400).send('ID de usuário inválido.');
    }

    const usuarioExistente = await UsuariosModel.findById(usuarioId);

    if (!usuarioExistente) {
      return res.status(404).send('Usuário não encontrado.');
    }

    await Usuario.findByIdAndDelete(usuarioId);

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir usuário: ', error);
    res.status(500).send('Erro interno do servidor.');
  }
};

const usuariosController = {
  listarUsuarios,
  obterUsuario,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario
};

module.exports = usuariosController;
