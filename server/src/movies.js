const express = require('express');

const { movieManager } = require('./MovieManager');

const router = express.Router();

router.route('/movies/').post(function (req, res) {
    const errors = [];
    if(!req.body.title) errors.push({ field: 'title', error: 'The title is mandatory' });
    if(!req.body.image) errors.push({ field: 'image', error: 'The image is mandatory' });

    if(errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        console.log('Add movie', req.body);

        movieManager.add(req.body)
            .then(content => {
                console.log('content',content);
                res.json(Object.assign({ objectID: content.objectID }, req.body));
            })
            .catch(err => res.status(500).json(err));
    }
});

/* DELETE a movie */
router.route('/movies/:movieId').delete(function (req, res) {
    console.log('Delete movie', req.params.movieId);
    movieManager.delete(req.params.movieId)
        .then(() => res.send({delete: true}))
        .catch(err => res.status(500).json(err));

});

module.exports = router;