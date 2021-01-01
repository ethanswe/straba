import React, { useState, useEffect } from 'react'
import {createComment} from '../../services/createComment'
import { Form, Input, TextArea, Button } from 'semantic-ui-react'
import styled from 'styled-components'

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
width: 500px;
height: 300px;
color: white;
margin: 0 auto;
flex-direction: row;
background-color: black;
opacity: 85%;
z-index: 1;
margin-top: 10px;
`

const Header = styled.h3`
margin: 0 auto;
display: flex;
font-family: 'Fugaz One', cursive;
`

const StyledTextArea = styled.textarea`
width: 400px;
height: 200px;
`


export const CommentForm = ({activities})=> { 
    const [text, setText] = useState('')
    const [loaded, setLoaded] = useState(false);
    // if (activities){
    //     setLoaded(true)
    // }

    // if (!loaded) {
    //     return null;
    //   }
   
    return (
        <Container>
                <Form>
                    <Header>Make a Comment:</Header>
                       
                        <Form.Field>
                            <StyledTextArea 
                            placeholder="Post a nice comment." 
                            value={text}
                            onChange={(e)=> setText(e.target.value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <SubmitButton onClick = {async () => {
                                let activity_id = activities.id
                                let user_id = 1
                                  await createComment(user_id, text, activity_id);
                                }}>
                                Submit
                            </SubmitButton>
                        </Form.Field>
                    </Form>
            </Container>
    )
}