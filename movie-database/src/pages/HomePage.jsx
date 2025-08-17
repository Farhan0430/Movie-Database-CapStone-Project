import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

  const trendingTitles = [
    "Inception",
    "The Dark Knight",
    "Interstellar",
    "Avengers: Endgame",
    "Spider-Man: No Way Home",
  ];

  useEffect(() => {
    Promise.all(
      trendingTitles.map((title) =>
        fetch(`${API_URL}&t=${encodeURIComponent(title)}`)
          .then((res) => res.json())
          .catch(() => null)
      )
    ).then((results) => {
      const validMovies = results.filter((movie) => movie && movie.Response === "True");
      setTrending(validMovies.slice(0, 5));
    });

    fetch(`${API_URL}&s=movie&y=2025&type=movie`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setNewReleases(data.Search.slice(0, 5));
        } else {
          setError("No new releases found.");
        }
      })
      .catch(() => setError("Failed to fetch new releases."));
  }, []);

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
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🎬 Movie Database</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">🔥 Trending Movies</h2>
        <MovieList movies={trending} onMovieClick={handleMovieClick} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">🆕 New Releases (2025)</h2>
        <MovieList movies={newReleases} onMovieClick={handleMovieClick} />
      </section>

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
