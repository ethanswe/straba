import React, { useState } from 'react'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'

export const CreateActivityForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [distance_string, setDistance] = useState(0);
    const [time_string, setTime] = useState(0);
    const [gpx_file, setGPX_file] = useState(null);
    const [user_id, setUser_Id] = useState(1);
    return (
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
    )
}