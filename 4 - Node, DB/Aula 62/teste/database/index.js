require("dotenv").config();

const { Sequelize } = require("sequelize");

const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig);

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