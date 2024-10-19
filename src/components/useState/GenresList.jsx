import React, { Component } from "react";
import api_key from "../../api/api_key";

const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;
class GenresList extends Component {
  state = {
    genres: [
      {
        id: 0,
        name: "All Movies",
      },
    ],
  };

  async fetchGenres() {
    try {
      const response = await fetch(genresUrl);
      const data = await response.json();
      this.setState({ genres: data.genres });
      console.log(data.genres);
    } catch (error) {
      console.log(error.message);
    }
  }
  componentDidMount() {
    this.fetchGenres();
  }

  setClasses = (id) => {
    let classes = "list-group-item ";
    return id === this.props.selectedGenre.id ? (classes += "active") : classes;
  };
  render() {
    return (
      <ul className="list-group">
        {this.state.genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => this.props.onSelectedGenre(genre)}
            className={this.setClasses(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </ul>
    );
  }

  // render() {
  //   return (
  //     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  //       <div className="container-fluid">
  //         {this.state.genres.map((genre) => (
  //           <a
  //             href="#"
  //             key={genre.id}
  //             className="navbar-brand"
  //             onClick={() => this.props.onSelectedGenre(genre)}
  //           >
  //             {genre.name}
  //           </a>
  //         ))}
  //       </div>
  //     </nav>
  //   );
  // }
}

export default GenresList;
