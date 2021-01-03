import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import styled from 'styled-components'

const StyledFormDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-radius: 25px;
width: 280px;
height: 300px;
color: white;
flex-direction: row;
background-color: black;
opacity: 85%;
z-index: 1;
`
const H1 = styled.h1`
display: flex;
justify-content: center;
font-family: 'Fugaz One', cursive;
align-items: center;
font-size: 15px;
`
const BackgroundPhoto = styled.div`
background-image: url('https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'); 
width: 100vw;
height: 91vh;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`
const StyledForm = styled.form`
/* background-color: black; */
/* margin-left: 31px; */
/* margin: 0 auto; */

`



const SignUpInput = styled.input`
width: 200px;
margin-left: 14%;
:focus{
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  background-color: black;
  background: transparent;
  transition: 0.5s;
  color: white;
}
`

const SignUpButton = styled.button`
  background: #222;
  height: 25px;
  min-width: 90px;
  border: none;
  border-radius: 10px;
  color: #eee;
  font-size: 20px;
  font-family: 'Fugaz One', cursive;
  position: relative;
  transition: 1s;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 60px;
  margin-top: 3px;
:hover{
  background: transparent;
  height: 35px;
  min-width: 90px;
  left: 0;
  border-radius: 0;
  border-bottom: 2px solid #eee;
}
`

const SignUpForm = ({authenticated, setAuthenticated}) => {
  // const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] =useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(firstName, lastName, city, country, email, password);
      if (!user.errors) {
        setAuthenticated(true);
        localStorage.setItem('userId', user.id);
      }
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  }

  const updateCountry = (e) => {
    setCountry(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateAvatar = (e) => {
    setAvatar(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/feed" />;
  }

  return (
    <>
      <BackgroundPhoto>
        <StyledFormDiv>
          <StyledForm onSubmit={onSignUp}>
            <div>
              <H1>Join Straba today, it's free.</H1>
              <SignUpInput
                type="text"
                name="first_name"
                onChange={updateFirstName}
                value={firstName}
                placeholder={"First Name"}
              ></SignUpInput>
            </div>
            <div>
              <SignUpInput
                type="text"
                name="last_name"
                onChange={updateLastName}
                value={lastName}
                placeholder={"Last Name"}
              ></SignUpInput>
            </div>
            <div>
              <SignUpInput
                type="text"
                name="city"
                onChange={updateCity}
                value={city}
                placeholder={"City"}
              ></SignUpInput>
            </div>
            <div>
              <SignUpInput
                type="text"
                name="country"
                onChange={updateCountry}
                value={country}
                placeholder={"Country"}
              ></SignUpInput>
            </div>
            <div>
              <SignUpInput
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
                placeholder={"Email"}
              ></SignUpInput>
            </div>
            <div>
              <SignUpInput
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                placeholder={"Password"}
              ></SignUpInput>
            </div>
            <div>
              <SignUpInput
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                placeholder={"Confirm Password"}
                required={true}
              ></SignUpInput>
              <SignUpInput
                type="avatar"
                name="avatar"
                onChange={updateAvatar}
                value={avatar}
                placeholder={"Optional Avatar"}
              ></SignUpInput>
            </div>
            <SignUpButton type="submit">Sign Up</SignUpButton>
          </StyledForm>
        </StyledFormDiv>
      </BackgroundPhoto>
    </>
  );
};

export default SignUpForm;
