import { useContext } from "react";
import "./NavHeader.scss";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";

function NavHeader() {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    let data = await logoutUser(); //clear cookies
    localStorage.removeItem("jwt"); //clear local storage
    logoutContext(); //clear user in context

    if (data && +data.EC === 0) {
      toast.success("Logout successfully!");
      history.push("/login");
      // window.location.reload();
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <>
      {(user && user.isAuthenticated) || location.pathname === "/" ? (
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand to="/">
                <img
                  src="favicon.ico"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt=""
                />
                <div className="brand-name">React</div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                  <NavLink to="/roles" className="nav-link">
                    Roles
                  </NavLink>
                  <NavLink to="/group-role" className="nav-link">
                    Group-Role
                  </NavLink>
                  <NavLink to="/projects" className="nav-link">
                    Projects
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                  <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
                <Nav>
                  {user && user.isAuthenticated ? (
                    <>
                      <Nav.Item className="nav-link">
                        Welcome {user.account.username}!
                      </Nav.Item>

                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item>Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => handleLogout()}>
                          Log out
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default NavHeader;
