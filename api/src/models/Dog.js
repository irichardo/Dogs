const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      primaryKey:true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height:{
      type: DataTypes.STRING,
      allowNull: false
    }

  }, {timeStamps:true,
      createdAt:false,
      updatedAt:false});
};
