import { useRelatedVideos } from '../../hooks/useRelatedVideos';
import VideoCard from '../VideoCard';
import './RelatedVideos.css';

const RelatedVideos = ({ currentVideoId }) => {
  const { videos, loading, error } = useRelatedVideos(currentVideoId);

  if (loading) {
    return (
      <div className="related-videos">
        <h2>Vídeos Relacionados</h2>
        <div className="related-videos-grid">
          {Array(10).fill(null).map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-thumbnail"></div>
              <div className="skeleton-info">
                <div className="skeleton-title"></div>
                <div className="skeleton-meta"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return null; // Não mostra nada se houver erro
  }

  return (
    <div className="related-videos">
      <h2>Vídeos Relacionados</h2>
      <div className="related-videos-grid">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default RelatedVideos; 