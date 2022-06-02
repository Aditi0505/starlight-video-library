import { useDispatch, useSelector } from "react-redux";
import {
  Loader,
  NoData,
  PlaylistCard,
  PlaylistModal,
  Sidebar,
} from "../../../components";
import { setTitle } from "../../../utils";
import { setIsModalOpen } from "./playlistSlice";

const Playlist = () => {
  const { playlists, isLoading, isModalOpen } = useSelector(
    (store) => store.playlist
  );
  const dispatch = useDispatch();
  setTitle("StarLight | Playlist");
  const addToPlaylistHandler = () => {
    dispatch(setIsModalOpen(true));
  };
  return isLoading ? (
    <Loader />
  ) : (
    <>
      {isModalOpen ? (
        <div className="flex-center full-height">
          <PlaylistModal />
        </div>
      ) : (
        <>
          <Sidebar />
          <main className="outer-wrapper video-listing">
            <div className="flex-center chip-container">
              <div className="flex-start">
                <h1>All Playlists</h1>
              </div>
              <i
                className="fas fa-plus toggle-btn"
                onClick={addToPlaylistHandler}
              ></i>
            </div>
            <>
              <div className="display-screen">
                {playlists.length > 0 ? (
                  playlists.map((playlist) => (
                    <div
                      className="flex-center playlist-row"
                      key={playlist._id}
                    >
                      <PlaylistCard key={playlist._id} playlist={playlist} />
                    </div>
                  ))
                ) : (
                  <NoData pageInfo={"Playlist"} />
                )}
              </div>
            </>
          </main>
        </>
      )}
    </>
  );
};
export { Playlist };
