const winston = require('winston');
const fs = require('fs');

const { Movie, MoviesGenres, AlternativeTitle, MoviesActors } = require('./movies/MovieModel');
const Genre = require('./genres/GenreModel');
const Actor = require('./actors/ActorModel');


function initialImport(file) {
    let importData;
    winston.info('Read data file');

    try {
        importData = JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch(e) {
        winston.error('Missing import data file', { file });
        process.exit(1);
    }

    winston.info('Read data file done');

    return createTables(Movie, Genre, Actor, MoviesGenres, AlternativeTitle, MoviesActors).then(() => importMovies(importData));
}

function createTables(...models) { // TODO use the migration feature from sequelize instead
    winston.info('Creating the tables');
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

    winston.info('Importing the movies');

    let genres = new Set();
    let actors = new Map();
    let movieGenres = [];
    let movieActors = [];
    let movieAltTitles = [];

    movies.forEach(movie => {
        if(movie.genre) {
            movie.genre.forEach(genre => {
                genres.add(genre);
                movieGenres.push({ movieId: movie.objectID, genre: genre });
            });

            movie.alternative_titles.forEach(title => {
                movieAltTitles.push({ movieId: movie.objectID, title });
            });
        }
        if(movie.actors) {
            movie.actors.forEach(actor => {
                movieActors.push({ movieId: movie.objectID, actor });

                if(!actors.has(actor)) {
                    actors.set(actor, {
                        name: actor,
                        facet: null,
                    });
                }
            })
        }
        if(movie.actor_facets) {
            movie.actor_facets.forEach(facet => {
                const [,name] = facet.split('|');
                actors.set(name, {
                    name: name,
                    facet,
                });
            })
        }
    });

    return Movie.bulkCreate(movies)
    .then(() => AlternativeTitle.bulkCreate(movieAltTitles))
    .then(() => Actor.bulkCreate([...actors.values()]))
    .then((actors) => {
        const actorsByName = actors.reduce((reducedValue, actorData) => {
            const actor = actorData.dataValues;
            reducedValue[actor.name] = actor.actorId;
            return reducedValue;
        }, {});
        return MoviesActors.bulkCreate(movieActors.map(movieActor => ({ movieId: movieActor.movieId, actorId: actorsByName[movieActor.actor] })))
    })
    .then(() => Genre.bulkCreate([...genres].map(genre => ({ name: genre}))))
    .then((genres) => {
        const genresByName = genres.reduce((reducedValue, genreData) => {
            const genre = genreData.dataValues;
            reducedValue[genre.name] = genre.genreId;
            return reducedValue;
        }, {});
        return MoviesGenres.bulkCreate(movieGenres.map(movieGenre => ({ movieId: movieGenre.movieId, genreId: genresByName[movieGenre.genre] })));
    }).catch(error => {
        winston.error('Import failed', error);
    });
}

module.exports = {
    initialImport
};