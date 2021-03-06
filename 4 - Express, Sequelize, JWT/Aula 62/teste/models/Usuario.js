const { DataTypes, Sequelize, Model } = require("sequelize");
const bcrypt = require("bcrypt");

class Usuario extends Model {
    static init(sequelize) {
        super.init({
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
        }, { sequelize });
    }

    static associate(models) {
        this.belongsToMany(models.Projeto, {
            through: "UsuariosProjetos",
            as: {
                singular: "projeto",
                plural: "projetos"
            }
        });
        this.hasOne(models.Endereco, {
            foreignKey: {
                name: "idUsuario",
                allowNull: false
            }
        });
    }

    checarSenha(senha) {
        return bcrypt.compareSync(senha, this.senha);
    }
}
module.exports = Usuario;