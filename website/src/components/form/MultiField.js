import React from 'react';
import PropTypes from 'prop-types';

import MultiFieldLine from 'components/form/MultiFieldLine';

import './multiField.css';

/**
 * Component to manage multi line fields with add/delete lines
 */
class MultiField extends React.Component {

    static propTypes = {
        component: PropTypes.func.isRequired, // the component to instantiate in a line
        componentProps: PropTypes.object, // the props that will be injected in that component
        defaultValue: PropTypes.any, // the default value for an empty value, if undefined take an empty string as default value
        onValueChange: PropTypes.func.isRequired, // callback triggered when anything change (add, update, delete of a value)
        values: PropTypes.arrayOf(PropTypes.any).isRequired, // the values processed by that multi fields component
        isEmpty: PropTypes.func, // function to check if a field is empty, if undefined compare strict equality with default value
    };

    static defaultProps = {
        defaultValue: "",
        isEmpty: (value) => value === MultiField.defaultProps.defaultValue,
    };

    changeValue = (index, value) => {
        const values = [...this.props.values];

        values[index] = value;

        this.props.onValueChange(values);
    };

    deleteField = (index) => {
        const values = [...this.props.values];
        values.splice(index, 1);

        this.props.onValueChange(values);
    };

    addField = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if(this.props.values.length === 0 || this.props.values[this.props.values.length-1] === this.props.defaultValue) return;

        const values = [...this.props.values];
        values.push(this.props.defaultValue);

        this.props.onValueChange(values);
    };

    render() {

        const values = this.props.values;
        if(values.length === 0) values.push(this.props.defaultValue);

        return (
          <div className="multiField">
              <div>
                {values.map((value, index) => (
                    <MultiFieldLine
                        key={index}
                        index={index}
                        value={value}
                        component={this.props.component}
                        componentProps={this.props.componentProps}
                        onValueChange={this.changeValue}
                        onDeleteField={this.deleteField}
                    />
                ))}
              </div>
              <div className="multiField-add"><button onClick={this.addField} className="multiField-addBtn">Add another one</button></div>
          </div>
        );
    }

}

export default MultiField;