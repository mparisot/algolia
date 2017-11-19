import React from 'react';
import PropTypes from 'prop-types';

import { movieManager } from '../../MovieManager';

import './addMovie.css'

class AddMovieSection extends React.Component {

    static propTypes = {
        onAddMovie: PropTypes.func.isRequired,
    };

    state = {
        movieData: {
            title: '',
            image: '',
        },
    };

    changeTitle = (event) => this.setState({ movieData: Object.assign({}, this.state.movieData, { title: event.target.value }) });
    changeImage = (event) => this.setState({ movieData: Object.assign({}, this.state.movieData, { image: event.target.value }) });

    addMovie = (event) => {
        event.preventDefault();

        const movieData = this.state.movieData;

        this.setState({
            movieData: {
                title: '',
                image: '',
            },
        });
        movieManager.add(movieData).then(addedMovie => this.props.onAddMovie(addedMovie));
    };

    render() {
        return (
            <form className="addMovieSection">
                <div className="addMovieSection-fields">
                    <label htmlFor="addMovie-title">Movie's title</label>
                    <input
                        type="text"
                        id="addMovie-title"
                        placeholder="Ex: Star wars"
                        value={this.state.movieData.title}
                        onChange={this.changeTitle}
                    />
                </div>
                <div className="addMovieSection-fields">
                    <label htmlFor="addMovie-poster">Poster's url</label>
                    <input
                        type="url"
                        id="addMovie-poster"
                        placeholder="Ex: http://myImg.com/id"
                        value={this.state.movieData.image}
                        onChange={this.changeImage}
                    />
                </div>
                <button className="addMovie-button" onClick={this.addMovie}>Add the movie</button>
            </form>
        );
    }
}

export default AddMovieSection;