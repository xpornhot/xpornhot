import { useParams, Navigate } from 'react-router-dom';
import { useVideo } from '../../hooks/useVideo';
import { generateSlug } from '../../utils/format';
import VideoPlayer from '../../components/VideoPlayer';
import VideoInfo from '../../components/VideoInfo';
import RelatedVideos from '../../components/RelatedVideos';
import SEO from '../../components/SEO';
import './Watch.css';

const Watch = () => {
  const { videoId, slug } = useParams();
  const { video, loading, error } = useVideo(videoId);

  if (loading) {
    return (
      <div className="watch-page loading">
        <div className="loading-animation">
          <i className="fas fa-spinner fa-spin"></i>
          <span>Carregando vídeo...</span>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return <Navigate to="/404" replace />;
  }

  const correctSlug = generateSlug(video.title);
  if (slug !== correctSlug) {
    return <Navigate to={`/watch/${videoId}/${correctSlug}`} replace />;
  }

  return (
    <div className="watch-page">
      <SEO 
        title={`${video.title} - XPornHot BR`}
        description={`Assista ${video.title} - ${video.keywords}`}
        image={video.thumb_selected}
        video={{
          duration: video.length_sec,
          uploadDate: video.added,
          thumbnailUrl: video.thumb_selected,
          contentUrl: video.embed
        }}
      />

      <div className="watch-container">
        <div className="main-content">
          <div className="video-section">
            <VideoPlayer video={video} />
            <VideoInfo video={video} />
          </div>
        </div>
        <div className="related-section">
          <RelatedVideos currentVideoId={video.id} />
        </div>
      </div>
    </div>
  );
};

export default Watch; 