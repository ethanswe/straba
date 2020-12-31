import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import './following.css'

function FollowingComp() {
    const history = useHistory()
    const [followers, setFollowers] = useState([{message: 'You have no followers'}]);
    const [following, setFollowing] = useState([{message: 'You are not following anyone'}]);

    const { userId } = useParams();
    

    useEffect(() => {
        if(!userId) {
            return
        }
        (async () => {
            const response = await fetch(`/api/following/users/${userId}`)
            const data = await response.json();
            if (data.followed.length > 0){
                setFollowers(data.followed)
            } else {
                setFollowers([{ message: 'You have no followers' }])
            }
            if (data.following.length > 0) {
                setFollowing(data.following)
            } else {
                setFollowing([{ message: 'You are not following anyone' }])
            }
        })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    const handleRedirect = (e) => {
        return history.push(`/users/${e.target.id}`)
    }

    return (
        <div className='followContainer'>
            <div className='followersC'>
                <h3>Followers:</h3>
                {followers[0]["message"] ? (
                <div className='message'>{followers[0].message}</div>
                ) : (
                <ul>{followers.map((person) => <li key={person.id} id={'2'} onClick={handleRedirect}>Try this{person.first_name} {person.last_name}</li>)}</ul>
                )}
            </div>
            <div className='followingC'>
                <h3>Following:</h3>
                {following[0]["message"] ? (
                <div className='message'>{following[0].message}</div>
                ) : (
                <ul>{following.map((person) => <li key={person.id} id={'1'} onClick={handleRedirect}>This is{person.first_name} {person.last_name}</li>)}</ul>
                )}
            </div>
        </div>
    )
}

export default FollowingComp;