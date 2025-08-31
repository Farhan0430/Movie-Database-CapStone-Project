# Movie-Database-Capstone-Project

ALX Movie Database Capstone Project

## Overview
This is a React-based movie database application that allows users to search for movies, view detailed information, and manage a favorites list. The app fetches movie data from the [OMDB API](http://www.omdbapi.com/) and displays results in a responsive UI designed with Tailwind CSS.

## Features
- **Search Movies:** Users can search for movies by name.
- **Movie List:** Displays a grid of movies matching the search query, showing:
  - Poster thumbnail
  - Title
  - Release year
- **Movie Details View:** Clicking a movie opens a modal with detailed information including:
  - Plot Summary
  - Cast
  - Ratings from different sources
  - Genre
  - Loading spinner while data is fetched
- **Favorites:** 
  - Add or remove movies from a favorites list
  - Access a dedicated Favorites page showing all saved movies
- **Error Handling:** Displays messages for no results, invalid searches, or failed fetches.
- **Responsive UI:** Layout adapts to desktop, tablet, and mobile screens.

## Tech Stack
- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **API:** OMDB API
