import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import blankLike from '../activities-feed/like.png';


export const Kudos = ({activity})=> {
    const [loaded, setLoaded] = useState(false);
    const [kudos, setKudos] = useState(0);
    // console.log(activity.id)
    const activity_Id  = activity.id

    useEffect(() => {
        if(!activity_Id) {
            return
        }
        (async () => {
            // console.log("Inside useEffect: " + activity_Id)
        const response = await fetch(`/api/kudos/${activity_Id}`)
        const data = await response.json() 
        console.log(data)
        setKudos(data.kudos.length)
              
        setLoaded(true);
        
          
          
        })()
      }, [])

      if (!loaded) {
        return null;
      }
    return (
        <div>
            <img height='20px' width='20px' src={blankLike} alt='blanklike'></img>
            {kudos}
        </div>
    )
}