import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>404 - Página não encontrada</h2>
      <p>A página que você está procurando não existe.</p>
      <Link to="/" className="back-home">
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound; 