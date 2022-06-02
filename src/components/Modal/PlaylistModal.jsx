import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addVideoToPlaylist,
  deleteVideoFromPlaylist,
  postPlaylist,
  setIsModalOpen,
} from "../../redux/features/playlist/playlistSlice";

const PlaylistModal = ({ video }) => {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch(setIsModalOpen(false));
  };

  const { playlists } = useSelector((store) => store.playlist);
  const { encodedToken } = useSelector((store) => store.auth);
  const [playlistName, setPlayListName] = useState("");
  const playlistInputHandler = (e) => {
    setPlayListName(e.target.value);
  };
  const clickActionHandler = (playlistName) => {
    if (!playlistName) {
      toast.error("Please enter a playlist name");
    } else {
      dispatch(postPlaylist({ title: playlistName }))
        .then((res) => toast.success("Created new playlist!"))
        .catch((error) => toast.error(error));
      setPlayListName("");
    }
  };
  const navigate = useNavigate();
  const playlistHandler = (event, id, currentVideo) => {
    if (currentVideo) {
      if (!encodedToken) {
        navigate("/login");
      } else if (event.target.checked) {
        dispatch(addVideoToPlaylist({ id, currentVideo }))
          .then((res) => toast.success("Video added to the playlist!"))
          .catch((error) => toast.error(error));
      } else {
        dispatch(deleteVideoFromPlaylist({ id, currentVideo }))
          .then((res) => toast.success("Video removed from the playlist!"))
          .catch((error) => toast.error(error));
      }
    } else {
      toast.error("Please select a video to add!");
    }
  };
  return (
    <div className="modal z-index">
      <div className="modal-content padding-sm flex-spbt">
        <div>Save to Playlist </div>
        <button className="modal-close">
          <i className="fas fa-times-square" onClick={closeModalHandler}></i>
        </button>
      </div>
      <div className="modal-body padding-sm">
        <div>
          {playlists.length > 0 ? (
            <ul>
              {playlists.map((playlist) => (
                <li className="flex-start gap" key={playlist._id}>
                  <input
                    type="checkbox"
                    id={playlist._id}
                    name="playlist"
                    checked={playlists?.some((current) =>
                      current?._id === playlist?._id
                        ? current.videos &&
                          current.videos?.some((v) => v?._id === video?._id)
                        : false
                    )}
                    onChange={(e) => playlistHandler(e, playlist._id, video)}
                  />
                  <label htmlFor={playlist._id}>{playlist.title}</label>
                </li>
              ))}
            </ul>
          ) : (
            <p>No playlist found. Create a new playlist</p>
          )}
        </div>
      </div>
      <div className="modal-footer padding-sm">
        <input
          placeholder="Enter Playlist Name"
          type="text"
          className="modal-footer-close padding-xs"
          value={playlistName}
          onChange={(e) => playlistInputHandler(e)}
        />
        <button
          className="footer-submit padding-xs modal-footer-btn"
          onClick={() => clickActionHandler(playlistName)}
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
};
export { PlaylistModal };
