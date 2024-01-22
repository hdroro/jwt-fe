import { useContext } from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Nav() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  return (
    <>
      {(user && user.isAuthenticated) || location.pathname === "/" ? (
        <div className="topnav">
          <NavLink to="/" exact>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Project</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Nav;
