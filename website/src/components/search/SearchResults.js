import React from 'react';
import PropTypes from 'prop-types';

import { SearchResult, searchResultPropType } from 'components/search/SearchResult';

import './searchResults.css';

export default class SearchResults extends React.Component {

    static propTypes = {
        searchResults: PropTypes.arrayOf(PropTypes.shape(searchResultPropType)).isRequired,
        onDeleteResult: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div className="searchResults">
                {this.props.searchResults.length === 0 && <div className="searchResults-empty">Type something in the field above to see some results</div>}
                {this.props.searchResults.map(result => <SearchResult result={result} key={result.objectID} onDeleteResult={this.props.onDeleteResult} />)}
                {this.props.searchResults.length > 0 && <div className="searchResults-logo">powered by <img src="images/algolia.svg" alt="Powered by Algolia"/></div>}
            </div>
        );
    }
}