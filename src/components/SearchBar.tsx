interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="header-search">
      <div className="search-input-wrapper">
        <span className="search-icon">⌕</span>

        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search movies..."
        />

        {query && (
          <button
            className="search-clear-btn"
            onClick={() => onChange("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
