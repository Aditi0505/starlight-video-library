import { useSelector } from "react-redux";
import { HorizontalCard, NoData, Sidebar } from "../../../components";
import { setTitle } from "../../../utils";
import { removeFromLikedVideo } from "../playlist/playlistSlice";

const LikedVideo = () => {
  const { likedVideos } = useSelector((store) => store.playlist);
  setTitle("StarLight | Liked Videos");
  return (
    <>
      <Sidebar />
      <main className="outer-wrapper video-listing">
        <div className="flex-center chip-container">
          <h1>Liked Videos</h1>
          <span className="text-sm dark-shade">{`${
            likedVideos.length > 0
              ? likedVideos.length
              : likedVideos.length === 1
              ? `1 video`
              : 0
          } videos`}</span>
        </div>
        <>
          <div className="display-screen">
            {likedVideos.length > 0 ? (
              likedVideos.map((video) => (
                <HorizontalCard
                  key={video._id}
                  video={video}
                  removeAction={removeFromLikedVideo}
                  pageInfo="Liked Video"
                />
              ))
            ) : (
              <NoData pageInfo={"Liked Video"} />
            )}
          </div>
        </>
      </main>
    </>
  );
};
export { LikedVideo };
