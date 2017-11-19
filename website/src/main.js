import React from 'react';
import ReactDOM from 'react-dom';

import SearchSection from './components/search/SearchSection';

import '../styles/style.css';

class Main extends React.Component {

    state = {
    };

    render() {
        return (<div className="main">
            <SearchSection />
        </div>);
    }
}

ReactDOM.render(<Main/>, document.getElementById('main'));