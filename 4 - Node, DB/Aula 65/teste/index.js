const { sequelize } = require("./db/models");

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexão bem sucedida!");
    } catch (error) {
        console.error("\n Erro :C \n\n" + error);
    } finally {
        sequelize.close();
    }
})();