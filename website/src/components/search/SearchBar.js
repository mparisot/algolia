import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

import { movieManager } from 'MovieManager';

import './searchBar.css';

/**
 * The search bar input
 */
export default class SearchBar extends React.Component {

    static propTypes = {
        onSearchResultsUpdated: PropTypes.func.isRequired, // called when the search results are fetched
    };

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
                error: err.message,
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
                {this.state.error && <div className="searchBar-error">{this.state.error}</div> }
            </div>
        );
    }
}