import React from 'react';

import './formFieldSet.css';

/**
 * Basic component that encapsulate a label and an input and make them responsive
 */
export default (props) => {
    return <div className="formFieldset">{props.children}</div>;
}