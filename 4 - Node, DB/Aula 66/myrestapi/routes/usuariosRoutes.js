const express = require('express');

const usuariosControllers = require('../controllers/usuariosControllers');

const usuariosValidations = require('../validations/usuariosValidations');

const router = express.Router();

router.put("/:id", usuariosValidations.put, usuariosControllers.update);

router.delete("/:id", usuariosControllers.remove);

router.get("/:id", usuariosValidations.get, usuariosControllers.getOne);

router.get("/", usuariosControllers.getAll);

router.post("/", usuariosValidations.post, usuariosControllers.create);

module.exports = router;