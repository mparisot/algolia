const algoliasearch = require('algoliasearch');
const fs = require('fs');
const winston = require('winston');

const { Movie, AlternativeTitle } = require('./MovieModel');
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

    _adaptObject(movie) {
        const adaptedMovie = Object.assign({}, movie.toJSON(), {
            alternative_titles: movie.alternative_titles.map(value => value.title),
            genre: movie.Genres.map(genre => genre.name),
        });
        delete adaptedMovie.Genres; // need to find how to map properly with sequelize

        return adaptedMovie;
    }

    getAll() {
        return Movie.findAll({
            include: [
                {model: AlternativeTitle, as: 'alternative_titles', attributes: ['title']},
                {model: Genre, attributes: ['name']}
            ]
        }).then(movies => movies.map(this._adaptObject));
    }

    getById(movieId) {
        return Movie.findById(movieId, {
            include: [
                {model: AlternativeTitle, as: 'alternative_titles', attributes: ['title']},
                {model: Genre, attributes: ['name']}
            ]
        }).then(this._adaptObject);
    }

    add(movieData, options = { indexInAlgolia: true }) {

        return Movie.create(Object.assign({ objectID: Date.now() }, movieData))
        .then(movieModel => {
            return Promise.all( movieData.alternative_titles.map(title => AlternativeTitle.create( {movieId: movieModel.dataValues.objectID, title: title} )))
                .then(() => movieModel);
        })
        .then(movieModel => {
            return Promise.all([
                ...movieData.genre.map(genre => Genre.findOrCreate({ where: { name: genre } })),
            ]).then(genreModels => ([movieModel, ...genreModels]));
        })
        .then(([movieModel, ...genreModels]) => {
            const genres = genreModels.map(([genreModel]) => ({ id: genreModel.dataValues.genreId , name: genreModel.dataValues.name }));
            return movieModel.setGenres(genres.map(genre => genre.id)).then(() => {
                return Object.assign({}, movieModel.dataValues, { genre: genres.map(genre => genre.name) })
            });
        }).then((movie) => {
            winston.debug(' Movie created, adding it to algolia index', movie);
            if(options.indexInAlgolia) return this._index.addObject(movie);
            return Promise.resolve(movie);
        }).catch(err => {
            if(err.error) return err.error;
            if(err.errors) return err.errors;
            return err;
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
                return Promise.resolve();
            }
        }).then(() => this._index.deleteObject(movieId))
        .catch(err => {
            if(err.error) return err.error;
            if(err.errors) return err.errors;
            return err;
        });
    }
}

module.exports = new MoviesManager(); // return singleton since we shouldn't need multi instances for now