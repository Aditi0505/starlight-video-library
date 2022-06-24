import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader, PlaylistModal, Sidebar } from "../../../components";
import {
  addToLikedVideo,
  addtoWatchLater,
  removeFromLikedVideo,
  removeFromWatchLater,
  setIsModalOpen,
} from "../playlist/playlistSlice";
import { deleteNotes, editNotes, postHistory, setNotes } from "./videoSlice";
import { v4 as uuid } from "uuid";
const SingleVideo = () => {
  const { isLoading, history, videoNotes } = useSelector(
    (store) => store.video
  );
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const { watchLater, likedVideos, isModalOpen } = useSelector(
    (store) => store.playlist
  );
  const { encodedToken } = useSelector((store) => store.auth);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [notesInput, setNotesInput] = useState("");
  const [toEdit, setToEdit] = useState(null);
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
        .then((res) =>
          res.error
            ? toast.error(res.payload)
            : toast.success("Video removed from Watch Later!")
        )
        .catch((error) => toast.error(error));
    }
  };
  const addToWatchlaterHandler = (videoDetails) => {
    if (!encodedToken) {
      navigate("/login", { state: { from: location } }, { replace: true });
    } else {
      dispatch(addtoWatchLater(videoDetails))
        .then((res) =>
          res.error
            ? toast.error(res.payload)
            : toast.success("Video added to Watch Later!")
        )
        .catch((error) => toast.error(error));
    }
  };
  const likedVideoHandler = (videoDetails) => {
    if (!encodedToken) {
      navigate("/login", { state: { from: location } }, { replace: true });
    } else {
      dispatch(addToLikedVideo(videoDetails))
        .then((res) =>
          res.error
            ? toast.error(res.payload)
            : toast.success("Video added to Liked Videos!")
        )
        .catch((error) => toast.error(error));
    }
  };
  const unlikeVideoHandler = (id) => {
    if (!encodedToken) {
      navigate("/login");
    } else {
      dispatch(removeFromLikedVideo(id))
        .then((res) =>
          res.error
            ? toast.error(res.payload)
            : toast.success("Video removed from Liked Videos!")
        )
        .catch((error) => toast.error(error));
    }
  };

  const saveToPlaylistHandler = (id) => {
    if (!encodedToken) {
      navigate("/login", { state: { from: location } }, { replace: true });
    } else {
      dispatch(setIsModalOpen(true));
    }
  };
  const notesInputHandler = (e) => {
    setNotesInput(e.target.value);
  };
  const saveNotesHandler = () => {
    setNotesInput("");
    dispatch(
      setNotes({
        notes: notesInput,
        notesFor: _id,
        noteId: uuid(),
      })
    );
  };
  const editNotesHandler = () => {
    dispatch(
      editNotes({
        notes: notesInput,
        noteId: toEdit,
      })
    );
    setNotesInput("");
    setToEdit(null);
  };
  const setToEditHandler = (note) => {
    setToEdit(note.noteId);
    setNotesInput(note.notes);
  };
  const deleteNotesHandler = (note) => {
    setNotesInput("");
    dispatch(deleteNotes({ notes: notesInput, noteId: note.noteId }));
  };
  const location = useLocation();
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
                        <span className="ft-bolder text-sm">
                          <i className="fas fa-eye inner-icon"></i>
                          {views} views
                        </span>
                        <span className="ft-bolder text-sm">
                          <i className="far fa-hourglass inner-icon"></i>
                          {duration}
                        </span>
                        <span className="flex-center">
                          <span className="ft-bolder text-sm video-actions">
                            {likedVideos.some(
                              (video) => video._id === videoId
                            ) ? (
                              <span
                                className="ft-bolder text-sm"
                                onClick={() => unlikeVideoHandler(videoId)}
                              >
                                <i className="fas fa-thumbs-up inner-icon"></i>
                                Liked
                              </span>
                            ) : (
                              <span
                                className="ft-bolder text-sm"
                                onClick={() => likedVideoHandler(currentVideo)}
                              >
                                <i className="far fa-thumbs-up inner-icon"></i>
                                Like
                              </span>
                            )}
                          </span>
                          <span className="ft-bolder text-sm video-actions">
                            <span
                              className="ft-bolder text-sm"
                              onClick={() => saveToPlaylistHandler(videoId)}
                            >
                              <i className="far fa-list-alt inner-icon"></i>
                              <span> Add to PlayList</span>
                            </span>
                          </span>
                          <span className="ft-bolder text-sm inner-icon video-actions">
                            {watchLater.some(
                              (video) => video._id === videoId
                            ) ? (
                              <span
                                className="ft-bolder text-sm"
                                onClick={() =>
                                  removeFromWatchlaterHandler(videoId)
                                }
                              >
                                <i className="fas fa-check-circle inner-icon"></i>
                                Watch Later
                              </span>
                            ) : (
                              <span
                                className="ft-bolder text-sm"
                                onClick={() =>
                                  addToWatchlaterHandler(currentVideo)
                                }
                              >
                                <i className="far fa-clock inner-icon"></i>
                                Watch Later
                              </span>
                            )}
                          </span>
                        </span>
                      </div>
                    </div>
                  </section>
                  <section className="flex-start gap margin-bottom">
                    <div className="ft-regular text-sm">{description}</div>
                  </section>
                  <section className="flex-start gap notes">
                    <div className="ft-regular text-sm full-width" id="notes">
                      <textarea
                        placeholder="Enter notes here"
                        className={`full-width padding-md`}
                        onChange={notesInputHandler}
                        value={notesInput}
                      />
                      <div className="flex-center toggle-btn">
                        {toEdit ? (
                          <i
                            title="Edit"
                            className="fas fa-edit"
                            onClick={() => editNotesHandler()}
                          ></i>
                        ) : (
                          <i
                            title="Save"
                            className="fas fa-save"
                            onClick={saveNotesHandler}
                          ></i>
                        )}
                      </div>
                    </div>
                  </section>
                  <section className="flex-start gap notes">
                    <div className="ft-regular text-sm full-width" id="notes">
                      {videoNotes.map(
                        (note) =>
                          note.notesFor === _id && (
                            <div key={note.noteId}>
                              <div className="flex-center toggle-btn">
                                <p className="ft-regular text-sm full-width">
                                  {note.notes}
                                </p>
                                <i
                                  title="Edit"
                                  className="fas fa-edit"
                                  onClick={() => setToEditHandler(note)}
                                ></i>
                                <i
                                  title="delete"
                                  className="fas fa-trash"
                                  onClick={() => deleteNotesHandler(note)}
                                ></i>
                              </div>
                            </div>
                          )
                      )}
                    </div>
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
