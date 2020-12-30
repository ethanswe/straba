import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FollowingComp() {
    const [followers, setFollowers] = useState([{message: 'You have no followers.'}]);
    const [following, setFollowing] = useState([{message: 'You are not following anyone.'}]);

    const { userId } = useParams();
    

    useEffect(() => {
        if(!userId) {
            return
        }
        (async () => {
            const response = await fetch(`/api/following/${userId}`)
            const data = await response.json();
            if (data.followers.length > 0){
                setFollowers(data[followers])
            }
            if (data.following.length > 0) {
                setFollowing(data[following])
            }
        })();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let followContent;
    let followersContent;

    if (followers[0].message) {
        followersContent = <div>{followers[0].message}</div>
    } else {
        followersContent = <div>{followers.map((person) => <div>{person.first_name} {person.last_name}</div>)}</div>
    }
    if (following[0].message) {
        followContent = <div>{following[0].message}</div>
    } else {
        followContent = <div>{following.map((person) => <div>{person.first_name} {person.last_name}</div>)}</div>
    }

    return (
        <>
        <div>{followersContent}</div>
        <div>{followContent}</div>
        <h1>This is a test</h1>
        </>
    )
}

export default FollowingComp;