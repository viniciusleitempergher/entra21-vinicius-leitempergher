const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../database");

const Usuario = sequelize.define("Usuario", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('senha', bcrypt.hashSync(value, 10))
        }
    }
});

(async () => {
    // Criando a tabela Usuário
    try {
        await Usuario.sync({ force: true });
        console.log("tabela Usuario criada com sucesso!");
    } catch (e) {
        console.error("\n\nErro ao criar a tabela Usuário: \n\n" + e);
    } finally {
        sequelize.close();
    }
})();