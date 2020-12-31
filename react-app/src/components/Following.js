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
            const response = await fetch(`/api/following/users/${userId}`)
            const data = await response.json();
            if (data.followers.length > 0){
                setFollowers(data.followers)
                console.log(followers)
            }
            if (data.following.length > 0) {
                setFollowing(data[following])
                console.log(following)
            }
        })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [followers])

    let followContent;
    let followersContent;

    const followingContent = () => {
        if (followers[0]["message"]) {
            followersContent = <div>{followers[0].message}</div>
        } else {
            followersContent = <ul>{followers.map((person) => <li key={person.id}>{person.first_name} {person.last_name}</li>)}</ul>
        }
        if (following[0]["message"]) {
            followContent = <div>{following[0].message}</div>
        } else {
            followContent = <ul>{following.map((person) => <li key={person.id}>{person.first_name} {person.last_name}</li>)}</ul>
        }
        return;
    }

    followingContent()

    return (
        <>
        <div>{followersContent}</div>
        <div>{followContent}</div>
        <h1>This is a test</h1>
        </>
    )
}

export default FollowingComp;