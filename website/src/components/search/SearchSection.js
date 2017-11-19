import React from 'react';
import SearchResults from "./SearchResults";
import SearchBar from "./SearchBar";

export default function (props) {
    return (
        <div className="searchSection">
            <SearchBar/>
            <SearchResults/>
        </div>
    );
}