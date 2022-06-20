import React, { Component } from 'react';
import "./Banner.css";
import { Button } from "@mui/material"

class Banner extends Component {
  state = {  } 
  
  render() { 
    return (
      <div className='banner'>
        <div className='banner__info'>
          <h1>Get out and stretch your imagination</h1>
          <h5>Discover a different kind of hobby to uncover the hidden gems near you</h5>
          <Button variant="outlined">Find an Event</Button>
        </div>
      </div>
    );
  }
}

export default Banner;