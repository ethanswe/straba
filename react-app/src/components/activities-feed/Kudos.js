import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import blankLike from '../activities-feed/like.png';


export const Kudos = ({activity})=> {
    const [loaded, setLoaded] = useState(false);
    const [activities, setActivities] = useState({});
    // const activity_Id  = activity.id;
    // useEffect(() => {
    //     const getPostLikes = async (activity_Id) => {
    //     fetch(`/api/kudos/1`).then(res =>
    //       res.json().then(data => {
    //           setActivities(data)
              
    //           setLoaded(true);
    //           console.log(data)
    //       })
    //       )
    //     }
    //     getPostLikes();
    //   }, [])
    //   if (!loaded) {
    //     return null;
    //   }
    return (
        <div>
            <img height='20px' width='20px' src={blankLike} alt='blanklike'></img>
            {activities.activity_id}
        </div>
    )
}