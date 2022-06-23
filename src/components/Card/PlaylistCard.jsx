import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePlaylist } from "../../redux/features/playlist/playlistSlice";

const PlaylistCard = ({ playlist }) => {
  const dispatch = useDispatch();
  const removePlaylistHandler = (id) => {
    dispatch(deletePlaylist(id))
      .then((res) =>
        res.error
          ? toast.error(res.payload)
          : toast.success(`Playlist removed!`)
      )
      .catch((error) => toast.error(error));
  };
  return (
    <div className="text-card-container card">
      <div className="card-inner-container">
        <div className="card-body padding-sm">
          <div className="card-title flex-spbt card-text">
            <div className="flex-start gap full-width">
              <span className="text-sm ft-bolder dark-shade ">
                {playlist.title}
              </span>
              <span className="text-sm ft-light">{`${
                playlist.videos.length > 0
                  ? playlist.videos.length
                  : playlist.videos.length === 1
                  ? `1 video`
                  : 0
              } videos`}</span>
            </div>
            <div className="flex-end gap">
              <i
                className="far fa-trash toggle-btn"
                onClick={() => removePlaylistHandler(playlist._id)}
              ></i>
              <Link to={`/playlist/${playlist._id}`}>
                <i className="far fa-external-link toggle-btn dark-shade"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { PlaylistCard };
