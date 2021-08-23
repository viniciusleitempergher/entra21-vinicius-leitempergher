const usuariosServices = require("../services/usuariosServices");

async function getAll(req, res, next) {
    try {
        const usuarios = await usuariosServices.getUsuarios();

        res.json(usuarios);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function getOne(req, res, next) {
    try {
        const usuario = await usuariosServices.getUsuario(req.params.id);

        res.json(usuario);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function create(req, res, next) {
    try {
        const usuario = await usuariosServices.createUsuario(req.body);

        res.json(usuario);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const usuario = await usuariosServices.updateUsuario(req.params.id. req.body);

        res.json(usuario);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        await usuariosServices.removeUsuario(req.params.id);

        res.status(204).end();
    } catch (err) {
        console.log(err);
        next(err);
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}