import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import blankLike from '../activities-feed/like.png';
import likedPhoto from '../activities-feed/liked.png';



export const KudosGet = ({activity})=> {
    const [loaded, setLoaded] = useState(false);
    const [kudos, setKudos] = useState(0);
    const [liked, setLiked] = useState(false);
    // console.log(activity.id)
    const activity_Id  = activity.id


    const onClick = async () => {
        // const response = await fetch(`/api/kudos/${activity_Id}`)
        // const data = await response.json();
        // console.log(data)
        setKudos(1);
        if (liked === false) {
            setLiked(true)
        } else {
            setLiked(false);
            setKudos(0)
        }

        

    }

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
        <>
            {liked ?
                <>
                    <div>
                        <img height='20px' width='20px' src={likedPhoto} alt='likedPhoto' onClick={onClick}></img>
                        {kudos}
                    </div>
                </>
                :
                <>
                    <div>
                        <img height='20px' width='20px' src={blankLike} alt='blanklike' onClick={onClick}></img>
                        {kudos}
                    </div>
                </>
            }
        </>
    )
}