const {DataTypes} = require('sequelize');
//const {Sequelize} = require('sequelize');

module.exports = (sequelize) =>{

   sequelize.define('temperaments',{
      
      id:{
        type: DataTypes.UUID,//Uso un uuid Para que los ids no colision
        defaultValue: DataTypes.UUIDV4,//Uso un id para que los ids no hagan colision
        allowNull:false,
        primaryKey:true
      },

      name:{
        type: DataTypes.STRING,
        allowNull:true
      }


   },{timeStamps:false,
      createdAt:false,
      updatedAt:false}
   );}