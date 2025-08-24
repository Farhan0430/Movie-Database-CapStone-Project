function MovieList({ movies, onMovieClick, favorites = [], addFavorite, removeFavorite }) {
  if (!movies || movies.length === 0)
    return <p className="text-center">No movies found.</p>;

  const isFavorite = (movie) => favorites.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="bg-white rounded-lg shadow relative overflow-hidden w-full"
        >
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
            alt={movie.Title}
            className="w-full h-64 object-cover cursor-pointer"
            onClick={() => onMovieClick(movie.imdbID)}
          />

          {/* Favorite Button */}
          <button
            className={`absolute top-2 right-2 p-1 rounded-full text-xl ${
              isFavorite(movie) ? "text-orange-500" : "text-gray-400"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              isFavorite(movie) ? removeFavorite(movie.imdbID) : addFavorite(movie);
            }}
          >
            ★
          </button>

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
