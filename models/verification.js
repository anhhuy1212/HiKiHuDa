const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');
const Model = Sequelize.Model;


const verification = db.define('verification', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    verify_token: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});

module.exports = verification;