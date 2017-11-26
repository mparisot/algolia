const moviesRouter = require('./movies/MoviesController');
const genresRouter = require('./genres/GenresController');

module.exports = {
    movies: moviesRouter,
    genres: genresRouter,
}