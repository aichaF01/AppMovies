import Movie from "./movie";
const Movies = ({ movies, selectedGenre }) => {
  const { id } = selectedGenre;
  const allMovies = movies;
  let filterByGenre = id
    ? allMovies.filter((movie) => movie.genre_ids[0] === id)
    : allMovies;
  return (
    <main className="row g-3">
      {filterByGenre.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </main>
  );
};

export default Movies;
