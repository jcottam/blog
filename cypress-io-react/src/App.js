import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = { movies: [], selectedMovie: null }
    this.fetchData()
    this.selectMovie = this.selectMovie.bind(this)
  }

  fetchData = async () => {
    const movieOptions = [
      'tt3896198',
      'tt0071253',
      'tt0109686',
      'tt2267998',
      'tt0109040',
      'tt0083658',
      'tt0106611',
      'tt0302886',
      'tt0092099',
      'tt0089218'
    ]
    const requests = movieOptions.map(id => {
      return axios.get(`https://www.omdbapi.com/?i=${id}&apikey=9733f1df`)
    })

    Promise.all(requests).then(result => {
      const movies = []
      result.forEach(val => {
        movies.push(val.data)
      })
      this.setState({ movies })
    })
  }

  selectMovie = selectedMovie => {
    this.setState({ selectedMovie })
  }

  render() {
    const title = this.state.selectedMovie
      ? this.state.selectedMovie.Title
      : 'Select a movie from below'

    const releaseDate = this.state.selectedMovie
      ? this.state.selectedMovie.Released
      : ''

    const MovieItems = this.state.movies.map((movie, index) => {
      return (
        <div
          className="movie-item"
          data-cy={'movie-' + index}
          index={index}
          key={index}
          onClick={() => this.selectMovie(movie)}
        >
          <div className="backdrop">
            <img
              src={movie.Poster}
              className="movie-poster"
              data-cy="movie-poster"
              alt={movie.Title}
            />
            {movie.Title}
          </div>
        </div>
      )
    })

    return (
      <div className="app">
        <header data-cy="header">
          <h1>
            Testing with{' '}
            <a
              href="https://cypress.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cypress.io
            </a>
          </h1>
          <p className="selected-movie" data-cy="selected-movie">
            <span className="title">{title}</span>
            <span className="release-date">{releaseDate}</span>
          </p>
        </header>
        <div className="movie-list" data-cy="movie-list">
          {MovieItems}
        </div>
        <footer>
          <img src={logo} className="app-logo" alt="logo" /> Built with React.
          Tested with Cypress.
        </footer>
      </div>
    )
  }
}

export default App
