import React from 'react';
import ReactDOM from 'react-dom';

import './styles/style.css';

class Main extends React.Component {

    state = {
    };

    render() {
        return (<div className="main">
            Main
        </div>);
    }
}

ReactDOM.render(<Main/>, document.getElementById('main'));