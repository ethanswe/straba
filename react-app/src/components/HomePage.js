import React from 'react';
import { NavLink, useLocation, Redirect } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styled from 'styled-components'
import '../stylesheets/homepage.css';

const Header = styled.div`
font-size: 35px;
display: flex;
align-items: center;
justify-content: center;
margin-top: 60px;
position: relative;
font-family: 'Fugaz One', cursive;
z-index: 10;
`

const BackgroundImage = styled.div`
overflow: hidden;
background-image: url('https://images.pexels.com/photos/1081031/pexels-photo-1081031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
width: 100vw;
height: 91vh;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
z-index: -10;
position: absolute;
`
const HomePage = ({ authenticated, setAuthenticated }) => {
    if (authenticated) {
        return <Redirect to="/feed" />;
    }
    return (
      
        <>
            <BackgroundImage className="background__home"/>
            <Header>The #1 app for runners and cyclists</Header>
            </>
      
    )
}

export default HomePage;