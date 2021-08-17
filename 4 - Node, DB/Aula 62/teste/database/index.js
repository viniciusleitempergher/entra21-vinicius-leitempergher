require("dotenv").config();
const { Sequelize } = require("sequelize");
const dbConfig = require('../config/database');

const Usuario = require("../models/Usuario");
const Projeto = require("../models/Projeto");
const Endereco = require("../models/Endereco");

const sequelize = new Sequelize(dbConfig);

Usuario.init(sequelize);
Projeto.init(sequelize);
Endereco.init(sequelize);

// Definindo as associações dos models
Usuario.associate(sequelize.models);
Projeto.associate(sequelize.models);
Endereco.associate(sequelize.models);

module.exports = sequelize;

// Teste de conexão:
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log("Conexão bem sucedida!!!");
//     } catch (e) {
//         console.error("\n\nErro :::::CCCCC \n\n" + e);
//     } finally {
//         sequelize.close();
//     }
// })();