import React from 'react';
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";

class SearchSection extends React.Component {

    state = {
        searchResults: [],
    };

    updateSearchResult = (results) => {
        this.setState({
            searchResults: results,
        });
    };

    render() {
        return (
            <div className="searchSection">
                <SearchBar onSearchResultsUpdated={this.updateSearchResult}/>
                <SearchResults searchResults={this.state.searchResults}/>
            </div>
        );
    }
}

export default SearchSection;