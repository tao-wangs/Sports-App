import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom"
import "./Header.css"
import SearchIcon from "@mui/icons-material/Search"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Avatar } from "@mui/material"
class Header extends Component {
   
  render() { 
    return (
      <div className='header'>
        <Link to="/">
          <img 
          className='header__icon' 
          src='https://picsum.photos/200'
          alt=''/>
        </Link>
      
        <div className='header__center'>
          <input type='text'/>
          <SearchIcon/>
        </div>

        <div className='header__right'>
          <NavLink 
          className='link' 
          to='/host'
          style={{textDecoration: 'none', color: 'inherit'}}
          >Host an Event</NavLink>
          <SportsSoccerIcon />
          <ExpandMoreIcon/>
          <Avatar />
        </div>
      </div>
      );
  }
}
 
export default Header;
