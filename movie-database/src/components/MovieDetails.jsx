function MovieDetails({ movie, onClose, favorites, addFavorite, removeFavorite }) {
  if (!movie) return null;

  // Check if this movie is already a favorite
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(movie);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto mx-4"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 rounded-full p-1.5 text-gray-700 hover:text-gray-900 shadow"
        >
          ✕
        </button>

        {/* Movie Title */}
        <h2 className="text-2xl font-bold mb-4">
          {movie.Title} ({movie.Year})
        </h2>

        {/* Poster with favorite star */}
        {movie.Poster && movie.Poster !== "N/A" && (
          <div className="relative w-full mb-4">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full rounded"
            />
            {/* Favorite Star Button */}
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-2 right-2 text-3xl ${
                isFavorite ? "text-orange-400" : "text-gray-300"
              } hover:text-orange-400 transition`}
            >
              ★
            </button>
          </div>
        )}

        {/* Movie Info */}
        <p className="mb-2"><strong>Genre:</strong> {movie.Genre || 'N/A'}</p>
        <p className="mb-2"><strong>Cast:</strong> {movie.Actors || 'N/A'}</p>
        <p className="mb-2"><strong>Plot:</strong> {movie.Plot || 'N/A'}</p>

        <div className="mb-4">
          <strong>Ratings:</strong>
          <ul className="list-disc list-inside">
            {movie.Ratings && movie.Ratings.length > 0 ? (
              movie.Ratings.map((rating, idx) => (
                <li key={idx}>{rating.Source}: {rating.Value}</li>
              ))
            ) : (
              <li>N/A</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
