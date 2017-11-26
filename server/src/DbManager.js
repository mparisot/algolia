const Sequelize = require('sequelize');
const winston = require('winston');

const sequelize = new Sequelize('movies', null, null, {
    dialect: 'sqlite',
    storage: './movies.sqlite',
    logging: msg => winston.info(msg),
});

sequelize
    .authenticate()
    .then(() => {
        winston.info('Connection has been established successfully.');
    })
    .catch(err => {
        winston.error('Unable to connect to the database:', { error: err.errors });
    });

module.exports = {
    sequelize,
};