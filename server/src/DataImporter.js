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

    return importMovies(importData);
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

    return Movie.bulkCreate(movies, { ignoreDuplicates: true }).then(() => {
        return Genre.bulkCreate([...genres].map(genre => ({ name: genre})), { ignoreDuplicates: true });
    }).then((genres) => {
        const genresByName = genres.reduce((reducedValue, genreData) => {
            const genre = genreData.dataValues;
            reducedValue[genre.name] = genre.genreId;
            return reducedValue;
        }, {});
        return MoviesGenres.bulkCreate(movieGenres.map(movieGenre => ({ movieId: movieGenre.movieId, genreId: genresByName[movieGenre.genre] })), { ignoreDuplicates: true });
    });
}

module.exports = {
    initialImport
};