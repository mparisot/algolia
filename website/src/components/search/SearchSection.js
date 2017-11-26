import React from 'react';

import { movieManager } from 'MovieManager';

import SearchResults from 'components/search/SearchResults';
import SearchBar from 'components/search/SearchBar';

/**
 * The serchs ection with the search field and the results
 */
class SearchSection extends React.Component {

    lastResultsUpdate = 0;

    state = {
        searchResults: [],
    };

    updateSearchResult = (results) => {
        this.lastResultsUpdate = Date.now();
        this.setState({
            searchResults: results,
        });
    };

    onDeleteResult = (result) => {

        const lastResultsUpdateBeforeDelete = this.lastResultsUpdate;
        const resultIndex = this.state.searchResults.findIndex(result => result.objectID === result.objectID);

        const updateResults = [...this.state.searchResults];
        updateResults.splice(resultIndex, 1);

        this.setState({ // optimistically remove it from the list
            searchResults:updateResults,
        });

        movieManager.delete(result.objectID).catch(err => {
            // something went wrong, we put it back to let the user retry only if the user didn't do another search in the mean time
            if(this.lastResultsUpdate === lastResultsUpdateBeforeDelete) {
                const updateResults = [...this.state.searchResults];
                updateResults.splice(resultIndex, 0, result);

                this.setState({
                    searchResults:updateResults,
                });
            }
        });
    };

    render() {
        return (
            <div className="searchSection">
                <SearchBar onSearchResultsUpdated={this.updateSearchResult}/>
                <SearchResults searchResults={this.state.searchResults} onDeleteResult={this.onDeleteResult} />
            </div>
        );
    }
}

export default SearchSection;