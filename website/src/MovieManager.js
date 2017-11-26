import algoliasearch from 'algoliasearch/lite';

import { get, post, callDelete } from './FetchUtil';

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
        return post(`${host}/movies/`, movieData)
            .then(() => this._client.clearCache());
    }

    getAllGenres() {
        return get(`${host}/genres/`);
    }

    delete(movieId) {
        return callDelete(`${host}/movies/${movieId}`)
            .then(() => this._client.clearCache());
    }
}

export let movieManager = new MovieManager(); // return singleton since we shouldn't need multi instances for now