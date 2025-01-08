import { useRouteError } from 'react-router-dom';
import './ErrorBoundary.css';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="error-container">
      <div className="error-content">
        <i className="fas fa-exclamation-triangle"></i>
        <h1>Oops! Algo deu errado</h1>
        <p>
          {error?.message || 'Ocorreu um erro inesperado. Por favor, tente novamente.'}
        </p>
        <button onClick={() => window.location.href = '/'}>
          Voltar para Home
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary; 