import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import styled from 'styled-components'
import './activity.css';
import { CommentForm } from './CommentForm';
import commentIcon from '../activities-feed/comment.png';
import blankLike from '../activities-feed/like.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import profile from "../User/Profile.png";
import { deleteComment } from '../../services/comment';
import { deleteActivity } from '../../services/activity';
import {KudosGet} from '../activities-feed/Kudos'

const SubmitButton = styled.button`
  background: #222;
  height: 25px;
  min-width: 90px;
  border: none;
  border-radius: 10px;
  color: #eee;
  font-size: 15px;
font-family: 'Fugaz One', cursive;
  position: relative;
  transition: 1s;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 3px;
:hover{
  background: transparent;
  height: 30px;
  min-width: 90px;
  left: 0;
  border-radius: 0;
  border-bottom: 2px solid #eee;
}
`



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
box-shadow: 0px 5px 3px 3px lightgray;
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
    const [comments, setComments] = useState({});
    const [kudos, setKudos] = useState(0);

    const user_id = localStorage.getItem('userId')     


    const { activityId }  = useParams();

    //fetch the activity data
    useEffect(() => {
      if(!activityId) {
        return
    }
    (async () => { 
      const response = await fetch(`/api/activities/${activityId}`)
      const data = await response.json()
      await setActivities(data.activities)
      
        })()
    }, [activityId])
    //fetch the comments for the particular activity
    useEffect(() => {
      if(!activityId) {
          return
      }
      (async () => {
          // console.log("Inside useEffect: " + activity_Id)
      const response = await fetch(`/api/comments/activity/${activityId}`)
      const data = await response.json() 
      await setComments(data.comments)
      
        
      })()
    }, [activityId])

    //fetch the kudos for the particular activity
    useEffect(() => {
      if(!activityId) {
          return
      }
      (async () => {
          // console.log("Inside useEffect: " + activity_Id)
      const response = await fetch(`/api/kudos/activity/${activityId}`)
      const data = await response.json() 
      await setKudos(data.kudos.length)
      
      setTimeout(function(){ setLoaded(true); }, 500);
      })()
    }, [activityId])

    if (!loaded ) {
      return (
        <>
        <BackgroundPhoto/>
           <CenterContainer>
           <StyledDiv className='newsContainer'>
        <main className="centered middled">
          <div><b>Fetching activity data...</b></div>
            
          <CircularProgress />
          
          </main>
          </StyledDiv>
          </CenterContainer>
        </>
        )
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
                      
                    Kudos: 
                    <KudosGet activity={activities}/>  
                    Comments: 
                    <div>
                      <img height='20px' width='20px' src={commentIcon} alt='commentIcon'></img>
                        {comments.length}
                       </div>
                    </KudosDiv>

            <ActivityInfo className='avatarTitle'>
              <ImgDiv>
                <img className='avatar-a' height='50px' width='50px' src={activities.user.avatar ? activities.user.avatar : profile} alt='activity pic'></img>  
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
                    {activities.gpx_file ? <iframe src={activities.gpx_file} width='100%' height='100%'></iframe> : 
                        <iframe src="https://www.google.com/maps/d/embed?mid=1_Nd9y4jr4qGFY1y3aKu_6eCxOjd3HAeq" width='100%' height='100%'></iframe>}
                    </div>
                    {activities.user.id == user_id ?
                            <SubmitButton onClick={async ()=> {
                              deleteActivity(activities.id) 
                              console.log(activities.id)
                              window.location.replace('/feed')
                              }}>Delete Activity</SubmitButton> :
                              '' 
                            } 

                    <div className='comments'>
                        Comments: 
                        {comments.map(comment =>
                          <div  key={comment.id}>
                            <div>
                            <img className='avatar-a' height='50px' width='50px' src={comment.user.avatar ? comment.user.avatar : profile} alt='comment pic'></img>
                              {comment.user.first_name} {comment.user.last_name} - {comment.createdAt}
                            </div>
                            <div>{comment.text}</div> 
                            {comment.user.id == user_id ?
                            <SubmitButton onClick={async ()=> {
                              deleteComment(comment.id) 
                              // history.push(`/feed/${activities.id}`)
                              window.location.reload(false);
                              }}>Delete</SubmitButton> :
                              '' 
                            }                        
                          </div>
                          )}
                    </div>
                        
                   

            </StyledDiv>
            
          </CenterContainer>
          <CommentForm activities={activities} comments={comments} />
        </>
    
    )

}