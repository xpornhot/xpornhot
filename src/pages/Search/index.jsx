import { useParams } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import VideoCard from '../../components/VideoCard';
import SEO from '../../components/SEO';
import './Search.css';

const Search = () => {
  const { query } = useParams();
  const { videos, loading, error, totalResults } = useSearch(query);

  return (
    <div className="search-page">
      <SEO 
        title={`Busca: ${query} - XPornHot BR`}
        description={`Resultados da busca por "${query}" - Encontre os melhores vídeos adultos`}
      />

      <div className="search-header">
        <h1>
          Resultados para: <span>{query}</span>
        </h1>
        {!loading && (
          <p className="results-count">
            {totalResults} {totalResults === 1 ? 'vídeo encontrado' : 'vídeos encontrados'}
          </p>
        )}
      </div>

      {loading && (
        <div className="loading-grid">
          {Array(12).fill(null).map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-thumbnail"></div>
              <div className="skeleton-info">
                <div className="skeleton-title"></div>
                <div className="skeleton-meta"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <span>Erro ao buscar vídeos. Tente novamente mais tarde.</span>
        </div>
      )}

      {!loading && !error && videos.length === 0 && (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <h2>Nenhum resultado encontrado</h2>
          <p>Tente usar termos diferentes ou mais genéricos</p>
        </div>
      )}

      {!loading && !error && videos.length > 0 && (
        <div className="videos-grid">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search; 