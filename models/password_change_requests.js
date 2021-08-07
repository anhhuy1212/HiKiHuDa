const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');


const password_change_requests = db.define('password_change_requests', {
    email: {
        type: DataTypes.STRING,
        primaryKey: false,
    },
    verify_token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token_expires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
});

module.exports = password_change_requests;