import { Link } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";

const PageNotFound = () => {
  return (
    <>
      <Sidebar expand={"hide"} />
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
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};
export { PageNotFound };
