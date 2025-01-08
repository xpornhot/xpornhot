import { useState, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import VideoCard from '../../components/VideoCard';
import SkeletonCard from '../../components/SkeletonCard';
import Pagination from '../../components/Pagination';
import { useVideos } from '../../hooks/useVideos';
import SEO from '../../components/SEO';
import './Home.css';

// Memoize VideoCard para evitar re-renders desnecessários
const MemoizedVideoCard = memo(VideoCard);

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || 'trending';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { videos, loading, error, totalPages } = useVideos({ sort, page });

  const handlePageChange = (newPage) => {
    setSearchParams({ sort, page: newPage.toString() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home">
      <SEO 
        title="X Videos - Os melhores vídeos da internet" 
        description="Assista aos melhores vídeos da internet gratuitamente"
      />

      <div className="home-content">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="videos-container">
          <div className="videos-grid">
            {loading ? (
              // Skeleton loading
              Array.from({ length: 20 }).map((_, index) => (
                <SkeletonCard key={`skeleton-${index}`} />
              ))
            ) : error ? (
              <div className="error">
                <i className="fas fa-exclamation-circle"></i>
                <p>{error}</p>
              </div>
            ) : videos.length > 0 ? (
              videos.map(video => (
                <MemoizedVideoCard key={video.id} video={video} />
              ))
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <h2>Nenhum vídeo encontrado</h2>
                <p>Tente mudar os filtros de busca</p>
              </div>
            )}
          </div>

          {totalPages > 1 && !loading && !error && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>

      <button 
        className="sidebar-toggle" 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Filters"
      >
        <i className={`fas fa-${sidebarOpen ? 'times' : 'filter'}`}></i>
      </button>

      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Home; 