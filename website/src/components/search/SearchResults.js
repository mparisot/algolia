import React from 'react';

import "./searchResults.css";

const SearchResult = (props) => {
    const { result } = props;

    return (
        <div className="searchResult">
            <div className="searchResult-poster"><img src={result.image} alt={`${result.title}'s poster`} /></div>
            <div className="searchResult-info">
                <div className="searchResult-title">{result.title}</div>
                <div className="searchResult-genres">
                    {result.genre.map((genre, index) => <span key={index} className="searchResult-genre">{genre}</span>)}
                </div>
            </div>
            <div className="searchResult-actions">
                <div className="searchResult-actions-delete">Delete</div>
            </div>
        </div>
    );
}

export default class SearchResults extends React.Component {

    render() {
        return (
            <div className="searchResults">
                {this.props.searchResults.length === 0 && <div className="searchResults-empty">Type something in the field above to see some results</div>}
                {this.props.searchResults.map(result => <SearchResult result={result} key={result.objectID} />)}
                {this.props.searchResults.length > 0 && <div className="searchResults-logo">powered by <img src="images/algolia.svg" alt="Powered by Algolia"/></div>}
            </div>
        );
    }
}