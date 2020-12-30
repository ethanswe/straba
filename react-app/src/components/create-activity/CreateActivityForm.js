import React, { useState } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import styled from 'styled-components'

const BackgroundImg = styled.div`
background-image: url('https://images.pexels.com/photos/2729899/pexels-photo-2729899.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'); 
width: 100vw;
height: 100vh;
background-size: cover;
/* display: flex; */
/* align-items: center; */
/* justify-content: center; */
/* z-index: -10; */
position: absolute;
`

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-radius: 25px;
width: 200px;
height: 235px;
color: white;
margin: 0 auto;
flex-direction: row;
background-color: black;
opacity: 85%;
z-index: 1;
margin-top: 150px;
position: absolute;
`

export const CreateActivityForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [distance_string, setDistance] = useState(0);
    const [time_string, setTime] = useState(0);
    const [gpx_file, setGPX_file] = useState(null);
    const [user_id, setUser_Id] = useState(1);
    return (
        <>
            <BackgroundImg />
                <Container>
                    <Form>
                        <Form.Field>
                            <Input 
                            placeholder="Title" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea 
                            placeholder="Describe your activity." 
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                            label={{ basic: true, content: 'miles' }}
                            labelPosition='right'
                            placeholder='Distance'
                            value={distance_string}
                            onChange={(e)=> setDistance(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input
                            label={{ basic: true, content: 'minutes' }}
                            labelPosition='right'
                            placeholder='Time'
                            value={time_string}
                            onChange={(e)=> setTime(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input 
                            placeholder="GPX File" 
                            value={gpx_file} 
                            onChange={e => setGPX_file(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Button onClick = {async () => {
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
                                    console.log('response worked')
                                } else {
                                    console.log(res)
                                    console.log('POST failed.')
                                }
                            }}>
                                Submit
                            </Button>
                        </Form.Field>
                    </Form>
            </Container>
           
        </>
    )
}