function MovieDetails({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="
          bg-white rounded-lg p-6 w-full max-w-3xl relative 
          max-h-[90vh] overflow-y-auto mx-4
        "
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-gray-200 rounded-full p-1.5 text-gray-700 hover:text-gray-900 shadow"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">
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

        <div className="mb-4">
          <strong>Ratings:</strong>
          <ul className="list-disc list-inside">
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

        {movie.Poster && movie.Poster !== "N/A" && (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full rounded"
          />
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
