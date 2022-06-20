import "./Banner.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();
   
    return (
      <div className='banner'>
        <div className='banner__info'>
          <h1>Get out and stretch your imagination</h1>
          <h5>Discover a different kind of hobby to uncover the hidden gems near you</h5>
            <Button 
              onClick={()=>navigate('/events')}
              variant="outlined"
            >
                Find an Event
            </Button>
        </div>
      </div>
    );
}

export default Banner;