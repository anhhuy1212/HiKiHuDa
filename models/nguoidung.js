const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');
const Model = Sequelize.Model;


const nguoidung = db.define('nguoidung', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    matkhau: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hoten: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    sdt: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    diachi: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    vaitro: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isverify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,

    }

});
nguoidung.profile=async  function(iduser){ 
    return nguoidung.findAll(
        {
            where: { id: iduser }
    });
}
nguoidung.updateuser=async function(iduser,name,email,sdt,diachi){ 
    return nguoidung.update({hoten: name, email:email, sdt:sdt,diachi:diachi},{
        where: {
            id: iduser

        }
    })
}
module.exports = nguoidung;