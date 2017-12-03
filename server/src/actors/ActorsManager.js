const winston = require('winston');
const sequential = require('promise-sequential');

const Actor = require('./ActorModel');


class ActorsManager {
    constructor() {
    }

    getAll() {
        return Actor.findAll();
    }

    add(actor) {
        console.log('add',actor);
        return Actor.findOrCreate({ where: actor }).then(([actor]) => actor);
    }

    bulkAdd(actors) {
        return sequential(actors.map(genre => () => this.add(genre)));
    }
}

module.exports = new ActorsManager(); // return singleton since we shouldn't need multi instances for now