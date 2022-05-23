import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="grid-container-col flex-spbt">
      <div className="column flex-column text-left">
        <h1 className="page-heading">Oh No! Page Not Found</h1>
        <Link to="/" className="btn btn-link text-left">
          Back to home page
        </Link>
      </div>
      <div className="column">
        <img
          src="/assets/images/page_not_found.svg"
          alt="Page Not Found"
          className="rounded square"
        />
      </div>
    </div>
  );
};
export { PageNotFound };
