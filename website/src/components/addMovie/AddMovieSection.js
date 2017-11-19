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
        errors: {}
    };

    changeTitle = (event) => this.setState({
        movieData: Object.assign({}, this.state.movieData, { title: event.target.value }),
        errors: Object.assign({}, this.state.errors, { title: null }),
    });
    changeImage = (event) => this.setState({
        movieData: Object.assign({}, this.state.movieData, { image: event.target.value }),
        errors: Object.assign({}, this.state.errors, { image: null }),
    });

    validateForm = () => {
        const errors = {};
        if(!this.state.movieData.title) errors.title = 'You need to set a title for this movie';
        if(!this.state.movieData.image) errors.image = 'You need to set an image for this movie';
        else if(!this.state.movieData.image.startsWith('http://') && !this.state.movieData.image.startsWith('https://')) errors.image = 'The image is not a valid URL';

        return errors;
    }

    addMovie = (event) => {
        event.preventDefault();

        const errors = this.validateForm();
        console.log('ERRORs', errors);
        if(Object.keys(errors).length > 0) {
            this.setState({
                errors: Object.assign({}, this.state.errors, errors),
            });
            return;
        }

        const movieData = this.state.movieData;

        if(movieData.title)

        this.setState({
            movieData: {
                title: '',
                image: '',
            },
            errors: {},
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
                    <div className="addMovieSection-error">{this.state.errors.title}</div>
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
                    <div className="addMovieSection-error">{this.state.errors.image}</div>
                </div>
                <button className="addMovie-button" onClick={this.addMovie}>Add the movie</button>
            </form>
        );
    }
}

export default AddMovieSection;