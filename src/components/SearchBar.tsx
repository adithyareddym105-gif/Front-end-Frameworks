interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search movies..."
    />
  );
}

export default SearchBar;
