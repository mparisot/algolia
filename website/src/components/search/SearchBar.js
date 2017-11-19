import React from 'react';
import debounce from 'debounce';

import { movieManager } from './MovieManager';

import "./searchBar.css";

export default class SearchBar extends React.Component {

    state = {
        error: null,
    };

    onInputChange = (event) => this.doSearch(event.target.value);

    doSearch = debounce((searchedText) => {
        if(searchedText === '') return this.props.onSearchResultsUpdated([]);

        movieManager.search(searchedText).then(results => {
            this.setState({
                error: null,
            });
            this.props.onSearchResultsUpdated(results);
        }).catch(err => {
            this.setState({
                error: err,
            });
        });
    }, 300); // debounce to avoid too much flickering when the user is typing

    cancelSearch = () => {
        this.props.onSearchResultsUpdated([]);
    };

    render() {
        return (
            <div className="searchBar">
                <label className="searchBar-label" htmlFor="movieSearchInput">Type to search your movie</label>
                <input
                    type="search"
                    id="movieSearchInput"
                    className="searchBar-input"
                    placeholder="Type to search your movie"
                    onChange={this.onInputChange}
                />
            </div>
        );
    }
}