const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');
const suatchieu = require('./suatchieu');
const rap = require('./rap');
const phim = require('./phim');
const nguoidung = require('./nguoidung');
const ve = require('./ve');
const Op = Sequelize.Op;
const datcho = db.define('datcho', {
    madatcho: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    thoigiandat: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    tongtien: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});


suatchieu.hasMany(datcho);
datcho.belongsTo(suatchieu);

nguoidung.hasMany(datcho);
datcho.belongsTo(nguoidung);



datcho.adddatcho= async function(user, showtime, date,  totalprice,price){
    return datcho.create(
        {
            madatcho: user,  thoigiandat:totalprice, tongtien: price, suatchieuId: date, nguoidungId: showtime
    });
}
datcho.listdatcho = async function(id){
    return datcho.findAll(
        {
            where: { nguoidungId: id},
            order: [
                ['thoigiandat', 'DESC'],
            ]
    });
}

datcho.doanhthurap = async function(to,from){
    return datcho.findAll(
        {
           
            
            include: {
                model: suatchieu,
                include:{
                   model: rap,      
                  
                }
            },
            // nó chỉ nhận điều kiện dưới đây chứu ko nahanj điều kiện ở trên
            where:{
                "thoigiandat" : {[Op.between] : [to,from ]}
            },
            group : ['datcho.madatcho','suatchieu.id','suatchieu->rap.id'],
         
    });
}

datcho.doanhthuphim = async function(to,from){
    return datcho.findAll(
        {
           
            
            include: {
                model: suatchieu,
                include:{
                   model: phim,      
                  
                }
            },
            // nó chỉ nhận điều kiện dưới đây chứu ko nahanj điều kiện ở trên
            where:{
                "thoigiandat" : {[Op.between] : [to,from ]}
            },
            group : ['datcho.madatcho','suatchieu.id','suatchieu->phim.id'],
         
    });
}

datcho.updatesc= async function(id){
    return datcho.update({suatchieuId: null}, { // Update album instance with data sent from request
            where: { suatchieuId: id }}
    );
}
module.exports = datcho;