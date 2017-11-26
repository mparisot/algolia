const algoliasearch = require('algoliasearch');
const fs = require('fs');
const winston = require('winston');

const Movie = require('./MovieModel');
const Genre = require('../genres/GenreModel');

let algoliaKey;

try {
    algoliaKey = fs.readFileSync('./algoliaKey', 'utf8');
} catch(e) {
    winston.error('You need to create a file name "algoliaKey" at the root of the server and copy paste the algolia admin API key in it before starting the server');
    process.exit(1);
}

if(!algoliaKey) {
    winston.error('You need to add the algolia admin API key in the "algoliaKey" file');
    process.exit(1);
}

class MoviesManager {
    constructor() {
        this._client = algoliasearch('YBSULRJ8E6', algoliaKey);
        this._index = this._client.initIndex('movies');
    }

    add(movieData) {
        return Promise.all([
            Movie.create(Object.assign({ objectID: Date.now() }, movieData)),
            ...movieData.genre.map(genre => Genre.findOrCreate({ where: { name: genre } })),
        ]).then(([movieModel, ...genreModels]) => {
            const genres = genreModels.map(([genreModel]) => ({ id: genreModel.dataValues.genreId , name: genreModel.dataValues.name }));
            return movieModel.setGenres(genres.map(genre => genre.id)).then(() => {
                return Object.assign({}, movieModel.dataValues, { genre: genres.map(genre => genre.name) })
            });
        }).then((movie) => {
            winston.debug(' Movie created, adding it to algolia index', movie);
            return this._index.addObject(movie);
        });
    }

    delete(movieId) {
        return Movie.find({
            where: { objectID: movieId }
        }).then(movie => {
            if(movie !== null) {
                return movie.setGenres([]).then(() => movie.destroy());
            } else {
                winston.warn('Tried to delete a movie not in DB, still will try to remove the algolia index', movieId);
            }
        }).then(() => this._index.deleteObject(movieId));
    }
}

module.exports = new MoviesManager(); // return singleton since we shouldn't need multi instances for now