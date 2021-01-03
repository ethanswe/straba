import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import commentIcon from '../activities-feed/comment.png';


export const CommentsGet = ({activity})=> {
    const [loaded, setLoaded] = useState(false);
    const [comments, setComments] = useState(0);
    // console.log(activity.id)
    const activity_Id  = activity.id

    useEffect(() => {
        if(!activity_Id) {
            return
        }
        (async () => {
            // console.log("Inside useEffect: " + activity_Id)
        const response = await fetch(`/api/comments/activity/${activity_Id}`)
        const data = await response.json() 
        setComments(data.comments.length)
              
        setLoaded(true);
        
          
          
        })()
      }, [])

      if (!loaded) {
        return null;
      }
    return (
        <div>
            <img height='20px' width='20px' src={commentIcon} alt='commentIcon'></img>
            {comments}
        </div>
    )
}