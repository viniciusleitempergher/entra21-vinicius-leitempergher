'use strict';
const {
  Model, Sequelize, UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Endereco, {
        foreignKey: "id_usuario",
        as: "endereco"
      });
      this.belongsToMany(models.Projeto, {
        through: "usuarios_projetos",
        foreignKey: 'id_usuario',
        as: "projeto"
      });
    }
  };
  Usuario.init({
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};