import React from 'react';

/**
 * Encapsulate an input to be used with the MultiField component
 */
export default (props) => (
    <input
        {...props}
        className={props.className || 'multiFieldInput'}
    />
);