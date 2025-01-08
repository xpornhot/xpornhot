import { formatViews, timeAgo } from '../../utils/format';
import './VideoInfo.css';

const VideoInfo = ({ video }) => {
  const keywords = video.keywords.split(',').map(k => k.trim());

  return (
    <div className="video-info-container">
      <h1>{video.title}</h1>
      
      <div className="video-stats">
        <div className="stats-left">
          <span className="views">
            <i className="fas fa-eye"></i> {formatViews(video.views)} visualizações
          </span>
          <span className="rating">
            <i className="fas fa-thumbs-up"></i> {video.rate}
          </span>
          <span className="duration">
            <i className="fas fa-clock"></i> {video.length_min}
          </span>
        </div>
        <div className="stats-right">
          <span className="date">
            Adicionado {timeAgo(video.added)}
          </span>
        </div>
      </div>

      <div className="video-tags">
        {keywords.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default VideoInfo; 