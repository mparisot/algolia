const winston = require('winston');
const fs = require('fs');

const { Movie, MoviesGenres } = require('./movies/MovieModel');
const Genre = require('./genres/GenreModel');


function initialImport(file) {
    let importData;
    try {
        importData = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch(e) {
        winston.error('Missing import data file : movies.json');
        process.exit(1);
    }

    return createTables(Movie, Genre, MoviesGenres).then(() => importMovies(importData));
}

function createTables(...models) { // TODO use the migration feature from sequelize instead
    return Promise.all(
        models.map(createTable)
    );
}

function createTable(model) {
    return model.sync({ force: true }).then(() => {
        winston.info('Table created', { modelName: model.name });
    }).catch(err => {
        winston.info('Error when creating table', { error: err.errors, modelName: model });
    });
}

function importMovies(movies) {

    let genres = new Set();
    let movieGenres = [];

    movies.forEach(movie => {
        if(movie.genre) {
            movie.genre.forEach(genre => {
                genres.add(genre);
                movieGenres.push({ movieId: movie.objectID, genre: genre });

            });
        }
    });

    return Movie.bulkCreate(movies).then(() => {
        return Genre.bulkCreate([...genres].map(genre => ({ name: genre})));
    }).then((genres) => {
        const genresByName = genres.reduce((reducedValue, genreData) => {
            const genre = genreData.dataValues;
            reducedValue[genre.name] = genre.genreId;
            return reducedValue;
        }, {});
        return MoviesGenres.bulkCreate(movieGenres.map(movieGenre => ({ movieId: movieGenre.movieId, genreId: genresByName[movieGenre.genre] })));
    });
}

module.exports = {
    initialImport
};