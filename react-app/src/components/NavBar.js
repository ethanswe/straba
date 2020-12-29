import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styled from 'styled-components'
import { CreateActivityForm } from './create-activity/CreateActivityForm';

const Nav = styled.nav`

max-height: 80px;
`
const NavContainer = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
`

const NavBar = ({ authenticated, setAuthenticated }) => {

  return (
    <Nav>
      <NavContainer>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
          </li>
          {!authenticated ? 
        <>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li> 
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
                </li>
        </>
            : ""}
          {authenticated ? 
          <>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
            </li>
            <li>
            <CreateActivityForm />
              </li>
              </>
            : ""}
        </ul>
        </NavContainer>
    </Nav>
  );
}

export default NavBar;