import React from 'react';
import PropTypes from 'prop-types';

import './actorField.css';

class ActorField extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired, // base id for all the actor inputs
        index: PropTypes.string, // the index of that component if used in MultiField
        value: PropTypes.shape({ // an actor with a name and an image
            name: PropTypes.string,
            image: PropTypes.string,
        }),
        onChange: PropTypes.func.isRequired, // triggered when an actor value change
    };

    updateName = (event) => {
        const name = event.target.value;

        this.props.onChange(Object.assign({}, this.props.value, {
            name,
        }));
    };

    updateImage = (event) => {
        const image = event.target.value;

        this.props.onChange(Object.assign({}, this.props.value, {
            image,
        }));
    };

    render() {
        const idIndexSuffix = this.props.index ? `-${this.props.index}` : '';

        return (
            <div className="actorField">
                <div className="actorField-subField">
                    <label htmlFor={`${this.props.id}${idIndexSuffix}-name`} className="actorField-label">Name: </label>
                    <input type="text" className="actorField-input" value={this.props.value.name} onChange={this.updateName} />
                </div>
                <div className="actorField-subField">
                    <label htmlFor={`${this.props.id}-image`} className="actorField-label">Image:</label>
                    <input type="text" className="actorField-input" value={this.props.value.image} onChange={this.updateImage} />
                </div>
            </div>
        );
    }
}

export default ActorField;