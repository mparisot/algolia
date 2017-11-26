const winston = require('winston');

const Genre = require('./GenreModel');


class GenresManager {
    constructor() {
    }

    getAll() {
        return Genre.findAll();
    }
}

module.exports = new GenresManager(); // return singleton since we shouldn't need multi instances for now