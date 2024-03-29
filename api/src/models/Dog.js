const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      /* defaultValue: DataTypes.UUIDV4 */
      primaryKey:true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    height:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    weight:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    indb:{
      type: DataTypes.BOOLEAN,
      defaultValue:true
    }
  }, {timeStamps:true,
      createdAt:false,
      updatedAt:false});
};
