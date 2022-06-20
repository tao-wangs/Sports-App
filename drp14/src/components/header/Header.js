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
          className='host-link' 
          to='/host'
          style={{textDecoration: 'inherit', color: 'inherit'}}>
            Host an Event
          </NavLink>

          <NavLink
            className='myevents-link'
            to='/myevents'
            style={{textDecoration: 'inherit', color: 'inherit'}}>
            <SportsSoccerIcon />
          </NavLink>
          <ExpandMoreIcon/>

          <NavLink
            className='login-link'
            to='/login'
            style={{textDecoration: 'inherit', color: 'inherit'}}>
            <Avatar />
          </NavLink>
        </div>
      </div>
      );
  }
}
 
export default Header;
