import React from 'react';
import PropTypes from 'prop-types';

import MultiField from 'components/form/MultiField';
import Input from 'components/form/Input';
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
            <div>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <TagsField
                    onValueChange={this.props.onValueChange}
                    values={this.props.values}
                    suggestions={this.props.existingGenres}
                    id={this.props.id}
                />
                {this.props.existingGenresFetchError && <div className="genreField-error">{this.props.existingGenresFetchError}</div>}
            </div>
        );
    }
}

/*const GenresField = (props) => (
    <MultiField
        component={Input}
        componentProps={{className: 'plop'}}
        onValueChange={props.onValueChange}
        values={props.values}
    />
); */

export default GenresField;

