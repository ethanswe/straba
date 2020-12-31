import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserActivitiesCount() {
    const [activities, setActivities] = useState(0);
    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            return
        }
        (async () => {
            const response = await fetch(`/api/activities/users/${userId}`);
            const data = await response.json()
            setActivities(data.activities.length)
        })();
        
    }, [userId])

    return (
        <>
            <strong>{activities}</strong><h6>Total Activities</h6>
        </>
    )
}

export default UserActivitiesCount;