import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import { useState, useEffect } from "react";

function App() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites((prev) => {
      if (!prev.find((m) => m.imdbID === movie.imdbID)) {
        return [...prev, movie];
      }
      return prev;
    });
  };

  const removeFavorite = (imdbID) => {
    setFavorites((prev) => prev.filter((m) => m.imdbID !== imdbID));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-gray-800 text-white p-4 flex justify-center gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/search" className="hover:underline">Search</Link>
          <Link to="/favorites" className="hover:underline">Favorites</Link>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<HomePage favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite} />} />
          <Route path="/search" element={<SearchPage favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite} />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} removeFavorite={removeFavorite} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;