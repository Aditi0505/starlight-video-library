import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import { Loader, Sidebar, VideoCard, Chip } from "../../../components";
import { getVideoCategories, getVideos } from "./videoSlice";

const Videos = () => {
  const { videos, categories, isLoading } = useSelector((store) => store.video);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getVideoCategories());
  }, [dispatch]);
  return (
    <>
      <Sidebar />
      <main className="outer-wrapper flex-spbt video-listing">
        <div className="flex-center chip-container">
          <Chip category="All" key="All" />
          {categories.map((category) => (
            <Chip
              category={category.categoryName}
              key={category.categoryName}
            />
          ))}
          <button className="btn btn-link">Clear</button>
        </div>
        <div>
          <div className="display-screen">
            {isLoading ? (
              <Loader />
            ) : (
              videos.map((video) => (
                <VideoCard videoDetails={video} key={video._id} />
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export { Videos };
