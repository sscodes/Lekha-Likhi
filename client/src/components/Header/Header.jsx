import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signout } from '../../actions/authActions';
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

const Header = (props) => {

  const user = useSelector(state => state.user);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
      dispatch(signout());
  }

  const renderLoggedInLinks = () => {
      return (
          <Nav>
              <li className="nav-item">
                  <span className="navTitles" onClick={logout}>Sign-Out</span>
              </li>
              {/* <NavLink to="/signin" className="navTitles">
                Contact
              </NavLink> */}
          </Nav>
      );
  };

  const renderNonLoggedInLinks = () => {
      return (
          <Nav>
              <li className="nav-item">
                  <NavLink to="/signin" className="navTitles">Sign-in</NavLink>
              </li>
              <li className="nav-item">
                  <NavLink to="/signup" className="navTitles">Sign-up</NavLink>
              </li>
              {/* <NavLink to="/signin" className="navTitles">
                Contact
              </NavLink> */}
          </Nav>
      );
  };

  return (
    <Navbar
      fixed={props.fixed}
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className={props.navbarpos}
    >
      <Container fluid>
        <Link to="/" className="navBrand">
          Lekha Likhi
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {user.authenticate || auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;