const express = require('express');
const winston = require('winston');

const moviesManager = require('./MoviesManager');

const router = express.Router();

router.route('/movies/').post(function (req, res) {
    const errors = [];
    if(!req.body.title) errors.push({ field: 'title', error: 'The title is mandatory' });
    if(!req.body.image) errors.push({ field: 'image', error: 'The image is mandatory' });

    if(errors.length > 0) {
        winston.debug('invalid arguments while adding a movie', { args: req.body, errors });
        res.status(400).json({ errors });
    } else {
        winston.debug('Add movie', req.body);

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
    winston.debug('Deleting a movie', { movieId: req.params.movieId });
    moviesManager.delete(req.params.movieId)
        .then(() => res.send({delete: true}))
        .catch(err => {
            winston.error('Error while deleting a movie', { params: req.params, error: err });
            res.status(500).json(err)
        });

});

module.exports = router;