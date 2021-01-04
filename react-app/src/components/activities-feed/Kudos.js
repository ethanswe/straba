import React, { useState, useEffect } from 'react'
import blankLike from '../activities-feed/like.png';
import likedPhoto from '../activities-feed/liked.png';
import {createKudos, deleteKudos} from '../../services/kudos'


export const KudosGet = ({activity, activities})=> {
    const [loaded, setLoaded] = useState(false);
    const [kudos, setKudos] = useState(0);
    const [liked, setLiked] = useState(false);
    // console.log(activity.id)
    const activity_Id  = activity.id
    const user_id = localStorage.getItem('userId') 

    const onClick = async () => {
        // const response = await fetch(`/api/kudos/${activity_Id}`)
        // const data = await response.json();
        // console.log(data)

        setKudos(kudos + 1);
        if (liked === false) {
            let activity_id = activity.id; 
            console.log(activity_id);
            createKudos(activity_id, user_id);
            setLiked(true)
        } else {
            let activity_id = activity.id; 
            deleteKudos(activity_id, user_id);
            setKudos(kudos-1)
            setLiked(false);
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