const Sequelize = require('sequelize');
const winston = require('winston');

const { sequelize } = require('../DbManager');

const Genre = sequelize.define('Genre', {
    genreId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Genre;