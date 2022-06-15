import React, { Component } from 'react';
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap"

class Header extends Component {
   
  render() { 
    return (
      <Navbar bg="light" expand="lg" variant="light">
        <Container>
          <Navbar.Brand href="#home">Sports Events Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">My Events</Nav.Link>
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