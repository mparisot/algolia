const Sequelize = require('sequelize');

const { sequelize } = require('../DbManager');

const Actor = sequelize.define('Actor', {
    actorId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    facet: {
        type: Sequelize.STRING,
    },
});

module.exports = Actor;