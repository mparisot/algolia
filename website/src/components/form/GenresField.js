import React from 'react';
import PropTypes from 'prop-types';

import MultiField from './MultiField';
import Input from './Input';

const GenresField = (props) => (
    <MultiField
        component={Input}
        componentProps={{className: 'plop'}}
        onValueChange={props.onValueChange}
        values={props.values}
    />
);

GenresField.propsTypes = {
    onValueChange: PropTypes.func.isRequired,
    values: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default GenresField;

