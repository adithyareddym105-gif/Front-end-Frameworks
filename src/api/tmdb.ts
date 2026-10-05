import type { Movie } from "../types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// grabs the current popular movies from TMDB
export async function fetchPopularMovies(): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (!res.ok) {
    throw new Error("couldn't fetch movies: " + res.statusText);
  }

  const data = await res.json();
  return data.results;
}
