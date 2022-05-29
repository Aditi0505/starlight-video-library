import { useSelector } from "react-redux";
import { HorizontalCard, NoData, Sidebar } from "../../../components";
import { setTitle } from "../../../utils";
import { removeFromWatchLater } from "../playlist/playlistSlice";

const WatchLater = () => {
  const { watchLater } = useSelector((store) => store.playlist);
  setTitle("StarLight | Watch Later");
  return (
    <>
      <Sidebar />
      <main className="outer-wrapper video-listing">
        <div className="flex-center chip-container">
          <h1>Watch Later</h1>
          <span className="text-sm dark-shade">{`${
            watchLater.length > 0
              ? watchLater.length
              : watchLater.length === 1
              ? `1 video`
              : 0
          } videos`}</span>
        </div>
        <>
          <div className="display-screen">
            {watchLater.length > 0 ? (
              watchLater.map((video) => (
                <HorizontalCard
                  key={video._id}
                  video={video}
                  removeAction={removeFromWatchLater}
                  pageInfo="Watch Later"
                />
              ))
            ) : (
              <NoData pageInfo={"Watch Later"} />
            )}
          </div>
        </>
      </main>
    </>
  );
};
export { WatchLater };
