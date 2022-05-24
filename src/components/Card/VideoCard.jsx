import { Link } from "react-router-dom";

const VideoCard = ({ videoDetails }) => {
  const { _id, title, videoBy, views, duration, thumbnail } = videoDetails;
  return (
    <div className="card">
      <div className="card-inner-container">
        <div className="card-image">
          <Link to={`/video/${_id}`}>
            <img
              src={thumbnail}
              alt="Lover-music-video"
              className="img"
              loading="lazy"
            />
          </Link>
        </div>
        <div className="card-body">
          <div className="card-desc ft-bolder text-left">{title}</div>
          <div className="card-desc text-left">
            {videoBy} | {views}
          </div>
        </div>
      </div>

      <div className="icons">
        {false ? (
          <Link to="/cart" className="flex-center full-width">
            <button className="btn-primary btn flex-center full-width padding-xs margin">
              Remove From Watch Later
            </button>
          </Link>
        ) : (
          <button className="btn-primary btn flex-center full-width padding-xs margin">
            Add To Watch Later
          </button>
        )}
        <span className="card-badge-text">{duration}</span>
      </div>
    </div>
  );
};
export { VideoCard };
