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

function createTables(...models) { // TODO use the migration feature from sequelize instead
    models.forEach(model => {
        model.sync().then(() => {
            winston.info('Table created', { modelName: model.name });
        }).catch(err => {
            winston.info('Error when creating table', { error: err.errors, modelName: model });
        });
    })
}

module.exports = {
    sequelize,
    createTables,
};