const sequelize = require("./database");

const { Usuario } = sequelize.models;

const { Op } = require("sequelize");

(async () => {

    try {
        // Criando todas as tabelas
        await sequelize.sync({ force: true });

        // Criando a tabela Usuário
        //     await Usuario.sync({ force: true });
        //     console.log("tabela Usuario criada com sucesso!");

        // Inserindo um usuario
        const pedro = await Usuario.create({
            nome: "Pedro",
            email: "pedrin@gmail.com",
            senha: "123456",
        });
        console.log("Usuário criado!!!");
        console.log(pedro.toJSON());

        // Criando um projeto
        // const projeto = await Projeto.create({
        //     nome: "Projeto Verão 2021",
        //     quantidadeHoras: 60,
        // })

        // await projeto.addUsuario(pedro);

        //     // Modificar pedro
        //     pedro.email = "pedrao@email.com";
        //     await pedro.save();
        //     console.log("Email do pedro atualizado! ");

        //     // Remover pedro :C
        //     await pedro.destroy();
        //     console.log("Pedro destruído.");

        // // Criando um endereço
        // await Endereco.create({
        //     rua: "Rua 01",
        //     numero: 123,
        //     idUsuario: pedro.id,
        // });

        //     // Inserindo vários usuários
        //     const usuarios = await Usuario.bulkCreate([
        //         {
        //             nome: "Pedro",
        //             email: "pedro@email.com",
        //             senha: "123456",
        //         },
        //         {
        //             nome: "José",
        //             email: "jose@email.com",
        //             senha: "123456",
        //         }
        //     ])
        //     console.log("Múltiplos usuários inseridos com sucesso!");
        //     usuarios.forEach(usuario => console.log(usuario.toJSON()));

        //     // Comparando registros
        //     console.log(bcrypt.compareSync('123456', usuarios[0].toJSON().senha));

        //     // Selecionando Registros
        //     const todosUsuarios = await Usuario.findAll();
        //     console.log(todosUsuarios);

        //     const algunsUsuarios = await Usuario.findAll({
        //         where: {
        //             nome: {
        //                 [Op.iLike]: "p%"
        //             }
        //         }
        //     });
        //     console.log(algunsUsuarios);

        //     // Selecionando um registro
        //     const pedroSelected = await Usuario.findOne({
        //         where: {
        //             nome: "Pedro"
        //         }
        //     })

        //     console.log(pedroSelected.toJSON());

        // Selecionando pela PK
        // const jose = await Usuario.findByPk("04d507e9-7aea-4067-90c0-085153cea116");
        // console.log(jose.toJSON()); 

    } catch (e) {
        console.error("\n\nErro ao criar a tabela Usuário: \n\n" + e);
    } finally {
        sequelize.close();
    }
})();