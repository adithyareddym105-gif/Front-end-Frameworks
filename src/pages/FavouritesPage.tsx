import { useAppContext } from "../context/AppContext";
import MovieCard from "../components/MovieCard";

function FavouritesPage() {
  const { favorites } = useAppContext();

  return (
    <main className="main-container">
      <h1>My Favourites</h1>

      {favorites.length === 0 ? (
        <p>You have no favourite movies yet.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default FavouritesPage;
