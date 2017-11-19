import algoliasearch from 'algoliasearch/lite';

const host = 'http://localhost:3000'; // inject that properly before shipping to prod

class MovieManager {
    constructor() {
        this._client = algoliasearch('YBSULRJ8E6', '47217c58c4166e083dae1e44c672cd27');
        this._index = this._client.initIndex('movies');
    }

    search(text) {
        return this._index.search(text).then(results => results.hits);
    }

    add(movieData) {
        return fetch(`${host}/movies/`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(movieData),
        }).then(response => response.json());
    }

    delete(movieId) {
        return fetch(`${host}/movies/${movieId}`, {
            method: 'DELETE',
            mode: 'cors',
        }).then(() => this._client.clearCache()); // try to clear the cache to not see the result anymore...
    }
}

export let movieManager = new MovieManager(); // return singleton since we shouldn't need multi instances for now