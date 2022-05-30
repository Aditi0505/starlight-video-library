import { Link, useLocation } from "react-router-dom";

const NoData = ({ pageInfo }) => {
  const location = useLocation();
  return (
    <div className="flex-column flex-center">
      <img
        src="/assets/images/empty.svg"
        className="responsive no-data"
        loading="lazy"
        alt="No data"
      />
      {location.pathname !== "/feed" ? (
        <span className="text-md">
          No Videos in {pageInfo}.
          <Link to="/feed" className="page-heading text-sm underlined">
            Explore more videos
          </Link>
        </span>
      ) : (
        <span className="text-md">
          Oh no, No videos found! Please check later
        </span>
      )}
    </div>
  );
};
export { NoData };
