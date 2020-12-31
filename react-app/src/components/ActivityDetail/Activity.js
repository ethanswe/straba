import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import './activity.css';
import logo from '../activities-feed/strabalogo.png';

const CenterContainer = styled.div`
display: flex;
margin: 0 auto;
justify-content: center;
max-width: 650px;
z-index: 10;
`
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
`

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
        <BackgroundPhoto/>
           <CenterContainer>
                <div className='newsContainer'>
                    <div className='newsTitle'>
                      
                      {activities.user.first_name} {activities.user.last_name}
                    </div>

                    <div className='social'>
                      
                     # Kudos   # Comments
                    </div>

                    <div className='avatarTitle'>
                        <img height='50px' width='50px' src={logo} alt='activity pic'></img>  
                        {activities.createdAt} 
                        {activities.title} 
                    </div>

                    <div className='runstats-container'>
                        <div>
                          Distance: 
                          {activities.distance} miles
                        </div>
                        <div>
                          Time: 
                          {activities.time > 60 ? (activities.time / 60).toFixed(2) + ' hours': activities.time + ' minutes'} 
                        </div>
                        <div>
                          Pace: 
                          {parseFloat(activities.time / activities.distance).toFixed(2)} minutes/mile
                        </div>
                    </div>

                    <div className='newsSummary'>
                      <div>
                      {activities.description}
                        </div>
                    </div>

                    <div className='map'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d41533406.428697795!2d73.8664217!3d50.5528081!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2skr!4v1609370759819!5m2!1sen!2skr" width='100%' height='100%'></iframe>
                    </div>

                    <div className='comments'>
                        Comments:
                    </div>

            </div>
          </CenterContainer>
        </>
    
    )

}