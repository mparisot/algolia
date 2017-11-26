import React from 'react';

export default (props) => (
    <input
        {...props}
        className={props.className || 'multiFieldInput'}
    />
);