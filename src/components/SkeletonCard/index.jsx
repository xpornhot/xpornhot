import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-thumbnail pulse"></div>
      <div className="skeleton-info">
        <div className="skeleton-title pulse"></div>
        <div className="skeleton-meta pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonCard; 