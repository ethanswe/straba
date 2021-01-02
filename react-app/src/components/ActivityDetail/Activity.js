import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import styled from 'styled-components'
import './activity.css';
import logo from '../activities-feed/strabalogo.png';

const CenterContainer = styled.div`
display: flex;
margin: 0 auto;
justify-content: center;
align-items: center;
max-width: 700px;
z-index: 10;
background-color: white;
border-radius:25px;
margin-top: 50px;
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

const StyledDiv = styled.div`
margin-bottom: 5px;
background-color: white;
`

const UserDiv = styled.div`
margin: 5px;
margin-left: 5px;
display: flex;
justify-content: space-between;
`


const ActivityInfo = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-end;
margin-left: 10px;
margin: 5px;
`

const KudosDiv = styled.div`
margin: 5px;
display: flex;
justify-content: space-between;

`

const ActivityStats = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-end;
margin-left: 10px;
margin: 5px;
`

const Map = styled.div`

`
const ActivityStatsDiv = styled.div`
margin: 5px;
`

const ImgDiv = styled.div`
margin-right: 50px;
`

const DateDiv = styled.div`
margin-bottom: 2px;
`

const ActivityDiv = styled.div`
margin-bottom: 4px;
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
                <StyledDiv className='newsContainer'>
                    <UserDiv className='newsTitle'>
                {activities.user.first_name} {activities.user.last_name}
                </UserDiv>

                    <KudosDiv className='social'>
                      
                     # Kudos   # Comments
                    </KudosDiv>

            <ActivityInfo className='avatarTitle'>
              <ImgDiv>
                <img height='50px' width='50px' src={logo} alt='activity pic'></img>  
              </ImgDiv>
              <DateDiv>
                {activities.createdAt} 
              </DateDiv>
              <ActivityDiv>
                {activities.title} 
              </ActivityDiv>
                    </ActivityInfo>

                    <ActivityStats className='runstats-container'>
                        <ActivityStatsDiv>
                          Distance: 
                          {activities.distance} miles
                        </ActivityStatsDiv>
                        <ActivityStatsDiv>
                          Time: 
                          {activities.time > 60 ? (activities.time / 60).toFixed(2) + ' hours': activities.time + ' minutes'} 
                        </ActivityStatsDiv>
                        <ActivityStatsDiv>
                          Pace: 
                          {parseFloat(activities.time / activities.distance).toFixed(2)} minutes/mile
                        </ActivityStatsDiv>
                    </ActivityStats>

                    <div className='newsSummary'>
                      <div>
                      {activities.description}
                        </div>
                    </div>

                    <div className='map'>
                        <iframe src="https://www.google.com/maps/d/embed?mid=1_Nd9y4jr4qGFY1y3aKu_6eCxOjd3HAeq" width='100%' height='100%'></iframe>
                    </div>

                    <div className='comments'>
                        Comments:
                    </div>

            </StyledDiv>
          </CenterContainer>
        </>
    
    )

}