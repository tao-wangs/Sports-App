import React, { Component } from 'react';
import "./Banner.css";
import { Button } from "@mui/material";
// import { Link } from "react-router-dom";

class Banner extends Component {
  state = {  }
  
  render() { 
    return (
      <div className='banner'>
        <div className='banner__info'>
          <h1>Get out and stretch your imagination</h1>
          <h5>Discover a different kind of hobby to uncover the hidden gems near you</h5>
          {/* <Link to="/events"> */}
            <Button variant="outlined">Find an Event</Button>
          {/* </Link> */}
        </div>
      </div>
    );
  }
}

export default Banner;