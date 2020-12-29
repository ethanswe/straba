import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import styled from 'styled-components'

const StyledFormDiv = styled.div`
display: flex;
justify-content: center;
border-radius: 25px;
width: 200px;
height: 120px;
color: white;
/* margin: 0 auto; */
/* margin: 0 auto; */
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
height: 100vh;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
/* position: absolute;
overflow: hidden;  */
/* background-repeat:no-repeat; */
/* background-size: cover; */
`
const StyledForm = styled.form`
/* background-color: black; */
margin-left: 10px;
`


const LogInButton = styled.button`
  background: #222;
  height: 35px;
  min-width: 90px;
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
  padding-top: 5px;
  margin: 0 auto;
:hover{
  background: transparent;
  height: 35px;
  min-width: 90px;
  left: 0;
  border-radius: 0;
  border-bottom: 2px solid #eee;
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
    return <Redirect to="/" />;
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
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
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
