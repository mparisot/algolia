import React from 'react';
import ReactDOM from 'react-dom';
import cc from 'classcat';

import SearchSection from './components/search/SearchSection';

import '../styles/style.css';


class Main extends React.Component {

    state = {
        sectionDisplayed: 'search',
    };

    switchSection = () => { // add a proper router when we have more than 2 sections
        this.setState({
            sectionDisplayed: this.state.sectionDisplayed === 'search' ? 'addMovie' : 'search',
        });
    };

    render() {
        return (<div className="main">
            <button className="sectionSwitch" onClick={this.switchSection}>{this.state.sectionDisplayed === 'search' ? 'Add new movie' : 'Go back to search'}</button>
            <div className={`sections ${this.state.sectionDisplayed}`}>
                <SearchSection />
                <div className="addMovieForm">Add a movie</div>
            </div>
        </div>);
    }
}

ReactDOM.render(<Main/>, document.getElementById('main'));