import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { List, Header } from 'semantic-ui-react'
import './activities.css';
import logo from './strabalogo.png';


export const ActivityFeed = ()=> {
    const [loaded, setLoaded] = useState(false);
    const [activities, setActivities] = useState({});

    useEffect(() => {
      fetch('/api/activities').then(res =>
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

            {activities.map(activity =>{
              return (
                <div className='newsContainer' key={activity.id}>
                    <div className='newsTitle'>
                      <NavLink to={`/activities/${activity.id}`}>
                      {activity.title}
                      </NavLink>
                      
                      <div>
                      <NavLink to={`/users/${activity.user.id}`}>
                      {activity.user.first_name} {activity.user.last_name}
                      </NavLink> 
                      <div className='runstats-container'>
                        <div>
                          Distance: 
                          {activity.distance} miles
                        </div>
                        <div>
                          Time: 
                          {activity.time > 60 ? (activity.time / 60).toFixed(2) + ' hours': activity.time + ' minutes'} 
                        </div>
                        <div>
                          Pace: 
                          {parseFloat(activity.time / activity.distance).toFixed(2)} minutes/mile
                        </div>
                      </div>
                      </div>
                    
                    <div className='newsSummary'>
                    <div>
                      {activity.createdAt}
                      </div>
                      {activity.description}
                    </div>
                    </div>
                    <div className='newsImg'>
                     <img height='50px' width='50px' src={logo} alt='activity pic'></img>
                     </div>
                    
                    
                    
                 </div>
              )
            })}
        </>
    
    )

}