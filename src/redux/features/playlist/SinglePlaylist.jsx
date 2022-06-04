import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HorizontalCard, NoData, Sidebar } from "../../../components";
import { setTitle } from "../../../utils";
import { deleteVideoFromPlaylist } from "./playlistSlice";
const SinglePlaylist = () => {
  const { playlistId } = useParams();
  const { playlists } = useSelector((store) => store.playlist);
  setTitle("StarLight | Playlist");

  return (
    <>
      <Sidebar />
      <main className="outer-wrapper video-listing">
        <div className="flex-center chip-container">
          <h1>
            {playlists.find((playlist) => playlist._id === playlistId).title}
          </h1>
          <span className="text-sm dark-shade">
            <span className="text-sm dark-shade">{`${
              playlists.find((playlist) => playlist._id === playlistId).videos
                .length > 0
                ? playlists.find((playlist) => playlist._id === playlistId)
                    .videos.length
                : playlists.find((playlist) => playlist._id === playlistId)
                    .videos.length === 1
                ? `1 video`
                : 0
            } videos`}</span>
          </span>
        </div>
        <>
          <div className="display-screen">
            {playlists?.find((playlist) => playlist._id === playlistId).videos
              .length > 0 ? (
              playlists
                .find((playlist) => playlist._id === playlistId)
                .videos?.map((video) => (
                  <HorizontalCard
                    key={video._id}
                    video={video}
                    removeAction={deleteVideoFromPlaylist}
                    pageInfo="Playlist"
                    playlistId={playlistId}
                  />
                ))
                .reverse()
            ) : (
              <NoData pageInfo={"Playlist"} />
            )}
          </div>
        </>
      </main>
    </>
  );
};
export { SinglePlaylist };
