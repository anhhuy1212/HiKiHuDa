const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');
const datcho = require('./datcho');
const suatchieu = require('./suatchieu');
const rap = require('./rap');
const phim = require('./phim');
const ve = db.define('ve',{
    mave: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:false,
    },
    maghe:{
        type:DataTypes.STRING,
        primaryKey: true,
        allowNull:false,
    },
    giatien:{
        type:DataTypes.INTEGER,
        allowNull:true,
    },
});

datcho.hasMany(ve);
ve.belongsTo(datcho);

ve.getsuatchieu = async function (id) {
    return ve.findAll({
        include: [{
        model: datcho,
        where: {
            suatchieuId: id,
          },
        include: [{
            model: suatchieu,
            
            
        }],
        }],
       
    });
}
ve.getlichsu = async function (id, madatcho) {
    return ve.findAll({
        include: 
        [{
            association: "datcho",
                where: {
                    nguoidungId: id,
                    madatcho:madatcho,
                }, 
                include: 
                [{
                    association: "suatchieu",
                        include: [{
                            association: "rap",
                            
                        },{
                            association: "phim",
                            
                        }
                    ],               
                       
                        
                }], 
        }], 
         
    });
}

ve.addticket= async function(user, showtime, date,  totalprice){
    return ve.create(
        {
            mave: user, datchoMadatcho: showtime, maghe: date, giatien:totalprice
    });
}
const Op = Sequelize.Op;
ve.doanhthurap = async function(){
    return ve.findAll(
        { 
            attributes: [[Sequelize.fn('count', Sequelize.col('mave')), 'count'],[Sequelize.fn('sum', Sequelize.col('tongtien')), 'total'],'datcho->suatchieu->rap.id'],
            include: [{
                association: 'datcho',
                where:{
                    "thoigiandat" : {[Op.between] : ['2021-07-09' , '2021-07-21' ]}
                },
                include: [{
                    association: 'suatchieu',
                    
                include: [{
                    association: 'rap',
                    include: [{
                        association: 'cumrap',
                       where:{id:1},
                    }]
                }],
               
                }]
                
            }],
            group : ['datcho.madatcho','datcho->suatchieu.id','datcho->suatchieu->rap.id','datcho->suatchieu->rap->cumrap.id'],
           
    });
}
module.exports=ve;

