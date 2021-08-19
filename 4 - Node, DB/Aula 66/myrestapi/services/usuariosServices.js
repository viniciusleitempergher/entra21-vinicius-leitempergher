const { Usuario } = require("../db/models");

async function getUsuarios() {
    const body = req.body;

    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (e) {
        res.status(400).json({ message: "Ocorreu um erro" });
    }
};

async function getUsuario(id) {
    try {
        const usuario = await Usuario.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não foi encontrado!" });
        }

        res.json(usuario);
    } catch (e) {
        res.status(400).json({ message: "Ocorreu um erro" });
    }
};

async function createUsuario(usuario) {

};

async function updateUsuario(usuarioAtualizado) {

};

async function removeUsuario(id) {

};

module.exports = {
    getUsuario,
    getUsuarios,
    createUsuario,
    updateUsuario,
    removeUsuario
}