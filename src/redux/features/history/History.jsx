import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HorizontalCard, Loader, NoData, Sidebar } from "../../../components";
import { setTitle } from "../../../utils";
import {
  getHistory,
  removeFromHistory,
  removeHistory,
} from "../videos/videoSlice";

const History = () => {
  const { encodedToken } = useSelector((store) => store.auth);
  const { history, isLoading } = useSelector((store) => store.video);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  setTitle("StarLight | History");
  useEffect(() => {
    dispatch(getHistory);
  }, [dispatch, encodedToken, navigate]);
  const removeHistoryHandler = () => {
    dispatch(removeHistory());
  };
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Sidebar />
      <main className="outer-wrapper video-listing">
        <div className="flex-center chip-container">
          <div className="flex-start">
            <h1>History</h1>
            <span className="text-sm dark-shade">{`${
              history.length > 0
                ? history.length
                : history.length === 1
                ? `1 video`
                : 0
            } videos`}</span>
          </div>
          <i
            className="fas fa-trash toggle-btn"
            onClick={removeHistoryHandler}
          ></i>
        </div>
        <>
          <div className="display-screen">
            {history.length > 0 ? (
              history.map((video) => (
                <HorizontalCard
                  key={video._id}
                  video={video}
                  removeAction={removeFromHistory}
                  pageInfo="History"
                />
              ))
            ) : (
              <NoData pageInfo={"History"} />
            )}
          </div>
        </>
      </main>
    </>
  );
};
export { History };
