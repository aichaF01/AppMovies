function SearchBar({ filterText, onFilterTextChange }) {
  return (
    <form className="mb-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={filterText}
          placeholder="Rechercher un film..."
          onChange={(e) => onFilterTextChange(e.target.value)}
        />
      </div>
    </form>
  );
}

export default SearchBar;
