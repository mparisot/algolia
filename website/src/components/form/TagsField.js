import React from 'react';
import PropTypes from 'prop-types';

import { WithContext as ReactTags } from 'react-tag-input';

class TagsField extends React.Component {

    static propsTypes = {
        onValueChange: PropTypes.func.isRequired,
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
        suggestions: PropTypes.arrayOf(PropTypes.any),
    };

    static defaultProps = {
        suggestions: [],
    }

    removeGenre = (index) => {
        let genres = [...this.props.values];
        genres.splice(index, 1);
        this.props.onValueChange(genres);
    };

    addGenre = (genre) => {
        let genres = [...this.props.values];
        genres.push(genre);
        this.props.onValueChange(genres);
    };

    reorderGenre = (genre, currPos, newPos) => {
        let genres = [...this.props.values];

        genres.splice(currPos, 1);
        genres.splice(newPos, 0, genre);

        this.props.onValueChange(genres);
    };

    render() {
        return (
            <ReactTags tags={this.props.values.map(value => ({ id: value, text: value }))}
                       suggestions={this.props.suggestions}
                       handleDelete={this.removeGenre}
                       handleAddition={this.addGenre}
                       handleDrag={this.reorderGenre}
                       placeholder=""
            />
        );
    }
}

export default TagsField;