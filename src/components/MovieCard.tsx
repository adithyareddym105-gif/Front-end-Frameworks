import { useState } from "react";
import type { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <div className="movie-card">
      <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.vote_average.toFixed(1)}</p>
      <button onClick={() => setIsFavourite((prev) => !prev)}>
        {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
      </button>
    </div>
  );
}

export default MovieCard;
