import { useContext } from "react";
import "./NavHeader.scss";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavHeader() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  return (
    <>
      {(user && user.isAuthenticated) || location.pathname === "/" ? (
        <div className="nav-header">
          <Navbar expand="lg" className="bg-header">
            <Container>
              <Navbar.Brand href="/">
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
                  <NavLink to="/projects" className="nav-link">
                    Projects
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                  <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Item className="nav-link">Welcome Hongdiem!</Nav.Item>
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Log out
                    </NavDropdown.Item>
                  </NavDropdown>
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
