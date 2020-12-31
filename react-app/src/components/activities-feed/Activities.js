import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { List, Header } from 'semantic-ui-react'
import './activities.css';
import logo from './strabalogo.png';
import styled from 'styled-components'


const BackgroundPhoto = styled.div`
background-image: url('https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'); 
width: 100vw;
height: 100vh;
background-size: cover;
/* display: flex;
align-items: center;
justify-content: center; */
z-index: -10;
position: fixed;
left: 0;
opacity: 50%;
overflow-y: hidden;
`

const CenterContainer = styled.div`
display: flex;
margin: 0 auto;
justify-content: center;
max-width: 650px;
z-index: 1;
overflow: auto;
margin-top: 10px;
border-radius: 5px;

`

const StyledDiv = styled.div`
margin-bottom: 5px;
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
      <BackgroundPhoto/>
        {activities.map(activity => {
              return (
                <CenterContainer>
                <StyledDiv className='newsContainer1'>
                    <div className='newsTitle1'>
                      
                    <NavLink to={`/users/${activity.user.id}`}>
                      {activity.user.first_name} {activity.user.last_name}
                      </NavLink>  
                    </div>

                    <StyledInfo className='social1'>
                      
                     # Kudos   # Comments
                    </StyledInfo>

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
                        <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d41533406.428697795!2d73.8664217!3d50.5528081!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2skr!4v1609370759819!5m2!1sen!2skr" width='100%' height='100%'></iframe>
                    </div>


                  </StyledDiv> 
                </CenterContainer>
              )
        })}
        </>
    
    )

}