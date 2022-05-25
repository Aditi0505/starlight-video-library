import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader, Sidebar } from "../../../components";
import { getSingleVideo } from "./videoSlice";

const SingleVideo = () => {
  const { isLoading, currentVideo } = useSelector((store) => store.video);
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const { _id, views, title, duration, avatar, description, videoBy, alt } =
    currentVideo ?? {};

  useEffect(() => {
    const data = dispatch(getSingleVideo(videoId));
    data.unwrap().catch((error) => toast.error(error));
  }, [videoId, dispatch]);

  return (
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
                src={`https://www.youtube.com/embed/${_id}`}
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
                <div className="flex-spbt video-actions">
                  <span className="ft-bolder text-sm text-right inner-icon">
                    <i className="far fa-thumbs-up"></i>
                    Like
                  </span>
                  <div className="ft-bolder text-sm text-right inner-action-icon">
                    <i className="far fa-list-alt"></i>
                    <span> Add to PlayList</span>
                  </div>
                  <span className="ft-bolder text-sm text-right inner-action-icon">
                    <i className="far fa-clock"></i>
                    Add to Watch Later
                  </span>
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
  );
};

export { SingleVideo };
