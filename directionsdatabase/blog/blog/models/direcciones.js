'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Direcciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Direcciones.init({
    Nombre: DataTypes.STRING,
    Apellidos: DataTypes.STRING,
    TelefonoCasa: DataTypes.STRING,
    DireccionCasa: DataTypes.TEXT,
    TelefonoTrabajo: DataTypes.STRING,
    DireccionTrabajo: DataTypes.TEXT,
    CorreoElectronico: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Direcciones',
  });
  return Direcciones;
};