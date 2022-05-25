import { Link } from "react-router-dom";
const Button = ({ buttonState, route, handleClick }) => {
  return (
    <li>
      {buttonState === "Watch Now" ? (
        <Link
          to={`/${route}`}
          className="nav-icon"
          onClick={() => handleClick("All")}
        >
          <button className="btn btn-ghost-primary">{buttonState}</button>
        </Link>
      ) : (
        <Link to={`/${route}`} className="nav-icon">
          <button className="btn btn-ghost-primary">{buttonState}</button>
        </Link>
      )}
    </li>
  );
};

export { Button };
