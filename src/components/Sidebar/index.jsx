import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;

  const handleSort = (value) => {
    navigate(`/?sort=${value}`);
    onClose();
  };

  const handleCategoryClick = () => {
    onClose();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-section">
        <h3>Ordenar por</h3>
        <ul className="sort-options">
          <li>
            <button 
              className={isActive('/?sort=trending') ? 'active' : ''}
              onClick={() => handleSort('trending')}
            >
              <i className="fas fa-fire"></i>
              Em Alta
            </button>
          </li>
          <li>
            <button 
              className={isActive('/?sort=newest') ? 'active' : ''}
              onClick={() => handleSort('newest')}
            >
              <i className="fas fa-clock"></i>
              Mais Recentes
            </button>
          </li>
          <li>
            <button 
              className={isActive('/?sort=most-viewed') ? 'active' : ''}
              onClick={() => handleSort('most-viewed')}
            >
              <i className="fas fa-eye"></i>
              Mais Visualizados
            </button>
          </li>
          <li>
            <button 
              className={isActive('/?sort=top-rated') ? 'active' : ''}
              onClick={() => handleSort('top-rated')}
            >
              <i className="fas fa-thumbs-up"></i>
              Melhor Avaliados
            </button>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Duração</h3>
        <ul className="duration-options">
          <li>
            <button onClick={() => handleSort('shortest')}>
              <i className="fas fa-hourglass-start"></i>
              Curtos (0-10 min)
            </button>
          </li>
          <li>
            <button onClick={() => handleSort('medium')}>
              <i className="fas fa-hourglass-half"></i>
              Médios (10-20 min)
            </button>
          </li>
          <li>
            <button onClick={() => handleSort('longest')}>
              <i className="fas fa-hourglass-end"></i>
              Longos (+20 min)
            </button>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Categorias Populares</h3>
        <ul className="category-options">
          <li>
            <Link to="/search/amador" onClick={handleCategoryClick}>
              <i className="fas fa-camera"></i>
              Amador
            </Link>
          </li>
          <li>
            <Link to="/search/brasileiras" onClick={handleCategoryClick}>
              <i className="fas fa-flag"></i>
              Brasileiras
            </Link>
          </li>
          <li>
            <Link to="/search/novinhas" onClick={handleCategoryClick}>
              <i className="fas fa-female"></i>
              Novinhas
            </Link>
          </li>
          <li>
            <Link to="/search/anal" onClick={handleCategoryClick}>
              <i className="fas fa-heart"></i>
              Anal
            </Link>
          </li>
          <li>
            <Link to="/search/lesbian" onClick={handleCategoryClick}>
              <i className="fas fa-venus-double"></i>
              Lésbicas
            </Link>
          </li>
          <li>
            <Link to="/search/milf" onClick={handleCategoryClick}>
              <i className="fas fa-star"></i>
              MILF
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar; 