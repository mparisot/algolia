const express = require('express');

const algoliasearch = require('algoliasearch');

const fs = require('fs');

let algoliaKey;

try {
    algoliaKey = fs.readFileSync('./algoliaKey', 'utf8');

    if(!algoliaKey) {
        console.error('You need to add the algolia admin API key in the "algoliaKey" file');
        return;
    }
} catch(e) {
    console.error('You need to create a file name "algoliaKey" at the root of the server and copy paste the algolia admin API key in it before starting the server');
    return;
}

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