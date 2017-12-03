const Sequelize = require('sequelize');
const winston = require('winston');

const { sequelize } = require('../DbManager');
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
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
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

const AlternativeTitle = sequelize.define('AlternativeTitles', {
    title: {
        type: Sequelize.STRING,
    }
}, {
    timestamps: false,
    name: {
        singular: 'alternative_title',
        plural: 'alternative_titles'
    }
});

Movie.hasMany(AlternativeTitle, {
    onDelete: 'cascade',
    foreignKey: 'movieId',
});

AlternativeTitle.belongsTo(Movie, {
    onDelete: 'cascade',
    foreignKey: 'movieId',
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

module.exports = {
    Movie,
    MoviesGenres,
    AlternativeTitle,
};