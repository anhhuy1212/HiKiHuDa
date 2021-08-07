const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');
const cumrap = require('./cumrap');

const rap = db.define('rap',{
    ten:{
        type:DataTypes.STRING,
         allowNull:false,
    },   
    loairap:{
        type:DataTypes.STRING,
         allowNull:false,
    }, 
    chieungang:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    chieudoc:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },  
    image:{
        type:DataTypes.STRING,
         allowNull:true,
    },
    map:{
        type:DataTypes.STRING,
         allowNull:true,
    }
});
cumrap.hasMany(rap);
rap.belongsTo(cumrap);

rap.lstrap = async function(id){
    return rap.findAll(
        {
          where:{cumrapId:id}
    });
}

rap.lrap = async function(){
    return rap.findAll(
        {
          where:{}
    });
}
const Op = Sequelize.Op;

rap.updaterap= async function(id){
    return rap.update({cumrapId: null}, { // Update album instance with data sent from request
            where: { cumrapId: id }}
    );
}
rap.timrap = async function (id) {
    return rap.findAll(
        {
            where:{
                id:id
            }
        });
}
module.exports=rap;
