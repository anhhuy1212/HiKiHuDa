const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');
const Model= Sequelize.Model;


const cumrap = db.define('cumrap',{
    ten:{
        type:DataTypes.STRING,
         allowNull:false,
    },
    diachi:{
        type:DataTypes.STRING,
         allowNull:false,
    },   
});
cumrap.listcumrap = async function(){
    return cumrap.findAll(
        {
          
    });
}
module.exports=cumrap;
