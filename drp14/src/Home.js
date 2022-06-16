import React, { Component } from "react";
import {Button, Container, Col, Row} from "react-bootstrap"
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <Link to={"/events"}>
                <Button className="secondary m-3 btn-lg" variant="light">Find Event</Button>
              </Link>
              <Link to={"/host"}>
                <Button className="secondary m-3 btn-lg" variant="light">Host Event</Button>
              </Link>
              <Link to={"/myevents"}>
                <Button className="secondary m-3 btn-lg" variant="light">My Events</Button>
              </Link>
            </Col>
          </Row>  
          <Row>
            <Col>
              <Link to={"/login"}>
                <Button className="secondary m-3 btn-lg" variant="light">Log In</Button>
              </Link>
              <Link to={"/signup"}>
              <Button className="secondary m-3 btn-lg" variant="light">Sign Up</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
