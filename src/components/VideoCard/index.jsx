import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatViews, timeAgo, generateSlug } from '../../utils/format';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoSlug = generateSlug(video.title);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link to={`/watch/${video.id}/${videoSlug}`} className="video-card">
      <div className="thumbnail">
        <img 
          src={video.thumb_selected} 
          alt={video.title} 
          loading="lazy"
          onLoad={handleImageLoad}
          className={imageLoaded ? 'loaded' : ''}
        />
        <div className="video-duration">
          <i className="fas fa-play-circle"></i> {video.length_min}
        </div>
        <div className="hover-info">
          <i className="fas fa-play"></i>
        </div>
      </div>

      <div className="video-info">
        <h3>{video.title}</h3>
        <div className="video-metadata">
          <div className="stats">
            <span className="views">
              <i className="fas fa-eye"></i> {formatViews(video.views)}
            </span>
            <span className="rating">
              <i className="fas fa-thumbs-up"></i> {video.rate}
            </span>
          </div>
          <span className="date">
            <i className="far fa-clock"></i> {timeAgo(video.added)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard; 