import algoliasearch from 'algoliasearch/lite';

export class MovieSearcher {
    constructor() {
        this._client = algoliasearch('YBSULRJ8E6', '47217c58c4166e083dae1e44c672cd27');
        this._index = this._client.initIndex('movies');
    }

    search(text) {
        return new Promise((resolve, reject) => {
            this._index.search(text, function(err, content) {
                console.log("Search results", { err, content });
                if(err) reject(err);
                else resolve(content.hits);
            });
        })
    }
}