import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addtoWatchLater,
  removeFromWatchLater,
} from "../../redux/features/playlist/playlistSlice";
const VideoCard = ({ videoDetails }) => {
  const { _id, title, videoBy, views, duration, thumbnail } = videoDetails;
  const dispatch = useDispatch();
  const { encodedToken } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const addToWatchlaterHandler = (videoDetails) => {
    if (!encodedToken) {
      navigate("/login");
    } else {
      dispatch(addtoWatchLater(videoDetails))
        .then((res) => toast.success("Video added to Watch Later!"))
        .catch((error) => toast.error(error));
    }
  };
  const removeFromWatchlaterHandler = (id) => {
    if (!encodedToken) {
      navigate("/login");
    } else {
      dispatch(removeFromWatchLater(id))
        .then((res) => toast.success("Video removed from Watch Later!"))
        .catch((error) => toast.error(error));
    }
  };
  const { watchLater } = useSelector((store) => store.playlist);
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
          <div className="card-desc text-left flex-center icon-gap">
            {videoBy} | <i className="fas fa-eye"></i> {views}
          </div>
        </div>
      </div>
      <div className="icons">
        {watchLater.some((video) => video._id === _id) ? (
          <button
            className="btn-secondary btn flex-center full-width padding-xs margin"
            onClick={() => removeFromWatchlaterHandler(_id)}
          >
            Remove From Watch Later
          </button>
        ) : (
          <button
            className="btn-primary btn flex-center full-width padding-xs margin"
            onClick={() => addToWatchlaterHandler(videoDetails)}
          >
            Add To Watch Later
          </button>
        )}
        <span className="card-badge-text">
          {" "}
          <i className="far fa-hourglass inner-icon"></i>
          {duration}
        </span>
      </div>
    </div>
  );
};
export { VideoCard };
