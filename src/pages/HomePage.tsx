import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import { fetchPopularMovies } from "../api/tmdb";
import type { Movie } from "../types";

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPopularMovies()
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong loading movies.");
        setLoading(false);
      });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <main className="main-container">
      <div className="page-heading">
        <div>
          <p className="eyebrow">DISCOVER</p>
          <h1>Popular Movies</h1>
        </div>

        <SearchBar query={query} onChange={setQuery} />
      </div>

      {loading && <p>Loading movies...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <MovieList movies={filteredMovies} />}
    </main>
  );
}

export default HomePage;
