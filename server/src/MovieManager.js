const algoliasearch = require('algoliasearch');
const fs = require('fs');

let algoliaKey;

try {
    algoliaKey = fs.readFileSync('./algoliaKey', 'utf8');
} catch(e) {
    throw new Error('You need to create a file name "algoliaKey" at the root of the server and copy paste the algolia admin API key in it before starting the server');
}

if(!algoliaKey) {
    throw new Error('You need to add the algolia admin API key in the "algoliaKey" file');
}

class MovieManager {
    constructor() {
        this._client = algoliasearch('YBSULRJ8E6', algoliaKey);
        this._index = this._client.initIndex('movies');
    }

    delete(movieId) {
        return this._index.deleteObject(movieId);
    }
}

module.exports = {
    movieManager: new MovieManager()
}; // return singleton since we shouldn't need multi instances for now