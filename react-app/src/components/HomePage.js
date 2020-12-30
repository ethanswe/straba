import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styled from 'styled-components'

const Header = styled.div`
font-size: 40px;
display: flex;
align-items: center;
justify-content: center;
margin-top: 60px;
position: relative;
z-index: 10;
`
const Header2 = styled.div`
font-size: 25px;
display: flex;
align-items: center;
justify-content: center;
margin-top: 10px;
position: relative;
z-index: 10;
`

const BackgroundImage = styled.div`
background-image: url('https://images.pexels.com/photos/1081031/pexels-photo-1081031.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
width: 100vw;
height: 100vh;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
z-index: -10;
position: absolute;
`
const HomePage = () => {




    return (
        <>
        <>
            <BackgroundImage />
                <Header>The #1 app for runners and cyclists</Header>
            </>
        </>
    )
}

export default HomePage;