const winston = require('winston');
const sequential = require('promise-sequential');

const Genre = require('./GenreModel');


class GenresManager {
    constructor() {
    }

    getAll() {
        return Genre.findAll();
    }

    add(genre) {
        console.log('add',genre);
        return Genre.findOrCreate({ where: { name: genre } }).then(([genre]) => genre);
    }

    bulkAdd(genres) {
        return sequential(genres.map(genre => () => this.add(genre)));
    }
}

module.exports = new GenresManager(); // return singleton since we shouldn't need multi instances for now