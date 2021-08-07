const { Sequelize } = require('sequelize');

module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:064c8f98@localhost:5432/hikihuda', {


    /* dialect: 'postgres',
    dialectOptions: { ssl: { rejectUnauthorized: false, } } */
    dialectOptions: {
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
        }
    },
});