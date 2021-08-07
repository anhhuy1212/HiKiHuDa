const { Sequelize, DataTypes } = require('sequelize');
const rap = require('./rap');
const phim = require('./phim');

const db = require('./db');


const suatchieu = db.define('suatchieu',{
    batdau:{
        type:DataTypes.STRING,
         allowNull:false,
    },
    ketthuc:{
        type:DataTypes.STRING,
         allowNull:true,
    },
    ngaychieu:{
        type:DataTypes.DATE,
        allowNull:true,
    }
    ,
    maphong:{
        type:DataTypes.INTEGER,
        allowNull:true,
    }
});

rap.hasMany(suatchieu);
suatchieu.belongsTo(rap);


phim.hasMany(suatchieu);
suatchieu.belongsTo(phim);


suatchieu.findBysuatchieu= async function(id){
    return suatchieu.findByPk(id);
}

suatchieu.suatchieungay = async function(date){ 
    return suatchieu.findAll(
        {
            
            where: { ngaychieu: date},
          
    });
}
suatchieu.deletesc = async function(id){ 
    return suatchieu.destroy(
        {
            
            where: { id: id},
          
    });
}
suatchieu.allsuatchieu = async function(){ 
    return suatchieu.findAll(
        {
            include: 
        [
        {
             association: "phim",       
        },{
            association: "rap",      
        }
        ], 
            
          
    });
}
suatchieu.getallsuatchieu = async function (id,nc) {
    return suatchieu.findAll({
        where:{ngaychieu: nc,rapId:id},
        include: 
        [
        {
             association: "phim",       
        }
        ], 
         
    });
}
suatchieu.getallsuatchieutheophim = async function (id,idphim) {
    return suatchieu.findAll({
        where:{ngaychieu: '2021-07-04',rapId:id,phimId:idphim},
        include: 
        [
        {
            association: "phim",       
        }
        ], 
         
    });
}

module.exports = suatchieu
