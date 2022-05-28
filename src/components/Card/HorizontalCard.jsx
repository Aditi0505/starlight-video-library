import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeFromWatchLater } from "../../redux/features/playlist/playlistSlice";

const HorizontalCard = ({ video }) => {
  const { encodedToken } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeFromWatchlaterHandler = (id) => {
    if (!encodedToken) {
      navigate("/login");
    } else {
      dispatch(removeFromWatchLater(id))
        .then((res) => toast.success("Video removed from Watch Later!"))
        .catch((error) => toast.error(error));
    }
  };
  return (
    <div class="card-container-horizontal">
      <div
        class="card-inner-container-horizontal"
        onClick={() => navigate(`/video/${video._id}`)}
      >
        <div class="card-image-horizontal flex-column flex-center">
          <img
            src={video.thumbnail}
            alt={video.alt}
            class="img-horizontal-margin padding-xs"
          />
        </div>
        <div class="flex-start padding-sm card-body-horizontal">
          <div class="card-title-horizontal text-sm ft-bolder">
            {video.videoBy}
          </div>
          <div class="card-desc-horizontal text-sm ft-bold">{video.title}</div>
          <div class="card-desc-horizontal text-sm">
            {video.description.length <= 100
              ? video.description
              : `${video.description.substring(0, 100)}...`}
          </div>
          <div class="card-desc-horizontal flex-spbt video-icon">
            <span className="flex-spbt width-7">
              <i className="fas fa-eye"></i>
              {video.views}
            </span>

            <span className="flex-spbt width-7">
              <i className="far fa-hourglass"></i>
              {video.duration}
            </span>
          </div>
        </div>
      </div>
      <div class="icons">
        <span class="dismiss flex-center">
          <button
            class="card-btn-close"
            onClick={() => removeFromWatchlaterHandler(video._id)}
          >
            <i class="close fas fa-times-circle"></i>
          </button>
        </span>
      </div>
    </div>
  );
};
export { HorizontalCard };
