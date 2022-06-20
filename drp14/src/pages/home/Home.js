import React, { Component } from "react";
import Banner from "../../components/banner/Banner"
class Home extends Component {
  render() {
    return (
      <div className="home">
        <Banner />
      </div>
      // <div>
      //   <Container>
      //     <Row>
      //       <Col>
      //         <Link to={"/events"}>
      //           <Button className="secondary m-3 btn-lg" variant="light">
      //             Find Event
      //           </Button>
      //         </Link>
      //         <Link to={"/host"}>
      //           <Button className="secondary m-3 btn-lg" variant="light">
      //             Host Event
      //           </Button>
      //         </Link>
      //       </Col>
      //     </Row>
      //     <Row></Row>
      //   </Container>
      // </div>
    );
  }
}

export default Home;
