const Movie = ({ movie }) => {
  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div className="card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt=""
          className="card-imgt-top"
        />
        <div className="card-body">
          <h5 className="card-title">
            {movie?.title || movie?.original_title}
          </h5>
          {/* <h3> {movie.genre_ids[0]} </h3> */}
          <p className="card-text">
            {movie.overview.length > 150
              ? movie.overview.split(" ").slice(0, 20).join(" ")
              : movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
