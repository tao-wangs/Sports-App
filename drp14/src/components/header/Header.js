import React, { Component } from 'react';
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap"
import { Link } from 'react-router-dom';

class Header extends Component {
   
  render() { 
    return (
      <Navbar bg="light" expand="lg" variant="light">
        <Container>
          <Link to="/">
            <Navbar.Brand>Sports Events Website</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Link to="/">Home</Link>
              <Link to="/myevents">My Events</Link>
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
 
export default Header;
