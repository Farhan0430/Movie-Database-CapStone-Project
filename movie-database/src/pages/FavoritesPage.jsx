import { useState } from "react";
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";

export default function FavoritesPage({ favorites, removeFavorite }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  const handleMovieClick = (imdbID) => {
    setLoadingDetails(true);
    fetch(`${API_URL}&i=${imdbID}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMovie(data);
        setLoadingDetails(false);
      })
      .catch(() => {
        setError("Failed to fetch movie details.");
        setLoadingDetails(false);
      });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-black p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">⭐ Favorites</h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {favorites.length === 0 ? (
        <p className="text-center text-white">No favorites added yet.</p>
      ) : (
        <MovieList
          movies={favorites}
          onMovieClick={handleMovieClick}
          favorites={favorites}
          removeFavorite={removeFavorite}
          addFavorite={() => {}}
        />
      )}

      {loadingDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="w-12 h-12 border-4 border-white border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          favorites={favorites}
          addFavorite={() => {}}
          removeFavorite={removeFavorite}
        />
      )}
    </div>
  );
}
