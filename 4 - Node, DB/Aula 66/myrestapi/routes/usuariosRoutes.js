const express = require('express');
const router = express.Router();

router.put("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não foi encontrado!" });
        }

        const usuarioAtualizado = req.body;

        Object.assign(usuario, usuarioAtualizado);

        await usuario.save();

        res.json(usuario);
    } catch (error) {
        res.status(400).json({ message: "Ocorreu um erro" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const usuario = await Usuario.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!usuario) {
            return res.status(404).json({ message: "Usuário não foi encontrado!" });
        }

        await usuario.destroy();

        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: "Ocorreu um erro" });
    }
});

router.get("/:id", async (req, res) => {

});

router.get("/", async (req, res) => {

})

router.post("/", async (req, res) => {
    const body = req.body;

    try {
        const usuario = await Usuario.create(body);
        res.json(usuario);
    } catch (e) {
        res.status(400).json({ message: "Ocorreu um erro" });
    }
});

module.exports = router;