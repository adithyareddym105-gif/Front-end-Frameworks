import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

function Header() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-logo">
          <span className="logo-dot" />
          <span className="logo-text">CineGrid</span>
          <span className="brand-badge">MOVIES</span>
        </Link>

        <nav className="header-actions">
          <Link to="/" className="btn-icon-label">
            Home
          </Link>

          <Link to="/favourites" className="btn-icon-label">
            Favourites
          </Link>

          <Link to="/watchlist" className="btn-icon-label">
            Watchlist
          </Link>

          <Link to="/quiz" className="btn-icon-label">
            Quiz
          </Link>

          <Link to="/about" className="btn-icon-label">
            About
          </Link>

          <button className="btn-icon-label" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
