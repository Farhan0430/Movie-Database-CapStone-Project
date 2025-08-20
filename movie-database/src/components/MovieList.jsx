function MovieList({ movies, onMovieClick }) {
  if (!movies || movies.length === 0)
    return <p className="text-center">No movies found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="bg-white rounded-lg shadow cursor-pointer overflow-hidden w-full"
          onClick={() => onMovieClick(movie.imdbID)}
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
            alt={movie.Title}
            className="w-full h-64 object-cover"
          />
          <div className="p-2">
            <h3 className="text-lg font-semibold">{movie.Title}</h3>
            <p className="text-gray-600">({movie.Year})</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
