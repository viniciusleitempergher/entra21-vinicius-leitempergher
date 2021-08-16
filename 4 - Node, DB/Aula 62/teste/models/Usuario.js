const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../database");

const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "Email inválido :C"
            }
        },
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('senha', bcrypt.hashSync(value, 10))
        }
    }
},
    // {
    //     tableName: "usuarios",
    //     underscored: true,
    // }
);

(async () => {
    // Criando a tabela Usuário
    try {
        await Usuario.sync({ force: true });
        console.log("tabela Usuario criada com sucesso!");

        // Inserindo um usuario
        const pedro = await Usuario.create({
            nome: "Pedro",
            email: "pedro@gmail.com",
            senha: "123456",
        });
        console.log("Usuário criado!!!");
        console.log(pedro.toJSON());

        // Modificar pedro
        pedro.email = "pedrao@email.com";
        await pedro.save();
        console.log("Email do pedro atualizado! ");

        // Remover pedro :C
        await pedro.destroy();
        console.log("Pedro destruído.");

        // Inserindo vários usuários
        const usuarios = await Usuario.bulkCreate([
            {
                nome: "Pedro",
                email: "pedro@email.com",
                senha: "123456",
            },
            {
                nome: "José",
                email: "jose@email.com",
                senha: "123456",
            }
        ])
        console.log("Múltiplos usuários inseridos com sucesso!");
        usuarios.forEach(usuario => console.log(usuario.toJSON()));
        
        console.log(bcrypt.compareSync('123456', usuarios[0].toJSON().senha));
    } catch (e) {
        console.error("\n\nErro ao criar a tabela Usuário: \n\n" + e);
    } finally {
        sequelize.close();
    }
})();