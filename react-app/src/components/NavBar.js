import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styled from 'styled-components'

const Nav = styled.nav`
/* display: flex; */
/* align-items: baseline; */
/* justify-content: space-around; */
max-height: 79px;
border-bottom: solid 1px #f0f0f5;
text-decoration: none;

/* background-color: black; */

`
const NavContainer = styled.div`
display: flex;
text-decoration: none;
margin: 0 auto;
`

const Buttons = styled.button`
  text-decoration: none;
  background: #222;
  height: 28px;
  min-width: 80px;
  border: none;
  border-radius: 10px;
  color: #eee;
  font-size: 20px;
  font-family: 'Cookie', cursive;
  position: relative;
  transition: 1s;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  /* padding-top: 5px; */
  margin: 0 auto;
  margin-top: 2px;
  margin-left: 70em;
  margin-bottom: 0px;
  text-decoration: none;
:hover{
  background: black;
  height: 28px;
  min-width: 90px;
  left: 0;
  border-radius: 0;
  border-bottom: 2px solid #eee;
  text-decoration: none;
}
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
        <NavLink to="/" exact={true} activeClassName="active">
          <Logo />
        </NavLink>
      <ul>
          {!authenticated && currentPage !== '/login' ? 
        <>
              <NavLink to="/login" exact={true} activeClassName="active">
                <Buttons>
                  Login
                </Buttons>
            </NavLink>
        </>
            : ""}
          {!authenticated && currentPage !== '/sign-up' ? 
            <>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
                <Buttons>
                  Sign Up
                </Buttons>
            </NavLink>
            </>
            : "" }
          {authenticated ? 
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
            </li>
            : ""}
        </ul>
        </NavContainer>
    </Nav>
  );
}

export default NavBar;