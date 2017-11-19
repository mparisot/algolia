const express = require('express');

const algoliasearch = require('algoliasearch');

const fs = require('fs');

const algoliaKey = fs.readFileSync('./algoliaKey', 'utf8');

const algoliaSearch = algoliasearch('YBSULRJ8E6', algoliaKey);
const movieIndex = algoliaSearch.initIndex('movies');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    next();
});

app.get('/', (req, res) => res.send('This server works'));

app.delete('/movies/:movieId', function (req, res) {
    console.log('Delete movie', req.params.movieId);
    movieIndex.deleteObject(req.params.movieId).then(() => res.send({delete: true})).catch(err => res.status(500).send(err.message));

});

app.listen(3000, () => console.log('Server listening on port 3000!'));