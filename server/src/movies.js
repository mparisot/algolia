const express = require('express');

const { movieManager } = require('./MovieManager');

const router = express.Router();

router.route('/movies/').post(function (req, res) {
    movieManager.add(req.body)
        .then(content => {
            console.log('content',content);
            res.json(Object.assign({ objectID: content.objectID }, req.body));
        })
        .catch(err => res.status(500).json(err));
});

/* DELETE a movie */
router.route('/movies/:movieId').delete(function (req, res) {
    console.log('Delete movie', req.params.movieId);
    movieManager.delete(req.params.movieId)
        .then(() => res.send({delete: true}))
        .catch(err => res.status(500).json(err));

});

module.exports = router;