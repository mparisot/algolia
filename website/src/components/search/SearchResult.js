import React from 'react';
import PropTypes from 'prop-types';

import "./searchResult.css";

export const searchResultPropType = {
    objectID: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.arrayOf(PropTypes.string),
};

export class SearchResult extends React.Component {

    static propTypes = Object.assign({
        onDeleteResult: PropTypes.func.isRequired,
    }, searchResultPropType);

    deleteResult = () => {
        this.props.onDeleteResult(this.props.result);
    };

    render() {
        const {result} = this.props;

        return (
            <div className="searchResult">
                <div className="searchResult-poster"><img src={result.image} alt={`${result.title}'s poster`}/></div>
                <div className="searchResult-info">
                    <div className="searchResult-title">{result.title}</div>
                    <div className="searchResult-genres">
                        {result.genre.map((genre, index) => <span key={index} className="searchResult-genre">{genre}</span>)}
                    </div>
                </div>
                <div className="searchResult-actions">
                    <div className="searchResult-actions-delete" onClick={this.deleteResult}>Delete</div>
                </div>
            </div>
        );
    }
}