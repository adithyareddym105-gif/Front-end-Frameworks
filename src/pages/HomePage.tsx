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
        setError("something went wrong loading movies");
        setLoading(false);
      });
  }, []);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <h1>Movie App</h1>
      <SearchBar query={query} onChange={setQuery} />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <MovieList movies={filteredMovies} />}
    </div>
  );
}

export default HomePage;
