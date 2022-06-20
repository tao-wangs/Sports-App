import React, { Component } from 'react';
import {Container, Col, Row} from "react-bootstrap";

class Footer extends Component {
   
  render() { 
    return (
      <footer style={{
        width:"100%",
        position: "relative",
        bottom:0,
        display:"flex",
        justifyContent:"center"
      }}>
        <Container>
          <Row>
            <Col className="text-center py-3">
              Copyright &copy; activ charlie louis tao
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}
 
export default Footer;