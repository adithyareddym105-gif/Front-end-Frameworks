import { useAppContext } from "../context/AppContext";
import MovieCard from "../components/MovieCard";

function WatchlistPage() {
  const { watchlist } = useAppContext();

  return (
    <main className="main-container">
      <h1>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="movies-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default WatchlistPage;
