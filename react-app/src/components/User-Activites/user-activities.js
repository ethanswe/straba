import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserActivities() {
    const [activities, setActivities] = useState(0);
    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            return
        }
        (async () => {
            const response = await fetch(`/api/activities/users/${userId}`);
            const data = await response.json()
            console.log(data)
            setActivities(data.length)
        })();
        console.log("HERE")
        console.log(activities)
    }, [userId, activities])

    return (
        <div>
            <div>this{activities}</div>
        </div>
    )
}

export default UserActivities;