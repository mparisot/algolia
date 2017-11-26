import React from 'react';
import PropTypes from 'prop-types';

import FormFieldSet from 'components/form/FormFieldSet';
import TagsField from 'components/form/TagsField';

import './genreField.css';

class GenresField extends React.Component {

    static propsTypes = {
        onValueChange: PropTypes.func.isRequired,
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
        existingGenres: PropTypes.arrayOf(PropTypes.string),
        existingGenresFetchError: PropTypes.string,
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
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

