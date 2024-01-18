import { useEffect, useState } from "react";
import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";

function Nav() {
  const [isShow, setIsShow] = useState(false);
  let location = useLocation();
  useEffect(() => {
    // let session = sessionStorage.getItem("account");
    // if (session) {
    //   setIsShow(true);
    // }
    if (location.pathname === "/login" || location.pathname === "/register") {
      setIsShow(false);
    } else setIsShow(true);
  }, []);

  return (
    <>
      {isShow && (
        <div className="topnav">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/projects">Project</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
      )}
    </>
  );
}

export default Nav;
