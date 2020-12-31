import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styled from 'styled-components'
import { CreateActivityForm } from './create-activity/CreateActivityForm';

const Nav = styled.nav`
max-height: 80px;
border-bottom: solid 1px #f0f0f5;
text-decoration: none;
position: -webkit-sticky; /* Safari */
position: sticky;
top: 0;
z-index: 100;
/* overflow: hide; */

`
const NavContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: row;
text-decoration: none;
margin: 0 auto;
z-index: 100;
`

const Buttons = styled.button`
  text-decoration: none;
  font-family: 'Fugaz One', cursive;
  background: #222;
  height: 28px;
  min-width: 80px;
  border: none;
  border-radius: 10px;
  color: #eee;
  font-size: 15px;
  /* font-family: 'Cookie', cursive; */
  position: relative;
  transition: 1s;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  margin-bottom: 0px;
  margin-left: 10px;
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
    src: '../../strabalogo.png'
})`
width: 80px;
height: 80px;
margin: 0 auto;
display: flex;
`
const NavBar = ({ authenticated, setAuthenticated }) => {
  let location = useLocation();
  const currentPage = location.pathname;

  const userId = localStorage.getItem('userId');
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
          <>
            <NavLink to="/activities/new" exact={true} activeClassName="active">
              <Buttons>
                New Activity
              </Buttons>
            </NavLink>
            <NavLink to={`/users/${userId}`} exact={true} activeClassName="active">
              <Buttons>
                Profile
              </Buttons>
            </NavLink>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </>
            : ""}
        </ul>
        </NavContainer>
    </Nav>
  );
}

export default NavBar;