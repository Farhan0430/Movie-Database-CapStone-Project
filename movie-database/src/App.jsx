import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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
          if (data.Response === 'True') {
            setMovies(data.Search);
            setError(null);
          } else {
            setMovies([]);
            setError(data.Error);
          }
        })
        .catch(() => {
          setError('Failed to fetch movie data. Please try again.');
          setMovies([]);
        });
    }
  }, [searchQuery]);

  // Fetch full details when a movie is clicked
  const handleMovieClick = (imdbID) => {
    setLoadingDetails(true);
    fetch(`${API_URL}&i=${imdbID}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedMovie(data);
        setLoadingDetails(false);
      })
      .catch(() => {
        setError('Failed to fetch movie details.');
        setLoadingDetails(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Movie Database</h1>
      <SearchBar onSearch={setSearchQuery} />

      {error && <p className="text-red-500 text-center">{error}</p>}

      {movies.length > 0 && (
        <MovieList movies={movies} onMovieClick={handleMovieClick} />
      )}

      {loadingDetails && <p className="text-center mt-4">Loading details...</p>}

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
