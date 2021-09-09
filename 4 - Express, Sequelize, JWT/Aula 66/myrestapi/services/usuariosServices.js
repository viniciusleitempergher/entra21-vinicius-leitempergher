const { Usuario } = require("../db/models");
const createError = require("http-errors");


async function getUsuarios() {
    const usuarios = await Usuario.findAll();
    return usuarios;
};

async function getUsuario(id) {
    const usuario = await Usuario.findOne({
        where: {
            id
        }
    });

    if (!usuario) {
        throw createError(404, "Usuário não encontrado!");
    }

    return usuario;
};

async function createUsuario(newUser) {
    const [user, userCreated] = await Usuario.findOrCreate({
        where: { email: newUser.email },
        defaults: newUser
    });

    if (!userCreated) throw createError(409, "Usuário já cadastrado!");

    return user;
};

async function updateUsuario(id, usuarioAtualizado) {
    const usuario = await Usuario.findOne({
        where: {
            id
        }
    });

    if (!usuario) {
        throw new createError(404, "Usuário não existe!");
    }

    Object.assign(usuario, usuarioAtualizado);

    await usuario.save();

    return usuario;
};

async function removeUsuario(id) {
    const user = await Usuario.findOne({
        where: {
            id
        }
    });

    if (!user) throw new createError(404, "Usuário não existe!");

    await user.destroy();
};

module.exports = {
    getUsuario,
    getUsuarios,
    createUsuario,
    updateUsuario,
    removeUsuario
}