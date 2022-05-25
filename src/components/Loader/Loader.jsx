import { useLocation } from "react-router-dom";

const Loader = () => {
  const location = useLocation();
  return (
    <div
      className={
        location.pathname === "/"
          ? `grid-container-col column loader home-loader`
          : `grid-container-col column loader`
      }
    >
      <img src={"/assets/gif/loader.gif"} alt="loading..." loading="lazy" />
    </div>
  );
};
export { Loader };
