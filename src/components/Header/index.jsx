import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar';
import './Header.css';

const Header = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderFixed(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className={isHeaderFixed ? 'fixed' : ''}>
      <div className="header-wrapper">
        <div className="header-top">
          <Link to="/" className="logo">
            <h1>
              <span className="x">X</span>
              <span className="porn">Porn</span>
              <span className="hot">Hot</span>
              <span className="dot">•</span>
              <span className="br">BR</span>
            </h1>
          </Link>

          <div className="header-actions">
            <button 
              className={`search-toggle ${showSearch ? 'active' : ''}`}
              onClick={() => setShowSearch(!showSearch)}
            >
              <i className="fas fa-search"></i>
              <span>Buscar</span>
            </button>
          </div>
        </div>

        {showSearch && <SearchBar onSearch={handleSearch} />}
      </div>
    </header>
  );
};

export default Header; 