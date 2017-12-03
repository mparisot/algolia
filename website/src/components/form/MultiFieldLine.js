import React from 'react';
import PropTypes from 'prop-types';

/**
 * A line for the MultiField component. should not be called outside of MultiField
 */
class MultiFieldLine extends React.Component {

    static propTypes = {
        index: PropTypes.number.isRequired,
        component: PropTypes.func.isRequired,
        componentProps: PropTypes.object,
        onDeleteField: PropTypes.func.isRequired,
        onValueChange: PropTypes.func.isRequired,
        value: PropTypes.any.isRequired,
    };

    deleteField = (event) => {
        event.stopPropagation();
        event.preventDefault();

        this.props.onDeleteField(this.props.index);
    };

    onValueChange = (value) => {
        let valueToUse = value;
        if(value.target && value.target.value !== undefined) {
            valueToUse = value.target.value;
        }

        this.props.onValueChange(this.props.index, valueToUse);
    };

    render() {
        return (
            <div className="multiFieldLine">
                {React.createElement(
                    this.props.component,
                    Object.assign(
                        {},
                        this.props.componentProps,
                        {
                            onChange: this.onValueChange,
                            value: this.props.value,
                            index: this.props.index
                        }
                    )
                )}
                <button className="multiField-delBtn" onClick={this.deleteField}>Delete</button>
            </div>
        );
    }
}

export default MultiFieldLine;