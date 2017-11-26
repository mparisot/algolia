const express = require('express');
const winston = require('winston');

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
        res.json(movie);
    }).catch(err => {
        winston.error('Error while fetching a movie', { params: req.body, error: err });
        res.status(500).json(err)
    });
});

router.route('/movies/').post(function (req, res) {
    const errors = [];
    if(!req.body.title) errors.push({ field: 'title', error: 'The title is mandatory' });
    if(!req.body.image) errors.push({ field: 'image', error: 'The image is mandatory' });

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
            .catch(err => {
                winston.error('Error while adding a movie', { params: req.body, error: err });
                res.status(500).json(err)
            });
    }
});

/* DELETE a movie */
router.route('/movies/:movieId').delete(function (req, res) {
    winston.info('Deleting a movie', { movieId: req.params.movieId });
    moviesManager.delete(req.params.movieId)
        .then(() => res.send({delete: true}))
        .catch(err => {
            winston.error('Error while deleting a movie', { params: req.params, error: err });
            res.status(500).json(err)
        });

});

module.exports = router;