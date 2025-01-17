const algoliasearch = require('algoliasearch');
const fs = require('fs');
const winston = require('winston');
const sequential = require('promise-sequential');

const { Movie, AlternativeTitle } = require('./MovieModel');
const Genre = require('../genres/GenreModel');
const Actor = require('../actors/ActorModel');

const genresManager = require('../genres/GenresManager');
const actorsManager = require('../actors/ActorsManager');

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
        if(!movie) return;

        const adaptedMovie = Object.assign({}, movie.toJSON(), {
            alternative_titles: movie.alternative_titles.map(value => value.title),
            genre: movie.Genres.map(genre => genre.name),
            actors: movie.Actors.map(actor => actor.name),
            actor_facets: movie.Actors.map(actor => actor.facet),
        });
        delete adaptedMovie.Genres; // need to find how to map properly with sequelize
        delete adaptedMovie.Actors; // need to find how to map properly with sequelize

        return adaptedMovie;
    }

    getAll() {
        return Movie.findAll({
            include: [
                {model: AlternativeTitle, as: 'alternative_titles', attributes: ['title']},
                {model: Genre, attributes: ['name']},
                {model: Actor, attributes: ['name', 'facet']}
            ]
        }).then(movies => movies.map(this._adaptObject));
    }

    getById(movieId) {
        return Movie.findById(movieId, {
            include: [
                {model: AlternativeTitle, as: 'alternative_titles', attributes: ['title']},
                {model: Genre, attributes: ['name']},
                {model: Actor, attributes: ['name', 'facet']}
            ]
        }).then(this._adaptObject);
    }

    add(movieData, options = { indexInAlgolia: true }) {

        return sequential([
            () => Movie.create(Object.assign({ objectID: Date.now() }, movieData)),
            () => genresManager.bulkAdd(movieData.genre).then(genres => ({ genres })),
            () => actorsManager.bulkAdd(movieData.actors).then(actors => ({ actors })),
        ]).then(([movieModel, { genres: genreModels }, { actors: actorsModels }]) => {

            const genresIds = genreModels.map(genreModel => genreModel.dataValues.genreId);
            const actorsIds = actorsModels.map(actorModel => actorModel.dataValues.actorId);

            const alternateTitles = movieData.alternative_titles.map(altTitle => ({ movieId: movieModel.dataValues.objectID, title: altTitle }));

            return sequential([
                () => Promise.resolve(movieModel.dataValues),
                () => AlternativeTitle.bulkCreate(alternateTitles),
                () => movieModel.setGenres(genresIds),
                () => movieModel.setActors(actorsIds),
            ]).then(([movie]) => movie);
        }).then((movie) => {

            const movieForAlgolia = Object.assign({ objectID: movie.objectID }, movieData);
            movieForAlgolia.actors = movieData.actors.map(actor => actor.name);
            movieForAlgolia.actor_facets = movieData.actors.map(actor => actor.facet);

            winston.info('Movie created, adding it to algolia index', movieForAlgolia);
            if(options.indexInAlgolia) return this._index.addObject(movieForAlgolia);
            return Promise.resolve(movieForAlgolia);
        }).catch(err => {
            console.error(err);
            if(err.error) return err.error;
            if(err.errors) return err.errors;
            return err;
        });
    }

    del(movieId) {
        return Movie.find({
            where: { objectID: movieId }
        }).then(movie => {
            if(movie !== null) {
                return movie.destroy();
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