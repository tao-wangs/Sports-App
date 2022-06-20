import React, { Component } from 'react';
import {Navbar, Container, Nav, Button} from "react-bootstrap"
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
              <Link to="/"><Button className="secondary btn-lg" variant="light">Home</Button></Link>
              <Link to="/myevents"><Button className="secondary btn-lg" variant="light">My Events</Button></Link>
              <Link to="/login"><Button className="secondary btn-lg" variant="light">Login</Button></Link>
              <Link to="/signup"><Button className="secondary btn-lg" variant="light">Register</Button></Link>
              {/* <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
 
export default Header;
