import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader, PlaylistModal, Sidebar } from "../../../components";
import {
  addToLikedVideo,
  addtoWatchLater,
  removeFromLikedVideo,
  removeFromWatchLater,
  setIsModalOpen,
} from "../playlist/playlistSlice";
import { postHistory } from "./videoSlice";

const SingleVideo = () => {
  const { isLoading, history } = useSelector((store) => store.video);
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const { watchLater, likedVideos, isModalOpen } = useSelector(
    (store) => store.playlist
  );
  const { encodedToken } = useSelector((store) => store.auth);
  const [currentVideo, setCurrentVideo] = useState(null);
  const { _id, views, title, duration, avatar, description, videoBy, alt } =
    currentVideo ?? {};
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/video/${videoId}`);
        setCurrentVideo(response.data.video);
      } catch (e) {
        return e;
      }
    })();
  }, [videoId]);

  useEffect(() => {
    if (
      videoId &&
      encodedToken &&
      currentVideo &&
      !history.some((video) => video._id === videoId)
    ) {
      dispatch(postHistory(currentVideo));
    }
  }, [encodedToken, currentVideo, dispatch, history, videoId]);

  const removeFromWatchlaterHandler = (id) => {
    if (!encodedToken) {
      navigate("/login");
    } else {
      dispatch(removeFromWatchLater(id))
        .then((res) => toast.success("Video removed from Watch Later!"))
        .catch((error) => toast.error(error));
    }
  };
  const addToWatchlaterHandler = (videoDetails) => {
    if (!encodedToken) {
      navigate("/login");
    } else {
      dispatch(addtoWatchLater(videoDetails))
        .then((res) => toast.success("Video added to Watch Later!"))
        .catch((error) => toast.error(error));
    }
  };
  const likedVideoHandler = (videoDetails) => {
    if (!encodedToken) {
      navigate("/login");
    } else {
      dispatch(addToLikedVideo(videoDetails))
        .then((res) => toast.success("Video added to Liked Videos!"))
        .catch((error) => toast.error(error));
    }
  };
  const unlikeVideoHandler = (id) => {
    if (!encodedToken) {
      navigate("/login");
    } else {
      dispatch(removeFromLikedVideo(id))
        .then((res) => toast.success("Video removed from Liked Videos!"))
        .catch((error) => toast.error(error));
    }
  };

  const saveToPlaylistHandler = (id) => {
    if (!encodedToken) {
      navigate("/login");
    } else {
      dispatch(setIsModalOpen(true));
    }
  };
  return (
    <>
      {isModalOpen ? (
        <div className="flex-center full-height">
          {isLoading ? <Loader /> : <PlaylistModal video={currentVideo} />}
        </div>
      ) : (
        <>
          <Sidebar />
          <main className="outer-wrapper flex-spbt video-listing">
            <div className="single-video-wrapper flex-center flex-column">
              {isLoading ? (
                <Loader />
              ) : currentVideo ? (
                <>
                  <iframe
                    className="single-video-container"
                    src={`https://www.youtube-nocookie.com/embed/${_id}`}
                    title={alt}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <section className="flex-start-col text-left gap">
                    <div className="ft-bolder text-lg">{title}</div>
                  </section>
                  <section className="flex-column video-detail">
                    <div className="flex-start gap">
                      <img src={avatar} alt="avatar" className="rounded" />
                      <span className="ft-bolder text-md">{videoBy}</span>
                    </div>
                    <div className="flex-spbt gap video-icon">
                      <div className="video-icon-set flex-spbt">
                        <span className="ft-bolder text-sm inner-icon">
                          <i className="fas fa-eye"></i>
                          {views} views
                        </span>
                        <span className="ft-bolder text-sm inner-icon">
                          <i className="far fa-hourglass"></i>
                          {duration}
                        </span>
                      </div>
                    </div>
                  </section>
                  <section className="flex-end">
                    <div className="flex-center video-actions">
                      {likedVideos.some((video) => video._id === videoId) ? (
                        <span
                          className="ft-bolder text-sm text-right inner-icon"
                          onClick={() => unlikeVideoHandler(videoId)}
                        >
                          <i className="fas fa-thumbs-up"></i>
                          Liked
                        </span>
                      ) : (
                        <span
                          className="ft-bolder text-sm text-right inner-icon"
                          onClick={() => likedVideoHandler(currentVideo)}
                        >
                          <i className="far fa-thumbs-up"></i>
                          Like
                        </span>
                      )}

                      <div
                        className="ft-bolder text-sm text-right inner-action-icon"
                        onClick={() => saveToPlaylistHandler(videoId)}
                      >
                        <i className="far fa-list-alt"></i>
                        <span> Add to PlayList</span>
                      </div>
                      {watchLater.some((video) => video._id === videoId) ? (
                        <span
                          className="ft-bolder text-sm text-right inner-action-icon"
                          onClick={() => removeFromWatchlaterHandler(videoId)}
                        >
                          <i className="fas fa-check-circle"></i>
                          Watch Later
                        </span>
                      ) : (
                        <span
                          className="ft-bolder text-sm text-right inner-action-icon"
                          onClick={() => addToWatchlaterHandler(currentVideo)}
                        >
                          <i className="far fa-clock"></i>
                          Watch Later
                        </span>
                      )}
                    </div>
                  </section>
                  <section className="flex-start gap margin-bottom">
                    <div className="ft-regular text-sm">{description}</div>
                  </section>
                </>
              ) : (
                ""
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export { SingleVideo };
