import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";

const BackgroundImg = styled.div`
background-image: url('https://images.pexels.com/photos/2729899/pexels-photo-2729899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'); 
width: 100vw;
height: 91vh;
background-size: cover;
position: absolute;
`

const SubmitButton = styled.button`
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
  margin-top: 3px;
:hover{
  background: transparent;
  height: 30px;
  min-width: 90px;
  left: 0;
  border-radius: 0;
  border-bottom: 2px solid #eee;
}
`

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-radius: 25px;
width: 300px;
height: 400px;
color: white;
margin: 0 auto;
flex-direction: row;
background-color: black;
opacity: 85%;
z-index: 1;
margin-top: 150px;
`

const Header = styled.h3`
margin: 0 auto;
display: flex;
font-family: 'Fugaz One', cursive;
`

const StyledTextArea = styled.textarea`
width: 250px;
height: 200px;
`
const TestInput = styled.input`
width: 136.71px;
display: flex;
justify-content: center;
`

export const CreateActivityForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [distance_string, setDistance] = useState("");
    const [time_string, setTime] = useState("");
    const [gpx_file, setGPX_file] = useState(null);
    const history = useHistory();
    const user_id = localStorage.getItem('userId')  
    return (
        <>
            <BackgroundImg />
            <Container>
                <Form>
                    <Header>Create A New Activity:</Header>
                        <Form.Field>
                            <TestInput 
                            placeholder="Title" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <StyledTextArea 
                            placeholder="Describe your activity." 
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TestInput
                            type='number'
                            label={{ basic: true, content: 'miles' }}
                            labelPosition='right'
                            placeholder='Distance (miles)'
                            value={distance_string}
                            onChange={(e)=> setDistance(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TestInput
                            type='number'
                            label={{ basic: true, content: 'minutes' }}
                            labelPosition='right'
                            placeholder='Time (minutes)'
                            value={time_string}
                            onChange={(e)=> setTime(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TestInput 
                            placeholder="Google Map SRC" 
                            value={gpx_file} 
                            onChange={e => setGPX_file(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <SubmitButton onClick = {async () => {
                                const time = parseFloat(time_string).toFixed(2)
                                const distance = parseFloat(distance_string).toFixed(2)
                                console.log(time)
                                console.log(distance)
                                const activity = {title, description, distance, time, gpx_file, user_id};
                                console.log(activity)
                                const res = await fetch(`/api/activities/new/${user_id}`, {
                                    // /api/activities/users/1/activities/new
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(activity)
                                })
                                if (res.ok){
                                    alert('Your Activity Has Been Recorded!');
                                    history.push('/feed')
                                } else {
                                    console.log(res)
                                    console.log('POST failed.')
                                }
                            }}>
                                Submit
                            </SubmitButton>
                        </Form.Field>
                    </Form>
            </Container>
           
        </>
    )
}