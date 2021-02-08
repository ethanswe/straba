import React, { useState, useEffect } from 'react'
import { Form } from 'semantic-ui-react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { createActivity } from '../../services/activity';

const BackgroundImg = styled.div`
background-image: url('https://images.pexels.com/photos/2729899/pexels-photo-2729899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'); 
width: 100vw;
height: 800px;
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
height: 70%;
color: white;
margin: 0 auto;
flex-direction: row;
background-color: black;
opacity: 85%;
z-index: 1;
margin-top: 20px;
padding: 10px;
`

const Header = styled.h3`
margin: 0 auto;
display: flex;
font-family: 'Fugaz One', cursive;
`

const StyledTextArea = styled.textarea`
width: 250px;
height: 200px;
margin-left: 5px;
`
const TestInput = styled.input`
width: 250px;
display: flex;
justify-content: center;
padding: 5px;
margin: 5px;
`

export const CreateActivityForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [distance_string, setDistance] = useState("");
    const [time_string, setTime] = useState("");
    const [gpx_file, setGPX_file] = useState(null);
    const [activityExample, setActivityExample] = useState('')
    const history = useHistory();
    const user_id = localStorage.getItem('userId') 
    
    // const handleChange = async(event, value)  =>{
    // }

    useEffect(() => {
    // await setActivityExample(event.target.value);
    console.log(activityExample)
   
    if(activityExample === 'Berlin'){
        setTitle('Berlin Marathon')
        setDescription('Not bad for my first marathon')
        setTime(243)
        setDistance(26.4)
        setGPX_file('https://www.google.com/maps/d/embed?mid=1e5LgIAckPl9KcTMT2Z-8BL64NEryO6k-')
    }
    if(activityExample === 'Beach'){
        setTitle('Rose Bowl Run')
        setDescription('Ran around the rose bowl stadium campus.')
        setTime(55)
        setDistance(4.5)
        setGPX_file('https://www.google.com/maps/d/embed?mid=1M9l3uERqL7DnB8ID89bVfPnQZAgC6vRN')
    }
    if(activityExample === 'Downtown'){
        setTitle('Running downtown')
        setDescription('Tough run, the concrete was hard.')
        setTime(20)
        setDistance(2.1)
        setGPX_file('https://www.google.com/maps/d/embed?mid=1gP16ZGuGQMG3UGCivwtXsdrWGXi2m-pE')
    }
    if(activityExample === 'River'){
        setTitle('Running along the river.')
        setDescription('I ran along the river, my feet hurt, but it was good.')
        setTime(70.3)
        setDistance(10.1)
        setGPX_file('https://www.google.com/maps/d/embed?mid=1sFWFcmleZGX5E9kuWAEAg0UPpSd2O7ON')
    }
}, [activityExample])


    return (
        <>
            <BackgroundImg />
            <Container>
                
                <Form>
                    <Header>Create A New Activity:</Header>
                        <Form.Field>
                            Title
                            <TestInput 
                            placeholder="Title" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            required
                            />
                        </Form.Field>
                        <Form.Field>
                            Description
                            <StyledTextArea 
                            placeholder="Describe your activity." 
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            Distance (miles)
                            <TestInput
                            type='number'
                            label={{ basic: true, content: 'miles' }}
                            labelPosition='right'
                            placeholder='Distance (miles)'
                            value={distance_string}
                            onChange={(e)=> setDistance(e.target.value)}
                            required
                            />
                        </Form.Field>
                        <Form.Field>
                            Time (minutes)
                            <TestInput
                            type='number'
                            label={{ basic: true, content: 'minutes' }}
                            labelPosition='right'
                            placeholder='Time (minutes)'
                            value={time_string}
                            onChange={(e)=> setTime(e.target.value)}
                            required
                            />
                        </Form.Field>
                        <Form.Field>
                            Google Map SRC
                            <TestInput 
                            placeholder="Google Map SRC" 
                            value={gpx_file} 
                            onChange={e => setGPX_file(e.target.value)}
                            />
                        </Form.Field>
                        <label>
                          Or pick a pre-made activity: <br></br>
                          <select value={activityExample} onChange={e => setActivityExample(e.target.value)}>
                            <option value=""></option>
                            <option value="Downtown">Downtown Run</option>
                            <option value="Beach">Rose Bowl Run</option>
                            <option value="Berlin">Berlin Marathon</option>
                            <option value="River">River Run</option>
                          </select>
                        </label>
                        <Form.Field>
                            <SubmitButton onClick = {async () => {
                               
                                const time = parseFloat(time_string).toFixed(2)
                                const distance = parseFloat(distance_string).toFixed(2)
                                
                                console.log(time)
                                console.log(distance)
                                let activity = {title, description, distance, time, gpx_file, user_id};
                                console.log(activity)
                                if (!time || !distance || !title || time === "NaN" || distance === "NaN"){
                                    alert('Please provide an activity title, time, and distance');
                                    return;
                                }
                                // if(time && distance && title && time !== NaN && distance !== NaN){ 
                                    
                                // }
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