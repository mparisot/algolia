import React from 'react';

import PropTypes from 'prop-types';

import FormFieldSet from 'components/form/FormFieldSet';

/**
 * Encapsulate the children of that component into a FormFieldSet component with a label and an error message
 */
const FormFieldSetWithLabel = (props) => {
    return (
        <FormFieldSet>
            <label htmlFor={props.htmlFor}>{props.label}</label>
            { props.children }
            <div className="addMovieSection-error">{props.error}</div>
        </FormFieldSet>
    );
};

FormFieldSetWithLabel.propsTypes = {
    htmlFor: PropTypes.string.isRequired, // Id of the input targeted by the label
    label: PropTypes.string.isRequired, // The label text
    error: PropTypes.string, // The error text associated to that input
};

export default FormFieldSetWithLabel;