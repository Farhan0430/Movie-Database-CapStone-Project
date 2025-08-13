function MovieDetails({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">
          {movie.Title} ({movie.Year})
        </h2>

        <p className="mb-2">
          <strong>Genre:</strong> {movie.Genre || 'N/A'}
        </p>

        <p className="mb-2">
          <strong>Cast:</strong> {movie.Actors || 'N/A'}
        </p>

        <p className="mb-2">
          <strong>Plot:</strong> {movie.Plot || 'N/A'}
        </p>

        <div className="mb-2">
          <strong>Ratings:</strong>
          <ul>
            {movie.Ratings && movie.Ratings.length > 0 ? (
              movie.Ratings.map((rating, idx) => (
                <li key={idx}>
                  {rating.Source}: {rating.Value}
                </li>
              ))
            ) : (
              <li>N/A</li>
            )}
          </ul>
        </div>

        {movie.Poster && movie.Poster !== 'N/A' && (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full mt-2 rounded"
          />
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
