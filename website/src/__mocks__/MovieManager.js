
class MovieManager {
    constructor() {
    }

    search(text) {
        if(text === 'error') {
            return Promise.reject({ message: 'Error!' });
        } else {
            return Promise.resolve([{
                objectID: '1',
                title: 'title'
            }]);
        }
    }
}

export const movieManager = new MovieManager();