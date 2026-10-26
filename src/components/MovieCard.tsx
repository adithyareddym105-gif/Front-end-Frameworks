import type { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies";
import { useAppContext } from "../context/AppContext";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const { toggleFavorite, isFavorite, toggleWatchlist, isInWatchlist } =
    useAppContext();

  const favorite = isFavorite(movie.id);
  const inWatchlist = isInWatchlist(movie.id);

  return (
    <div className="movie-card">
      <div className="poster-wrapper">
        <img
          className="poster-img"
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
        />

        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>

            <button
              className={`favorite-btn ${favorite ? "is-favorite" : ""}`}
              onClick={() => toggleFavorite(movie)}
              aria-label={
                favorite ? "Remove from favourites" : "Add to favourites"
              }
            >
              {favorite ? "♥" : "♡"}
            </button>
          </div>

          <button
            className="quick-view-hint"
            onClick={() => toggleWatchlist(movie)}
          >
            {inWatchlist ? "✓ In Watchlist" : "+ Watchlist"}
          </button>
        </div>
      </div>

      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>

        <div className="movie-card-meta">
          <span>{movie.release_date?.slice(0, 4) || "N/A"}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
