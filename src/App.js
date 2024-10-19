import React, { Component } from 'react';
import './App.css';
import api_key from './api/api_key';
import Movies from './components/useState/movies';
import GenresList from './components/useState/GenresList';
import SearchBar from './components/SearchBar';
import { useState } from 'react';

const baseUrlDiscover = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&language=en-US`;

function FilterableProductTable({ movies }) {
  const [filterText, setFilterText] = useState('');
  
  return (
    <div>
      <SearchBar
        filterText={filterText}
        onFilterTextChange={setFilterText}
      />
      <div className='col-10'>
        <Movies movies={movies} filterText={filterText} />
      </div>
    </div>
  );
}

class App extends Component {
  state = {
    movies: [],
    selectedGenre: {
      id: null,
      name: 'All Movies',
    },
    filterText: '',
  };

  async fetchMovies(genre) {
    const url1 = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${api_key}`;
    let response;
    try {
      if (genre) {
        const url2 = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&language=en-US&page=1&api_key=${api_key}`;
        response = await fetch(url2);
      } else response = await fetch(url1);
      const data = await response.json();
      this.setState({ movies: data.results });
      console.log(data.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  handleSelectedGenre = (genre) => {
    this.setState({ selectedGenre: genre });
    // Rafraîchir les films lors de la sélection du genre
    this.fetchMovies(genre);
  };

  handleFilterTextChange = (filterText) => {
    this.setState({ filterText });
    this.handleSearch(filterText);
  };

  handleSearch = (value) => {
    if (!value) {
      // Si aucun texte de recherche, restaurer tous les films
      this.fetchMovies();
    } else {
      const ModifyMovies = this.state.movies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      this.setState({ movies: ModifyMovies });
    }
  };

  componentDidMount() {
    this.fetchMovies();
  }

  render() {
    const { movies, selectedGenre, filterText } = this.state;

    return (
      <>
        <div className='App mt-4'>
          <div className='row'>
            <div className='col-2'>
              <GenresList
                movies={movies}
                onSelectedGenre={this.handleSelectedGenre}
                selectedGenre={selectedGenre}
              />
            </div>
            <div className='col-10'>
              <SearchBar
                filterText={filterText}
                onFilterTextChange={this.handleFilterTextChange}
              />
              <Movies movies={movies} filterText={filterText} selectedGenre={selectedGenre} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
