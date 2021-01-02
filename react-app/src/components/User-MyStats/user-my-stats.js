import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserMyStats() {
    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState(0);
    const { userId } = useParams();

    useEffect(() => {
        (async () => {

            const response = await fetch(`/api/activities/users/${userId}`)
            const data = await response.json()
            if (data.activities.length > 0) {
                data.activities.forEach(ele => {
                    setDistance(distance + ele.distance)
                    setTime(time + ele.time)
                })
            } else {
                setTime(0)
                setDistance(0)
            }
            console.log(data)
            // setStats(data.activities)
            console.log('here')
        })()

    }, [userId])

    return (
        <div>
            <div>Distance: {distance}</div>
            <div>Time: {time}</div>
        </div>
    )
}

export default UserMyStats;