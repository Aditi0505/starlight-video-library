import { useDispatch } from "react-redux";
import { setCurrentCategory } from "../../redux/features/videos/videoSlice";
import { Button } from "../Button/Button";

const Banner = () => {
  const { dispatch } = useDispatch();
  const handleClick = (category) => {
    dispatch(setCurrentCategory(category));
  };
  return (
    <div>
      <img
        src="/assets/images/vinyl.jpg"
        alt="video-banner"
        className="img img-content"
        loading="lazy"
      />
      <div className="flex-column overlay gap banner-heading">
        <h1>TAYLOR SWIFT: All Too Well</h1>
        <p className="text-lg ft-bolder">Watch the latest Video now</p>
        <div>
          <ul className="nav-icons">
            <Button
              buttonState={"Watch Now"}
              route="feed"
              onClick={handleClick}
            />
          </ul>
        </div>
      </div>
    </div>
  );
};
export { Banner };
