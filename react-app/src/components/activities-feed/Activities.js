import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { List, Header } from 'semantic-ui-react'
import './activities.css';
import logo from './strabalogo.png';
import styled from 'styled-components'
import { Kudos } from './Kudos';

const CenterContainer = styled.div`
display: flex;
margin: 0 auto;
justify-content: center;
max-width: 600px;
`

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
                <CenterContainer>
                <div className='newsContainer1'>
                    <div className='newsTitle1'>
                      
                    <NavLink to={`/users/${activity.user.id}`}>
                      {activity.user.first_name} {activity.user.last_name}
                      </NavLink>  - Run
                    </div>

                    <div className='social1'>
                      
                     
                      <span> <Kudos activity={activity}/> # Kudos   # Comments </span>
                    </div>

                    <div className='avatarTitle1'>
                        <img height='50px' width='50px' src={logo} alt='activity pic'></img>  
                        {activity.createdAt} 
                        <NavLink to={`/activities/${activity.id}`}>
                      {activity.title}
                      </NavLink>
                    </div>

                    <div className='runstats-container1'>
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

            

                    <div className='map1'>
                        <iframe src="https://www.google.com/maps/d/embed?mid=1_Nd9y4jr4qGFY1y3aKu_6eCxOjd3HAeq" width='100%' height='100%'></iframe>
                    </div>


                  </div> 
                </CenterContainer>
              )
            })}
        </>
    
    )

}