import React from 'react';

import "./searchBar.css";

export default class SearchBar extends React.Component {

    render() {
        return (
            <div className="searchBar">
                <input type="search" className="searchBar-input" />
                <button className="searchBar-cancel">Cancel</button>
            </div>
        );
    }
}