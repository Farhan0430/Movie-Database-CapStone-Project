import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";

export default function HomePage({ favorites, addFavorite, removeFavorite }) {
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
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black text-black">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">🎬 Movie Database</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">🔥 Trending Movies</h2>
          <MovieList
            movies={trending}
            onMovieClick={handleMovieClick}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </section>

        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">🆕 New Releases (2025)</h2>
          <MovieList
            movies={newReleases}
            onMovieClick={handleMovieClick}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        </section>

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
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        )}
      </div>
    </div>
  );
}
