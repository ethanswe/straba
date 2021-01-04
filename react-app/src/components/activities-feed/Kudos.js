import React, { useState, useEffect } from 'react'
import blankLike from '../activities-feed/like.png';
import likedPhoto from '../activities-feed/liked.png';
import {createKudos, deleteKudos, userLikesPost} from '../../services/kudos'


export const KudosGet = ({activity, activities})=> {
    const [loaded, setLoaded] = useState(false);
    const [kudos, setKudos] = useState({});
    const [liked, setLiked] = useState(false);
    const user_id = localStorage.getItem('userId') 

    const onClick = async () => {
        // const response = await fetch(`/api/kudos/${activity_Id}`)
        // const data = await response.json();
        // console.log(data)

        
        if (liked === false) {
            let activity_id = activity.id; 
            createKudos(activity_id, user_id);
            setLiked(true)
            setKudos(kudos);
        } else {
            // let activity_id = activity.id; 
            // deleteKudos(activity_id, user_id);
            
            // setLiked(false);
            setKudos(kudos)
        }

        

    }
//gets the length of the kudos for count
    useEffect(() => {
        if(!activity.id) {
            return
        }
        (async () => {
            // console.log("Inside useEffect: " + activity_Id)
        const response = await fetch(`/api/kudos/activity/${activity.id}`)
        const data = await response.json() 
        await setKudos(data.kudos.length)
    

              
        setTimeout(function(){ setLoaded(true); }, 500);
        
        setLoaded(true)
   
        })()
      }, [liked, activity.id])

      //if a user gave kudos it should save the kudos
        useEffect(() => {
        (async () => {
            // console.log('Activity:' + activity.id + 'User:' + user_id)
            const likesResponse = await userLikesPost(activity.id, user_id)
            setLiked(likesResponse.kudos)
            // console.log('Liked?' + likesResponse.kudos)
        })()
    }, [liked, activity.id])

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
                        {kudos }
                    </div>
                </>
            }
        </>
    )
}