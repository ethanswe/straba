import React, { useState, useEffect } from 'react'
import blankLike from '../activities-feed/like.png';
import likedPhoto from '../activities-feed/liked.png';
import {createKudos, getUserKudos, deleteKudos, userLikesPost} from '../../services/kudos'


export const KudosGet = ({activity, activities})=> {
    const [loaded, setLoaded] = useState(false);
    const [kudos, setKudos] = useState({});
    const [liked, setLiked] = useState(false);
    const user_id = localStorage.getItem('userId') 
    const [kudosData, setKudosData] = useState([]);


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
        await setKudosData(data.kudos)
        
            
            
        

              
     
       
        
       
        
        })()
      }, [liked, activity.id])

      //if a user gave kudos it should save the kudos
        useEffect(() => {
        (async () => {
           const kudosBoolean = await getUserKudos(user_id, activity.id)
            setLiked(kudosBoolean.kudos)

            setTimeout(function(){ setLoaded(true); }, 250);
        })()
    }, [liked, activity.id])

      if (!loaded) {
        return '';
      }

 


    const onClick = async () => {
            let activity_id = activity.id; 
            createKudos(activity_id, user_id);
            setLiked(true)
            setKudos(kudos);
    }

    const deleteClick = async () => {
        let activity_id = activity.id; 
        await deleteKudos(activity_id, user_id);
        setLiked(false)
        setKudos(kudos);
}

    if (loaded){ 
       
          
           
        
    return (
        <>
            {liked ?
                <>
                    <div>
                        <img height='20px' width='20px' src={likedPhoto} alt='likedPhoto' onClick={deleteClick}></img>
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
}