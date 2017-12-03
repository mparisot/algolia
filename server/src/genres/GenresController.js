const express = require('express');
const winston = require('winston');

const { manageErrors } = require('../utils/ControllerUtils');
const genresManager = require('./GenresManager');

const router = express.Router();

router.route('/genres/').get(function (req, res) {
    genresManager.getAll()
        .then(genres => res.json(genres))
        .catch(manageErrors.bind(null, res, {
            messageToLog: 'Error while fetching the genres',
        }));
});

module.exports = router;