const express = require('express');
const winston = require('winston');

const genresManager = require('./GenresManager');

const router = express.Router();

router.route('/genres/').get(function (req, res) {
    genresManager.getAll()
        .then(genres => res.json(genres))
        .catch(err => {
            winston.error('Error while fetching the genres', { error: err });
            res.status(500).json(err)
        });
});

module.exports = router;