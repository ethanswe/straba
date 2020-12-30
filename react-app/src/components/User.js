import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Following from './Following'
import profile from "../images/Profile.png"
import '../stylesheets/user.css'

function User() {
  const [user, setUser] = useState({});
  const [overview, setOverview] = useState(true);
  const [follows, setFollows] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [followingNum, setFollowingNum] = useState(0);
  const [followersNum, setFollowersNum] = useState(0);
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();
  const currentUserId = localStorage.getItem('userId')

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
      const response2 = await fetch(`/api/following/users/${userId}`)
      const data = await response2.json();
      console.log(data)
      setFollowingNum(data.followingLen)
      setFollowersNum(data.followersLen)
      const response3 = await fetch(`/api/following/${userId}&${currentUserId}`)
      const data2 = await response3.json()
      console.log(data2)
      setFollows(data2.follows)
      console.log(follows)
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const handleOverview = () => {
    setFollowers(false);
    setOverview(true)
  }

  const handleFollowers = () => {
    setOverview(false);
    setFollowers(true)
  }

  const handleFollowing = async () => {
    if (follows === false) {
      const response = await fetch(`/api/following/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'userId': currentUserId
        }),
      });
      const data = await response.json();
      setFollows(true);
    } else {
      const response = await fetch(`/api/following/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          'userId': currentUserId
        }),
      });
      const data = await response.json();
      setFollows(false);
    }
    console.log(follows)
  }

  let content;
  const fillingContent = () => {
    switch (true) {
      case followers:
        content = <Following />
        break;
      default:
        content = <h4>ANOTHER TEST</h4>;
        break;
    }
    return;
  }

  fillingContent()

  return (
    <div className='userContainer'>
      <div className='userInfo'>
        <img src={profile} alt='stock profile'/>
        <div className='usersName'>
          <strong>{user.first_name} {user.last_name}</strong>
        </div>
        {follows ? (
          <h4 onClick={handleFollowing}>Following</h4>
        ) : (
          <h4 onClick={handleFollowing}>Follow</h4>
        )
       }
      </div>
      <div className='activitiesContainer'>
        <div className='usersActivities'>
          Last 4 Weeks <strong>0</strong> <h6>Total Activities</h6>
        </div>
        <div className='calendar'>
          this is a test
        </div>
      </div>
      <div className='lowerBody'>
        <div className='mainContainer'>
          <div className='overview'>
            {overview ? (
              <div> 
                <h3 onClick={handleOverview} className='activeTab'>Overview</h3>
              </div>
              ) : (
              <h3 onClick={handleOverview} className='tab'>Overview</h3>
              )
            }
          </div>
          <div className='followers'>
            {followers ? (
              <div>
                <h3 onClick={handleFollowers} className='activeTab'>Following</h3>
              </div>
              ) :
              <h3 onClick={handleFollowers} className='tab'>Following</h3>
            }
          </div>
          <div className='content'>
            {content}
          </div>
        </div>
        <div className='socialStats'>
          <h2>Social Stats</h2>
          <div className='followingCounts'>
            <div>
              <h6>Following</h6>
              <h4 onClick={handleFollowers}>{followingNum}</h4>
            </div>
            <div className='a'>
              <h6>Followers</h6>
              <h4 onClick={handleFollowers}>{followersNum}</h4>
            </div>
          </div>
          <div className='myStats'>
            <h2>My Stats</h2>
          </div>
        </div>
      </div> 
    </div>
  );
}
export default User;
