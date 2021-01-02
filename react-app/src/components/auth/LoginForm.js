import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../services/auth";
import styled from 'styled-components'

const StyledFormDiv = styled.div`
display: flex;
justify-content: center;
border-radius: 25px;
width: 225px;
height: 120px;
color: white;
flex-direction: row;
background-color: black;
opacity: 85%;
z-index: 1;
`
const H1 = styled.h1`
display: flex;
justify-content: center;
align-items: center;
font-size: 15px;
`

const BackgroundPhoto = styled.div`
background-image: url('https://images.pexels.com/photos/3621185/pexels-photo-3621185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'); 
width: 100vw;
height: 91vh;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`
const StyledForm = styled.form`

`


const LogInButton = styled.button`
  background: #222;
  height: 35px;
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
  padding-top: 5px;
  margin: 0 auto;
  margin-top: 5px;
:hover{
  background: transparent;
  height: 35px;
  min-width: 90px;
  left: 0;
  border-radius: 0;
  border-bottom: 2px solid #eee;
}
`

const LogInInput = styled.input`
width: 200px;
:focus{
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  background-color: black;
  background: transparent;
  transition: 0.5s;
  color: white;
}
`

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      localStorage.setItem('userId', user.id);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/feed" />;
  }

  return (
    <>
    <BackgroundPhoto>
      <StyledFormDiv>
        <StyledForm onSubmit={onLogin}>
          <div>
            {errors.map((error) => (
              <div>{error}</div>
            ))}
          </div>
            <div>
              <H1>Welcome Back!</H1>
            <LogInInput
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <LogInInput
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <LogInButton type="submit">Login</LogInButton>
          </div>
          </StyledForm>
        </StyledFormDiv>
    </BackgroundPhoto>
    </>
  );
};

export default LoginForm;
