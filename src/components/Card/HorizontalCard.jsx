import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HorizontalCard = ({ video, removeAction, pageInfo }) => {
  const { encodedToken } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeHandler = (id) => {
    if (!encodedToken) {
      navigate("/login");
    } else {
      dispatch(removeAction(id))
        .then((res) => toast.success(`Video removed from ${pageInfo}!`))
        .catch((error) => toast.error(error));
    }
  };
  return (
    <div className="card-container-horizontal">
      <div
        className="card-inner-container-horizontal"
        onClick={() => navigate(`/video/${video._id}`)}
      >
        <div className="card-image-horizontal flex-column flex-center">
          <img
            src={video.thumbnail}
            alt={video.alt}
            className="img-horizontal-margin padding-xs"
          />
        </div>
        <div className="flex-start padding-sm card-body-horizontal">
          <div className="card-title-horizontal text-sm ft-bolder">
            {video.videoBy}
          </div>
          <div className="card-desc-horizontal text-sm ft-bold">
            {video.title}
          </div>
          <div className="card-desc-horizontal text-sm">
            {video.description.length <= 100
              ? video.description
              : `${video.description.substring(0, 100)}...`}
          </div>
          <div className="card-desc-horizontal flex-spbt video-icon">
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
      <div className="icons">
        <span className="dismiss flex-center">
          <button
            className="card-btn-close"
            onClick={() => removeHandler(video._id)}
          >
            <i className="close fas fa-times-circle"></i>
          </button>
        </span>
      </div>
    </div>
  );
};
export { HorizontalCard };
