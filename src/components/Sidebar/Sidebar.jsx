import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  console.log(props.expand);
  return (
    <div className={`sidebar-wrapper position-fixed ${props.expand}`}>
      <ul className="sidebar-list">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "tab-active" : "")}
        >
          <li className="sidebar-list-item ft-bolder">Home</li>
        </NavLink>
        <NavLink
          to="/feed"
          className={({ isActive }) => (isActive ? "tab-active" : "")}
        >
          <li className="sidebar-list-item ft-bolder">Feed</li>
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => (isActive ? "tab-active" : "")}
        >
          <li className="sidebar-list-item ft-bolder">History</li>
        </NavLink>
        <NavLink
          to="/playlist"
          className={({ isActive }) => (isActive ? "tab-active" : "")}
        >
          <li className="sidebar-list-item ft-bolder">Playlist</li>
        </NavLink>
        <NavLink
          to="/watch-later"
          className={({ isActive }) => (isActive ? "tab-active" : "")}
        >
          <li className="sidebar-list-item ft-bolder">Watch Later</li>
        </NavLink>
        <NavLink
          to="/liked-videos"
          className={({ isActive }) => (isActive ? "tab-active" : "")}
        >
          <li className="sidebar-list-item ft-bolder">Liked Videos</li>
        </NavLink>
      </ul>
    </div>
  );
};

export { Sidebar };
