import "./Nav.scss";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="topnav">
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/news">News</NavLink>
      <NavLink to="/contact">Contact</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>
  );
}

export default Nav;
