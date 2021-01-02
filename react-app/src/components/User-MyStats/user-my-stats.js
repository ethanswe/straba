import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './user-my-stats.css';

function UserMyStats() {
    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState({hr: 0, min: 0});
    const [activities, setActivities] = useState([{distance: 0, time: 0}]);
    const { userId } = useParams();


    
    
    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/activities/users/${userId}`)
            const data = await response.json()
            setActivities(data.activities);
        })()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])
    
    useEffect(() => {
        let addTimes = 0
        let realTime = {hr: 0, min: 0};
        let addDistance = 0;
        activities.forEach(ele => {
            addDistance += Number(ele.distance)
            addTimes += Number(ele.time)
        });
        setDistance(addDistance);
        let hour = Math.floor(addTimes / 60)
        let minutes = Math.round(addTimes % 60)
        realTime = {hr: hour, min: minutes}
        setTime(realTime);
        
    }, [userId, activities])

    return (
        <div className='my-stats'>
            <h4>All-Time:</h4>
            <div>Distance: {distance} miles</div>
            <div>Time: {time.hr} hr. {time.min} min.</div>
        </div>
    )
}

export default UserMyStats;