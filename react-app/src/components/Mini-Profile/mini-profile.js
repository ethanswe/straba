import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './mini-profile.css'
import profile from "../User/Profile.png"

function MiniProfile() {
    const history = useHistory();
    const [user, setUser] = useState({})
    const [followingNum, setFollowingNum] = useState(0);
    const [followersNum, setFollowersNum] = useState(0);
    const [activities, setActivities] = useState(0);
    
    useEffect(() => {
       let user = localStorage.getItem('userId');
        (async () => {
            const response = await fetch(`/api/users/${user}`);
            const userA = await response.json();
            setUser(userA);
            const response2 = await fetch(`/api/following/users/${user}`)
            const data = await response2.json();
            setFollowingNum(data.following.length)
            setFollowersNum(data.followed.length)
            const response3 = await fetch(`/api/activities/users/${user}`);
            const data2 = await response3.json()
            setActivities(data2.activities.length)
        })()
    }, [])

    const handleClick = (e) => {
        return history.push(`/users/${e.target.id}`)
    }


    return (
        <div className='miniProfile'>
            {user.avatar ? (
                <img src={user.avatar} alt='user' />
            ) : (
                <img src={profile} alt='stock profile' />
            )}
            <h2 id={user.id} onClick={handleClick}>{user.first_name} {user.last_name}</h2>
            <div className='miniInfo'>
                <div>
                    <h6>Following</h6>
                    <h4>{followingNum}</h4>
                </div>
                <div>
                    <h6>Followers</h6>
                    <h4>{followersNum}</h4>
                </div>
                <div>
                    <h6>Activities</h6>
                    <h4>{activities}</h4>
                </div>
            </div>
        </div>
    )
}

export default MiniProfile;