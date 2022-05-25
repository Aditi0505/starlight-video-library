import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/features/auth/authSlice";
const Button = ({ buttonState, route, handleClick }) => {
  const dispatch = useDispatch();
  const logoutUserHandler = () => {
    dispatch(logoutUser());
  };
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
      ) : buttonState === "Logout" ? (
        <Link to={`/${route}`} className="nav-icon">
          <button className="btn btn-ghost-primary" onClick={logoutUserHandler}>
            {buttonState}
          </button>
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
