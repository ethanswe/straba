import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import '../activities-feed/activities.css';
import logo from '../activities-feed/strabalogo.png';


export const Activity = ()=> {
    const [loaded, setLoaded] = useState(false);
    const [activities, setActivities] = useState({});
    const { activityId }  = useParams();

    useEffect(() => {
      fetch(`/api/activities/${activityId}`).then(res =>
        res.json().then(data => {
            setActivities(data.activities)
            
            setLoaded(true);
            console.log(data)
        })
        )
    }, [])
    if (!loaded) {
        return null;
      }
    return (
      <>
           
                <div className='newsContainer' key={activities.id}>
                    <div className='newsTitle'>
                      {activities.title} 
                      <div>
                      {activities.user.first_name} {activities.user.last_name} 
                      </div>
                    
                    <div className='newsSummary'>
                    <div>
                      {activities.createdAt}
                      </div>
                      {activities.description}
                    </div>
                    </div>
                    <div className='newsImg'>
                     <img height='50px' width='50px' src={logo} alt='activity pic'></img>
                     </div>
                    
                    
                    
                 </div>
        </>
    
    )

}