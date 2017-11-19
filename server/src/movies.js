const express = require('express');

const { movieManager } = require('./MovieManager');

const router = express.Router();

router.route('/movies/:movieId').delete(function (req, res) {
    console.log('Delete movie', req.params.movieId);
    movieManager.delete(req.params.movieId).then(() => res.send({delete: true})).catch(err => res.status(500).send(err.message));

});

module.exports = router;