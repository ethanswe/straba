import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import styled from 'styled-components'

const StyledFormDiv = styled.div`
display: flex;
justify-content: center;
width: 400px;
height: 472px;
color: white;
/* margin: 0 auto; */
/* margin: 0 auto; */
flex-direction: row;
background-color: black;
opacity: 85%;
z-index: 1;
`

const BackgroundPhoto = styled.div`
background-image: url('https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'); 
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
/* position: absolute;
overflow: hidden; */
`
const StyledForm = styled.form`
/* background-color: black; */

`

const SignUpButton = styled.label`
margin: 10px;
`

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <BackgroundPhoto>
    <StyledFormDiv>
      <StyledForm onSubmit={onSignUp}>
        <div>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
                value={username}
                placeholder={"Username"}
          ></input>
        </div>
        <div>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
                value={email}
                placeholder={"Email"}
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
                value={password}
                placeholder={"Password"}
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
                value={repeatPassword}
                placeholder={"Confirm Password"}
            required={true}
          ></input>
        </div>
        <button type="submit">Sign Up</button>
        </StyledForm>
        </StyledFormDiv>
      </BackgroundPhoto>
      </>
  );
};

export default SignUpForm;
