const Sequelize = require('sequelize');

const { sequelize } = require('../DbManager');
const Genre = require('../genres/GenreModel');
const Actor = require('../actors/ActorModel');

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
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true,
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
    onDelete: 'cascade',
    foreignKey: 'movieId',
    constraints: false,
});
Genre.belongsToMany(Movie, {
    through: {
        model: MoviesGenres,
        unique: false
    },
    onDelete: 'cascade',
    foreignKey: 'genreId',
    constraints: false,
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

const MoviesActors = sequelize.define('MoviesActors', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    actorId: {
        type: Sequelize.STRING,
    },
    movieId: {
        type: Sequelize.STRING,
    }
}, {
    timestamps: false
});

Movie.belongsToMany(Actor, {
    through: {
        model: MoviesActors,
        unique: false,
    },
    onDelete: 'cascade',
    foreignKey: 'movieId',
    constraints: false,
});
Actor.belongsToMany(Movie, {
    through: {
        model: MoviesActors,
        unique: false
    },
    onDelete: 'cascade',
    foreignKey: 'actorId',
    constraints: false,
});

module.exports = {
    Movie,
    MoviesGenres,
    AlternativeTitle,
    MoviesActors,
};