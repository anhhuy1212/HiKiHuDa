const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');


const phim = db.define('phim', {
    ten: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    chitiet: {
        type: DataTypes.STRING(3000),
        allowNull: false,
    },
    thoiluong: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    ,
    poster: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    ,
    theloai: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    ,
    ngaycongchieu: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    category: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image2: {
        type: DataTypes.STRING,
        allowNull: true,
    }
    ,
    image2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    trailer: {
        type: DataTypes.STRING(2000),
        allowNull: true,
    }
});



phim.allphim = async function () {
    return phim.findAll(
        {

        });
}

phim.listphim = async function (to,from) {
    return phim.findAll(
        {
            where:{
                "ngaycongchieu" : {[Op.between] : [to,from ]}
            }
        });
}

phim.chitiet = async function (idphim) {
    return phim.findAll(
        {
            where: { id: idphim }
        });
}


const Op = Sequelize.Op;

phim.timkiemten = async function (tenphim) {
    return phim.findAll(
        {
            where: { ten: { [Op.like]: '%' + tenphim + '%' } }
        });
}
phim.dangchieu = async function () {
    return phim.findAll(
        {
            where: { category: 1 }
        });
}
phim.sapchieu = async function () {
    return phim.findAll(
        {
            where: { category: 2 }
        });
}
phim.timkiem = async function (idphim) {
    return phim.findAll(
        {
            where: { id: idphim }
        });
}



phim.getPhim = async function (id,nc,idcum) {
    return phim.findOne(
        {
           
            include: [
                {
                    association: 'suatchieus',
                    where: {
                        ngaychieu: nc,
                    },
                    include: [{
                        association: 'rap', where: {
                            cumrapId: idcum
                        },
                        include: {
                            association: 'cumrap', 
                            cumrapId: idcum
                        } 
                    }
                    ]
                },

            ],
            where: {
                id: id
            }
        });
}

phim.getPhimcumrap2 = async function (id,nc) {
    return phim.findOne(
        {
           
            include: [
                {
                    association: 'suatchieus',
                    where: {
                        ngaychieu: nc,
                        
                    },
                    include: [{
                        association: 'rap', where: {
                            cumrapId: 2
                            
                        },
                        
                        include: {
                            association: 'cumrap', 
                        }
                        
                    }
                    ]
                },

            ],
            where: {
                id: id
            }
        });
}
phim.top4 = async function () {
    return phim.findAll(
        {
            where: { category: 1 },
            order: [[Sequelize.col('id'),'DESC']],
            limit: 4
        });
}
 
module.exports = phim;
