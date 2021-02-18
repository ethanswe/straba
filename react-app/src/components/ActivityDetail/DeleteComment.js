import React from 'react'

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


export const DeleteComment = ({comment, comments, setComments, activityId})=> { 
   
    const user_id = localStorage.getItem('userId')     

    return (
        <>
        {comment.user.id === user_id ?
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