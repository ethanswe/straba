import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styled from 'styled-components'

const Nav = styled.nav`

max-height: 80px;
`
const NavContainer = styled.div`
display: flex;
/* justify-content: space-between; */
/* flex-direction: row; */
margin: 0 auto;
`

const Logo = styled.img.attrs({
    src: 'strabalogo.png'
})`
width: 80px;
height: 80px;
margin: 0 auto;
/* border: 1px solid blue; */
`
const NavBar = ({ authenticated, setAuthenticated }) => {
  let location = useLocation();
  const currentPage = location.pathname;
  return (
    <Nav>
      <NavContainer>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
          </li>
          {!authenticated && currentPage !== '/login' ? 
        <>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li> 
        </>
            : ""}
          {!authenticated && currentPage !== '/sign-up' ? 
            <>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
                </li>
            </>
            : "" }
          {authenticated ? 
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
            </li>
            : ""}
        </ul>
        <Logo />
        </NavContainer>
    </Nav>
  );
}

export default NavBar;