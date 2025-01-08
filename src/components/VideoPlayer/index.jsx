import './VideoPlayer.css';

const VideoPlayer = ({ video }) => {
  return (
    <div className="video-player-container">
      <div className="video-player">
        <iframe
          src={video.embed}
          title={video.title}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
};

export default VideoPlayer; 