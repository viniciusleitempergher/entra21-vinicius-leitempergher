const { sequelize, Usuario } = require("./db/models");

(async () => {
    try {
        await sequelize.sync({ force: true });

        await sequelize.authenticate();
        console.log("Conexão bem sucedida!");

        // Inserindo um usuário
        const pedro = await Usuario.create({
            nome: "Pedro",
            email: "pedro@email.com",
            senha: "123456"
        });

        console.log("Usuário criado com sucesso!");

        // Inserindo um endereço
        await pedro.createEndereco({
            rua: "Rua 01",
            numero: 123
        });
        console.log();

        // Inserindo um Projeto
        await pedro.createProjeto({
            nome: "Projeto 01",
            quantidadeHoras: 10
        });
        console.log("Projeto criado com sucesso!");
    } catch (error) {
        console.error("\n Erro :C \n\n" + error);
    } finally {
        sequelize.close();
    }
})();