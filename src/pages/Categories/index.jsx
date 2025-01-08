import { Link } from 'react-router-dom';
import './Categories.css';

const categories = [
  { id: 'amateur', name: 'Amadoras', icon: 'user' },
  { id: 'brazilian', name: 'Brasileiras', icon: 'flag' },
  { id: 'trending', name: 'Em Alta', icon: 'fire' },
  // Adicione mais categorias conforme necessário
];

const Categories = () => {
  return (
    <div className="categories-page">
      <h2>Categorias</h2>
      <div className="categories-grid">
        {categories.map(category => (
          <Link 
            key={category.id} 
            to={`/categories/${category.id}`}
            className="category-card"
          >
            <i className={`fas fa-${category.icon}`}></i>
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories; 