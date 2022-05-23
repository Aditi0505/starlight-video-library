import { Button } from "../Button/Button";

const Banner = () => {
  return (
    <div>
      <img
        src="/assets/images/vinyl.jpg"
        alt="video-banner"
        className="img img-content"
        loading="lazy"
      />
      <div className="flex-column overlay gap">
        <h1>TAYLOR SWIFT: All Too Well</h1>
        <p className="text-lg ft-bolder">Watch the latest Video now</p>
        <div>
          <ul className="nav-icons">
            <Button buttonState={"Watch Now"} route="feed" />
          </ul>
        </div>
      </div>
    </div>
  );
};
export { Banner };
