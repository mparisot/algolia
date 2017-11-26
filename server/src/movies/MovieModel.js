const Sequelize = require('sequelize');
const winston = require('winston');

const { sequelize, createTables } = require('../DbManager');
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
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
    constraints: false,
});
Genre.belongsToMany(Movie, {
    through: {
        model: MoviesGenres,
        unique: false
    },
    foreignKey: 'genreId',
    constraints: false,
});

createTables(MoviesGenres, Movie);

module.exports = {
    Movie,
    MoviesGenres
};