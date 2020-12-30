import React from "react";
import { logout } from "../../services/auth";
import styled from 'styled-components'
import { Redirect } from 'react-router-dom';

const Buttons = styled.button`
  text-decoration: none;
  background: #222;
  height: 28px;
  min-width: 80px;
  border: none;
  border-radius: 10px;
  color: #eee;
  font-size: 15px;
  font-family: 'Fugaz One', cursive;
  position: relative;
  transition: 1s;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 2px;
  margin-left: 10px;
  margin-right: 10px;
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

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    localStorage.removeItem('userId');
    return <Redirect to="/" />;
  };

  return <Buttons onClick={onLogout}>Logout</Buttons>;
};

export default LogoutButton;
