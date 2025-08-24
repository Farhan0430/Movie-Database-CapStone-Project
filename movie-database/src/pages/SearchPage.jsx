import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";

export default function SearchPage({ favorites, addFavorite, removeFavorite }) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  useEffect(() => {
    if (searchQuery) {
      fetch(`${API_URL}&s=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.Response === "True") {
            setMovies(data.Search);
            setError(null);
          } else {
            setMovies([]);
            setError(data.Error);
          }
        })
        .catch(() => {
          setError("Failed to fetch movie data. Please try again.");
          setMovies([]);
        });
    }
  }, [searchQuery]);

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
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-black flex flex-col items-center">
      <div className="w-full max-w-3xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">🔍 Search Movies</h1>

        {/* Search Box */}
        <div className="bg-white shadow-lg rounded-2xl p-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search movies..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setSearchQuery(searchQuery)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-blue-600 text-black font-medium hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Movie Results */}
        {movies.length > 0 && (
          <div className="mt-6">
            <MovieList
              movies={movies}
              onMovieClick={handleMovieClick}
              favorites={favorites}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </div>
        )}

        {/* Loading State */}
        {loadingDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="w-12 h-12 border-4 border-white border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* Movie Details */}
        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        )}
      </div>
    </div>
  );
}
