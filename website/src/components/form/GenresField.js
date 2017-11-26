import React from 'react';
import PropTypes from 'prop-types';

import FormFieldSet from 'components/form/FormFieldSet';
import TagsField from 'components/form/TagsField';

import './genreField.css';

/**
 * Component to manage Genres
 */
class GenresField extends React.Component {

    static propsTypes = {
        onValueChange: PropTypes.func.isRequired, // Called with the new list of genres when anything changes
        values: PropTypes.arrayOf(PropTypes.string).isRequired, // the list fo genres
        existingGenres: PropTypes.arrayOf(PropTypes.string), // The list of already existing genres in the Db
        existingGenresFetchError: PropTypes.string, // Error message if anything fails while fetching the existing genres list
        id: PropTypes.string.isRequired, // the id of the component
        label: PropTypes.string.isRequired, // the label of the component
    };

    static defaultProps = {
        existingGenres: [],
    };

    render() {
        return (
            <FormFieldSet>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <TagsField
                    onValueChange={this.props.onValueChange}
                    values={this.props.values}
                    suggestions={this.props.existingGenres}
                    id={this.props.id}
                />
                {this.props.existingGenresFetchError && <div className="genreField-error">{this.props.existingGenresFetchError}</div>}
            </FormFieldSet>
        );
    }
}

export default GenresField;

