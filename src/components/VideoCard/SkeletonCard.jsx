import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="video-card skeleton">
      <div className="thumbnail-skeleton">
        <div className="duration-skeleton"></div>
      </div>
      <div className="info-skeleton">
        <div className="title-skeleton"></div>
        <div className="meta-skeleton">
          <div className="views-skeleton"></div>
          <div className="date-skeleton"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard; 