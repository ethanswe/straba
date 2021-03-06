import React, { useState } from 'react'
import {createComment, getComments} from '../../services/comment'
import { Form } from 'semantic-ui-react'
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
margin: 0 auto;
justify-content: center;
align-items: center;
max-width: 700px;
z-index: 10;
background-color: white;
border-radius:25px;
margin-top: 10px;
box-shadow: 0px 5px 3px 3px lightgray;
padding: 10px;
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


export const CommentForm = ({comments, setComments, activityId})=> { 
    const [text, setText] = useState('')
    const user_id = localStorage.getItem('userId')   
    
    const onAddComment = async (e) => {
      e.preventDefault()
      setText('')
      const newComment = await createComment(text, user_id, activityId);
    
        
        
        // await getComments(activityId)
      await setComments([newComment, ...comments])
    }
   
    return (
        <Container>
           
                <Form onSubmit = {onAddComment}>
                   
                <Header>Make a Comment:</Header>
                        <Form.Field>
                            <StyledTextArea 
                            placeholder="Post a nice comment." 
                            value={text}
                            onChange={(e)=> setText(e.target.value)}
                            />
                     </Form.Field>
                     <Form.Field>
                            <SubmitButton >
                                Submit
                                

                            </SubmitButton>
                            </Form.Field>
                    </Form>
            </Container>
    )
}