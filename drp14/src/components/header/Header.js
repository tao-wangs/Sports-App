import React, { Component } from 'react';
import "./Header.css"
import SearchIcon from "@mui/icons-material/Search"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Avatar } from "@mui/material"
class Header extends Component {
   
  render() { 
    return (
      <div className='header'>
        <img 
        className='header__icon' 
        src='https://picsum.photos/200'
        alt=''/>
      
        <div className='header__center'>
          <input type='text'/>
          <SearchIcon/>
        </div>

        <div className='header__right'>
          <p>Host an Event</p>
          <SportsSoccerIcon />
          <ExpandMoreIcon/>
          <Avatar />
        </div>
      </div>
      );
  }
}
 
export default Header;
