const { DataTypes, Model } = require("sequelize");

class Endereco extends Model {
    static init(sequelize) {
        super.init({
            rua: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            numero: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 1,
                },
            },
        }, { sequelize });
    }

    static associate(models) {
        this.belongsTo(models.Usuario, {
            foreignKey: {
                name: "idUsuario",
                type: DataTypes.UUID,
                allowNull: false,
            }
        });
    }
}

module.exports = Endereco;