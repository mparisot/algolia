const Sequelize = require('sequelize');
const winston = require('winston');

const sequelize = require('../DbManager');
const Genre = require('../genres/GenreModel');

const Movie = sequelize.define('Movie', {
    objectID: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

const MoviesGenres = sequelize.define('MoviesGenres', {
    genreId: {
        type: Sequelize.STRING,
    },
    movieId: {
        type: Sequelize.STRING,
    }
}, {
    timestamps: false
});

Movie.belongsToMany(Genre, {
    through: {
        model: MoviesGenres,
        unique: false,
    },
    foreignKey: 'movieId',
    constraints: false
});
Genre.belongsToMany(Movie, {
    through: {
        model: MoviesGenres,
        unique: false
    },
    foreignKey: 'genreId',
    constraints: false
});

MoviesGenres.sync({force: true}).then(() => {
    winston.info('MoviesGenres table created');
}).catch(err => {
    winston.info('Error when creating MoviesGenres table', err);
});

Movie.sync({force: true}).then(() => {
    winston.info('Movie table created');
}).catch(err => {
    winston.info('Error when creating Movie table', err);
});

module.exports = Movie;