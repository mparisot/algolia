import React from 'react';

import "./searchBar.css";

export default class SearchBar extends React.Component {

    render() {
        return (
            <div className="searchBar">
                <label className="searchBar-label" htmlFor="movieSearchInput">Type to search your movie</label>
                <input type="search" id="movieSearchInput" className="searchBar-input" placeholder="Type to search your movie"/>
                <button className="searchBar-cancel">Cancel</button>
            </div>
        );
    }
}