import type { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies";
import { useAppContext } from "../context/AppContext";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const { toggleFavorite, isFavorite } = useAppContext();
  const favorite = isFavorite(movie.id);

  return (
    <div className="movie-card">
      <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.vote_average.toFixed(1)}</p>
      <button onClick={() => toggleFavorite(movie)}>
        {favorite ? "Remove from Favourites" : "Add to Favourites"}
      </button>
    </div>
  );
}

export default MovieCard;
