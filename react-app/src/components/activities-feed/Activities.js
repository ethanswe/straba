import React, { useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { List, Header } from 'semantic-ui-react'
import './activities.css';
import styled from 'styled-components'
import { KudosGet } from './Kudos';
import AboutUs from '../about-us-feed/AboutUs';
import { CommentsGet } from './Comments';
import profile from "../User/Profile.png";
import MiniProfile from '../Mini-Profile/mini-profile';



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
border-radius: 8px;

`

const StyledDiv = styled.div`
margin-bottom: 5px;
background-color: white;

`

const StyledInfo = styled.div`

`

const KudosDiv = styled.div`
margin: 5px;
display: flex;
justify-content: space-between;

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

const ActivityStats = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-end;
margin-left: 10px;
margin: 5px;
`

const ActivityStatsDiv = styled.div`
margin: 5px;
`

const ImgDiv = styled.div`
margin-right: 50px;
border-radius: 50%;
`

const DateDiv = styled.div`
margin-bottom: 2px;
`

const ActivityDiv = styled.div`
margin-bottom: 4px;
`

const Kudos = styled.div`
background-color: white;
max-width: 650px;
margin: 0 auto;
height: 30px;
/* display: flex; */
/* justify-content: center; */
/* align-items: center; */
`
const KudosImg = styled.div`
background-image: url('https://lh3.googleusercontent.com/proxy/OiqlUE1iAcPEccwy6Y5biS8eARro-Bh6BW-JCsTGs69HFjLU9ekoOGGn_auQFPKTb4GTYGBmT4oRmiCitC8gAf-O2hBBnDAs_EkY1FhWIcVbM9vA7a-JXThcMl2nLQ93ZNQIfHtWTYV3PHiwuh2ve_nz0DMe6vRjOawF');
width: 30px;
height: 30px;
/* background-color: black; */
background-size: cover;
/* display: flex;
align-items: center;
justify-content: center; */

`

const AboutUsDiv = styled.div`
margin-right: 0 auto;

`


export const ActivityFeed = () => {
    const [loaded, setLoaded] = useState(false);
    const [activities, setActivities] = useState({});

  
    useEffect(() => {
      fetch('/api/activities').then(res =>
        res.json().then(data => {
            setActivities(data.activities)
            
            setLoaded(true);
        })
        )
    }, [])
    if (!loaded) {
        return null;
    }

    return (
      <>
      <BackgroundPhoto/>
      <AboutUs />
      <MiniProfile />
        {activities.map(activity => {
          return (
                <div key={activity.id}>
                <CenterContainer >
                <StyledDiv className='newsContainer1'>
                    <UserDiv className='newsTitle1'>
                      
                    <NavLink to={`/users/${activity.user.id}`}>
                      {activity.user.first_name} {activity.user.last_name}
                      </NavLink>  
                    </UserDiv>

                    <KudosDiv className='social1'>
                    Kudos: <KudosGet activity={activity}/> 
                    Comments: <NavLink to={`/activities/${activity.id}`}>
                      <CommentsGet activity={activity} />
                      </NavLink>
                    </KudosDiv>
                    <ActivityInfo className='avatarTitle1'>
                      <ImgDiv>
                        <NavLink to={`/users/${activity.user.id}`}>
                          <img className='avatar' height='50px' width='50px'  src={activity.user.avatar ? activity.user.avatar : profile} alt='avatar pic'></img>  
                        </NavLink>
                      </ImgDiv>
                      <DateDiv>
                        {activity.createdAt} 
                      </DateDiv>
                      <ActivityDiv>
                        <NavLink to={`/activities/${activity.id}`}>
                      {activity.title}
                        </NavLink>
                      </ActivityDiv>
                    </ActivityInfo>

                    <ActivityStats className='runstats-container1'>
                        <ActivityStatsDiv>
                          Distance: {activity.distance} miles
                        </ActivityStatsDiv>
                        <ActivityStatsDiv>
                          Time: 
                          {activity.time > 60 ? (activity.time / 60).toFixed(2) + ' hours': activity.time + ' minutes'} 
                        </ActivityStatsDiv>
                        <ActivityStatsDiv>
                          Pace: {parseFloat(activity.time / activity.distance).toFixed(2)} minutes/mile
                        </ActivityStatsDiv>
                    </ActivityStats>

            

                    <div className='map1'>
                        {activity.gpx_file ? <iframe src={activity.gpx_file} width='100%' height='100%'></iframe> : 
                        <iframe src="https://www.google.com/maps/d/embed?mid=1_Nd9y4jr4qGFY1y3aKu_6eCxOjd3HAeq" width='100%' height='100%'></iframe>}
                        
                    </div>


                  </StyledDiv> 
              </CenterContainer>
              </div>
              )
        })}
        </>
    
    )

}