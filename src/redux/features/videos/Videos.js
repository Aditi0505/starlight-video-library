import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Loader, Sidebar, VideoCard, Chip } from "../../../components";
import {
  getVideoCategories,
  getVideos,
  setCurrentCategory,
} from "./videoSlice";
import {
  getCategorizedVideos,
  getSearchedVideos,
  setTitle,
} from "../../../utils";
import { toast } from "react-toastify";
const Videos = () => {
  const { videos, categories, isLoading, currentCategory, searchQuery } =
    useSelector((store) => store.video);
  const dispatch = useDispatch();
  setTitle("StarLight | Videos");
  useEffect(() => {
    const data = dispatch(getVideos());
    data.unwrap().catch((e) => toast.error(e));
  }, [dispatch]);

  useEffect(() => {
    const data = dispatch(getVideoCategories());
    data.unwrap().catch((e) => toast.error(e));
  }, [dispatch]);

  useEffect(() => {
    const categoryName = currentCategory;
    dispatch(setCurrentCategory(categoryName));
  }, [currentCategory, dispatch]);

  const clickHandler = (category) => {
    dispatch(setCurrentCategory(category));
  };

  const categorizedCategoryList = getCategorizedVideos(videos, currentCategory);
  const searchedVideoList = getSearchedVideos(
    categorizedCategoryList,
    searchQuery
  );
  const resetCategoryHandler = () => {
    dispatch(setCurrentCategory("All"));
  };
  return (
    <>
      <Sidebar />
      <main className="outer-wrapper flex-spbt video-listing">
        <div className="flex-center chip-container">
          <Chip
            category="All"
            key="All"
            matchCategory={currentCategory}
            handleClick={clickHandler}
          />
          {categories.map((category) => (
            <Chip
              category={category.categoryName}
              key={category.categoryName}
              matchCategory={currentCategory}
              handleClick={clickHandler}
            />
          ))}
          <button className="btn btn-link" onClick={resetCategoryHandler}>
            Clear
          </button>
        </div>
        <div>
          <div className="display-screen">
            {isLoading ? (
              <Loader />
            ) : searchedVideoList.length > 0 ? (
              searchedVideoList.map((video) => (
                <VideoCard videoDetails={video} key={video._id} />
              ))
            ) : (
              <img
                src="/assets/images/empty.svg"
                className="responsive"
                loading="lazy"
                alt="No data"
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};
export { Videos };
