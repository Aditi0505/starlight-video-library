import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { setSearchQuery } from "../../redux/features/videos/videoSlice";
import { Button } from "../index";
const NavBar = () => {
  const location = useLocation();
  const { searchQuery } = useSelector((store) => store.video);
  const dispatch = useDispatch();
  const handleSearchInput = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  return (
    <div>
      <header className="desktop-navigation position-fixed">
        <nav className="logo-wrapper">
          <div className="nav-logo">
            <Link to="/" className="site-link">
              <p className="text-lg">StarLight</p>
            </Link>
          </div>
          <div className="gap">
            <NavLink
              to="/feed"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <p className="nav-link">Feed</p>
            </NavLink>
          </div>
        </nav>
        {location.pathname === "/feed" && (
          <input
            type="text"
            name="search"
            id="search"
            placeholder="🔍 Search"
            value={searchQuery}
            onChange={(e) => handleSearchInput(e)}
          />
        )}
        <ul className="nav-icons">
          {true ? (
            <i className="fas fa-sun nav-icon toggle-btn"></i>
          ) : (
            <i className="fas fa-moon nav-icon toggle-btn"></i>
          )}
          {location.pathname === "/" ? (
            <Button buttonState={"Login"} route="login" />
          ) : location.pathname === "/login" ? (
            <Button buttonState={"Signup"} route="signup" />
          ) : location.pathname === "/signup" ? (
            <Button buttonState={"Login"} route="login" />
          ) : (
            <Button buttonState={"Logout"} route="" />
          )}
        </ul>
      </header>
    </div>
  );
};

export { NavBar };
