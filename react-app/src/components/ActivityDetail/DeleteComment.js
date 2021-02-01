import React, { useState } from 'react'

import styled from 'styled-components'
import { deleteComment } from '../../services/comment';

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


export const DeleteComment = ({comment, comments, setComments, activityId})=> { 
   
    const user_id = localStorage.getItem('userId')     

    return (
        <>
        {comment.user.id == user_id ?
            <SubmitButton onClick={async ()=> {
              await deleteComment(comment.id) 
                const response = await fetch(`/api/comments/activity/${activityId}`)
                const data = await response.json() 
                await setComments(data.comments)
                
              }}>Delete</SubmitButton> :
              '' 
            }
            </>
    )
}