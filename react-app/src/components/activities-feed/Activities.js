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
            {/* <List>
                {activities.map(activity =>{
                   return(
                        <List.Item key={activity.title}>
                            <Header>
                                {activity.title}
                            </Header>
                            <Header>
                                {activity.description}
                            </Header>
                            <Header>
                                {activity.distance} miles
                            </Header>
                            <Header>
                                {activity.time} minutes
                            </Header>
                        </List.Item>
                   )
                })}
            </List> */}
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