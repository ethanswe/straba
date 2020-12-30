import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function FollowingComp() {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const { userId } = useParams();
    

    useEffect(() => {
        if(!userId) {
            return
        }
        (async () => {
            const response = await fetch(`/api/following/${userId}`)
            const data = await response.json();
            console.log(data)
            // if(data.followers.length > 0) {
            //     setFollowers(data[followers])
            // } else {
            //     setFollowers(['You have no followers.'])
            // }
            data.followers.length > 0 ? (
                setFollowers(data[followers])
            ) : (
                setFollowers(['You have no followers.'])
            )
            data.following.length > 0 ? (
                setFollowing(data[following])
            ) : (
                setFollowing(['You are not following anyone.'])
            )
        })();
        
    }, [])

    return (
        <>
        <div>{followers}</div>
        <div>{following}</div>
        <h1>This is a test</h1>
        </>
    )
}

export default FollowingComp;