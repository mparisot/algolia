import algoliasearch from 'algoliasearch/lite';

import { get, post, callDelete } from './FetchUtil';

const host = 'http://localhost:3000'; // TODO inject that value by env somehow

/*
 Everything needed to manage Movies
 */
class MovieManager {
    constructor() {
        this._client = algoliasearch('YBSULRJ8E6', '47217c58c4166e083dae1e44c672cd27');
        this._index = this._client.initIndex('movies');
    }

    /**
     * Search for a movie
     * Use algolia search engine
     * @param text The text to search
     */
    search(text) {
        return this._index.search(text).then(results => results.hits);
    }

    /**
     * Add a movie
     * @param movieData The data of the movie to add
     */
    add(movieData) {
        return post(`${host}/api/1/movies/`, movieData)
            .then(() => this._index.clearCache());
    }

    /**
     * Fetch all the genres already known
     * @returns An array of genres
     */
    getAllGenres() {
        return get(`${host}/api/1/genres/`);
    }

    /**
     * Delete a movie
     * @param movieId The id of the movie to delete
     */
    delete(movieId) {
        return callDelete(`${host}/api/1/movies/${movieId}`)
            .then(() => this._index.clearCache());
    }
}

export let movieManager = new MovieManager(); // return singleton since we shouldn't need multi instances for now