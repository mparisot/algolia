const express = require('express');
const winston = require('winston');

const { manageErrors } = require('../utils/ControllerUtils');

const moviesManager = require('./MoviesManager');

const router = express.Router();

router.route('/movies/').get(function (req, res) {
    winston.info('fetch all movies');
    moviesManager.getAll().then(movies => {
        res.json(movies);
    })
});

router.route('/movies/:movieId').get(function (req, res) {
    winston.info('Fetch a movie', { movieId: req.params.movieId });
    moviesManager.getById(req.params.movieId).then(movie => {
        if(!movie) res.status(404).json({});
        else res.json(movie);
    }).catch(manageErrors.bind(null, res, {
        messageToLog: 'Error while fetching a movie',
        paramsToLog: {
            params: req.params
        }
    }));
});

router.route('/movies/').post(function (req, res) {
    const errors = [];
    if(!req.body.title) errors.push({ field: 'title', error: 'The title is mandatory' });
    if(!req.body.image) errors.push({ field: 'image', error: 'The image is mandatory' });
    if(!req.body.year) errors.push({ field: 'year', error: 'The year is mandatory' });

    if(errors.length > 0) {
        winston.info('invalid arguments while adding a movie', { args: req.body, errors });
        res.status(400).json({ errors });
    } else {
        winston.info('Add movie', req.body);

        moviesManager.add(req.body)
            .then(content => {
                winston.debug('Adding movie', content);
                res.json(content);
            })
            .catch(manageErrors.bind(null, res, {
                messageToLog: 'Error while adding a movie',
                paramsToLog: {
                    params: req.body
                }
            }));
    }
});

/* DELETE a movie */
router.route('/movies/:movieId').delete(function (req, res) {
    winston.info('Deleting a movie', { movieId: req.params.movieId });
    moviesManager.del(req.params.movieId)
        .then(() => res.send({delete: true}))
        .catch(manageErrors.bind(null, res, {
            messageToLog: 'Error while deleting a movie',
            paramsToLog: {
                params: req.params
            }
        }));
});

module.exports = router;