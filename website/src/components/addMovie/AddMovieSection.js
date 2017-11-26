import React from 'react';
import PropTypes from 'prop-types';

import { movieManager } from 'MovieManager';

import FormFieldSet from 'components/form/FormFieldSet';
import GenresField from 'components/form/GenresField';
import MultiFieldInput from 'components/form/MultiFieldInput';
import MultiField from 'components/form/MultiField';

import './addMovie.css'

const defaultMovieData = {
    title: '',
    image: '',
    genre: [],
    alternative_titles: [],
};

/**
 * The form to add a movie
 */
class AddMovieSection extends React.Component {

    static propTypes = {
        onAddMovie: PropTypes.func.isRequired,
    };

    state = {
        movieData: defaultMovieData,
        existingGenres: [],
        errors: {}
    };


    componentWillMount() {
       this.refreshExistingGenres();
    }

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
            movieData: Object.assign({}, this.state.movieData, { genre: genres }),
        });
    };

    changeAlternateTitles = (alternateTitles) => {
        this.setState({
            movieData: Object.assign({}, this.state.movieData, { alternative_titles: alternateTitles }),
        });
    };

    refreshExistingGenres = () => {
        movieManager.getAllGenres().then(genres => {
            this.setState({
                existingGenres: genres.map(genre => genre.name),
            });
        }).catch(err => {
            console.error(err);
            this.setState({
                existingGenresFetchError: 'Error while fetching the genres suggestions, they will not be available for now',
            });
        });
    };

    validateForm = () => {
        const errors = {};
        if(!this.state.movieData.title) errors.title = 'You need to set a title for this movie';
        if(!this.state.movieData.image) errors.image = 'You need to set an image for this movie';
        else if(!this.state.movieData.image.match(/^https?:\/\/.+/)) errors.image = 'The image is not a valid URL';

        return errors;
    };

    isFilled = () => {
        const errors = this.validateForm();
        return Object.keys(errors).length === 0;
    };

    addMovie = (event) => {
        event.preventDefault();

        // clean data before trying to send the form
        this.setState({
            movieData: Object.assign({}, this.state.movieData, {
                title: this.state.movieData.title.trim(),
                image: this.state.movieData.image.trim(),
                genre: this.state.movieData.genre.filter(genre => genre.trim() !== "")
            }),
        }, this.submitForm);
    };

    submitForm = () => {
        const errors = this.validateForm();

        if(Object.keys(errors).length > 0) {
            this.setState({
                errors: Object.assign({}, this.state.errors, errors),
            });
            return;
        }

        const movieData = this.state.movieData;

        this.setState({
            movieData: defaultMovieData,
            errors: {},
        });
        movieManager.add(movieData)
            .then(addedMovie => this.props.onAddMovie(addedMovie))
            .then(() => this.refreshExistingGenres())
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
                <FormFieldSet>
                    <label htmlFor="addMovie-title">Movie's title</label>
                    <input
                        type="text"
                        id="addMovie-title"
                        placeholder="Ex: Star wars"
                        value={this.state.movieData.title}
                        onChange={this.changeTitle}
                    />
                    <div className="addMovieSection-error">{this.state.errors.title}</div>
                </FormFieldSet>
                <FormFieldSet>
                    <label htmlFor="addMovie-alternate-titles-0">Movie's alternate titles</label>
                    <MultiField
                        id="addMovie-alternate-titles"
                        component={MultiFieldInput}
                        values={this.state.movieData.alternative_titles}
                        onValueChange={this.changeAlternateTitles}
                    />
                </FormFieldSet>
                <FormFieldSet>
                    <label htmlFor="addMovie-poster">Poster's url</label>
                    <input
                        type="url"
                        id="addMovie-poster"
                        placeholder="Ex: http://myImg.com/id"
                        value={this.state.movieData.image}
                        onChange={this.changeImage}
                    />
                    <div className="addMovieSection-error">{this.state.errors.image}</div>
                </FormFieldSet>
                <GenresField
                    id="addMovie-genres"
                    label="Movie's genres"
                    onValueChange={this.changeGenres}
                    values={this.state.movieData.genre}
                    existingGenres={this.state.existingGenres}
                    existingGenresFetchError={this.state.existingGenresFetchError}
                />
                <button className="addMovie-button" onClick={this.addMovie} disabled={!this.isFilled()}>Add the movie</button>
            </form>
        );
    }
}

export default AddMovieSection;