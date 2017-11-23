import React from 'react';
import PropTypes from 'prop-types';

class MultiFieldLine extends React.Component {

    static propTypes = {
        index: PropTypes.number.isRequired,
        component: PropTypes.func.isRequired,
        componentProps: PropTypes.object.isRequired,
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
                {React.createElement(this.props.component, Object.assign({}, this.props.componentProps, { onChange: this.onValueChange, value: this.props.value }))}
                <button className="multiField-delBtn" onClick={this.deleteField}>Delete</button>
            </div>
        );
    }
}

class MultiField extends React.Component {

    static propTypes = {
        component: PropTypes.func.isRequired,
        componentProps: PropTypes.object.isRequired,
        defaultValue: PropTypes.any.isRequired,
        onValueChange: PropTypes.func.isRequired,
        values: PropTypes.arrayOf(PropTypes.any).isRequired,
    };

    static defaultProps = {
        defaultValue: "",
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
              <div className="multiField-add"><button onClick={this.addField}>Add</button></div>
          </div>
        );
    }

}

export default MultiField;