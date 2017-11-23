import React from 'react';
import PropTypes from 'prop-types';

import { movieManager } from '../../MovieManager';

import MultiField from '../form/MultiField';
import Input from '../form/Input';

import './addMovie.css'

class AddMovieSection extends React.Component {

    static propTypes = {
        onAddMovie: PropTypes.func.isRequired,
    };

    state = {
        movieData: {
            title: '',
            image: '',
            genres: [],
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

    changeGenres = (genres) => {
        this.setState({
            movieData: Object.assign({}, this.state.movieData, { genres }),
        });
    };

    validateForm = () => {
        const errors = {};
        if(!this.state.movieData.title) errors.title = 'You need to set a title for this movie';
        if(!this.state.movieData.image) errors.image = 'You need to set an image for this movie';
        else if(!this.state.movieData.image.startsWith('http://') && !this.state.movieData.image.startsWith('https://')) errors.image = 'The image is not a valid URL';

        return errors;
    };

    isFilled = () => {
        const errors = this.validateForm();
        return Object.keys(errors).length === 0;
    };

    addMovie = (event) => {
        event.preventDefault();

        const errors = this.validateForm();

        if(Object.keys(errors).length > 0) {
            this.setState({
                errors: Object.assign({}, this.state.errors, errors),
            });
            return;
        }

        const movieData = this.state.movieData;

        this.setState({
            movieData: {
                title: '',
                image: '',
                genres: [],
            },
            errors: {},
        });
        movieManager.add(movieData)
            .then(addedMovie => this.props.onAddMovie(addedMovie))
            .catch(({ errors }) => {
                // manage error side errors
                const flattenedErrors = errors.reduce((reducedErrors, error) => {
                    reducedErrors[error.field] = error.error;
                    return reducedErrors;
                }, {});

                this.setState({
                    errors: Object.assign({}, this.state.errors, flattenedErrors),
                });
            });
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
                <div className="addMovieSection-fields">
                    <MultiField component={Input} componentProps={{className: 'plop'}} onValueChange={this.changeGenres} values={this.state.movieData.genres} defaultValue=""/>
                </div>
                <button className="addMovie-button" onClick={this.addMovie} disabled={!this.isFilled()}>Add the movie</button>
            </form>
        );
    }
}

export default AddMovieSection;