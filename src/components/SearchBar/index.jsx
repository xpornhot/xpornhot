import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/search/${encodeURIComponent(trimmedQuery)}`);
      setQuery('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar vídeos..."
        aria-label="Buscar vídeos"
        minLength={2}
        required
      />
      <button type="submit" aria-label="Buscar">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar; 