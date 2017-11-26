import React from 'react';
import PropTypes from 'prop-types';

import { WithContext as ReactTags } from 'react-tag-input';

import './tagField.css';

class TagsField extends React.Component {

    static propsTypes = {
        onValueChange: PropTypes.func.isRequired,
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
        suggestions: PropTypes.arrayOf(PropTypes.any),
        id: PropTypes.string,
    };

    static defaultProps = {
        suggestions: [],
    }

    removeValue = (index) => {
        let values = [...this.props.values];
        values.splice(index, 1);
        this.props.onValueChange(values);
    };

    addValue = (value) => {
        if(this.props.values.indexOf(value) >= 0) return;
        let values = [...this.props.values];
        values.push(value);
        this.props.onValueChange(values);
    };

    reorderValue = (value, currPos, newPos) => {
        let values = [...this.props.values];

        values.splice(currPos, 1);
        values.splice(newPos, 0, value);

        this.props.onValueChange(values);
    };

    filterSuggestions = (textInputValue, possibleSuggestionsArray) => {
        const lowerCaseQuery = textInputValue.toLowerCase();

        return possibleSuggestionsArray.filter((suggestion) =>  {
            if(this.props.values.indexOf(suggestion) >= 0) return false;
            return suggestion.toLowerCase().startsWith(lowerCaseQuery)
        });
    };

    render() {
        return (
            <div className="tagsField">
                {this.props.values.length === 0 && <div className="tagsField-noTag">Type in the field bellow and either select a suggestion or push enter to add your value</div> }
                <ReactTags tags={this.props.values.map(value => ({ id: value, text: value }))}
                           suggestions={this.props.suggestions}
                           handleDelete={this.removeValue}
                           handleAddition={this.addValue}
                           handleDrag={this.reorderValue}
                           placeholder=""
                           id={this.props.id}
                           allowDeleteFromEmptyInput={false}
                           handleFilterSuggestions={this.filterSuggestions}

                />
            </div>
        );
    }
}

export default TagsField;