import { Link } from "react-router-dom";
const Button = ({ buttonState, route }) => {
  return (
    <li>
      <Link to={`/${route}`} className="nav-icon">
        <button className="btn btn-ghost-primary">{buttonState}</button>
      </Link>
    </li>
  );
};

export { Button };
