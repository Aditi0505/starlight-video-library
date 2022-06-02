import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { toggleTheme } from "../../redux/features/auth/authSlice";
import { setSearchQuery } from "../../redux/features/videos/videoSlice";
import { Button } from "../index";
import { Sidebar } from "../Sidebar/Sidebar";
const NavBar = () => {
  const location = useLocation();
  const { searchQuery } = useSelector((store) => store.video);
  const { encodedToken, theme } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleSearchInput = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  const toggleThemeHandler = (theme) => {
    dispatch(toggleTheme(theme));
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log(sidebarOpen);
  return (
    <div>
      <header className="desktop-navigation position-fixed">
        <nav className="logo-wrapper">
          <div className="hide nav-logo gap bar">
            <i
              className="fas fa-bars nav-icon toggle-btn"
              onClick={() => setSidebarOpen((prev) => !prev)}
            ></i>
          </div>
          <div className="nav-logo">
            <Link to="/" className="site-link">
              <p className="text-lg">StarLight</p>
            </Link>
          </div>

          <div className="gap">
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                isActive ? (theme === "light" ? "active" : "dark-active") : ""
              }
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
        <ul className="nav-icons gap">
          {theme === "light" ? (
            <i
              className="fas fa-sun nav-icon toggle-btn"
              onClick={() => toggleThemeHandler("light")}
            ></i>
          ) : (
            <i
              className="fas fa-moon nav-icon toggle-btn"
              onClick={() => toggleThemeHandler("dark")}
            ></i>
          )}
          {encodedToken && (
            <Link to="/profile">
              <i className="fas fa-user nav-icon toggle-btn"></i>
            </Link>
          )}
          {encodedToken ? (
            <Button buttonState={"Logout"} route="" />
          ) : location.pathname === "/" ||
            location.pathname === "/feed" ||
            location.pathname.includes("/video") ? (
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
      {location.pathname !== "/" &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup" ? (
        sidebarOpen ? (
          <Sidebar expand={"sidebar-wrapper-expanded bar"} />
        ) : (
          <Sidebar expand={"hide"} />
        )
      ) : (
        ""
      )}
    </div>
  );
};

export { NavBar };
