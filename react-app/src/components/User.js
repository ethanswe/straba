import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Following from './Following'
import profile from "../images/Profile.png"
import '../stylesheets/user.css'

function User() {
  const [user, setUser] = useState({});
  const [overview, setOverview] = useState(true);
  const [followers, setFollowers] = useState(false);
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
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
              <h4 onClick={handleFollowers}>0</h4>
            </div>
            <div className='a'>
              <h6>Followers</h6>
              <h4 onClick={handleFollowers}>0</h4>
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
