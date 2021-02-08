import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import './user-activities.css'

function UserActivities() {
    const [activities, setActivities] = useState([]);
    const history = useHistory()
    const { userId } = useParams();

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/activities/users/${userId}`);
            const data = await response.json()
            setActivities(data.activities)
        })();
    }, [userId])

    const handleClick = (e) => {
        return history.push(`/activities/${e.target.id}`)
    }

    return (
        <div className='overviewContainer'>
            {activities.length ? (
               activities.map(activity => <div key={activity.id} id={activity.id} onClick={handleClick} className='overviewC'>
                   
                    <div className='user-activity-title'>
                <h1 id={activity.id}>{activity.title}</h1>
                <div id={activity.id}><strong>Description:</strong>   {activity.description}</div>
                <div id={activity.id}><strong>Time:</strong> {activity.time} minutes <strong>Distance:</strong> {activity.distance} miles</div>
                </div>

                <div className='user-activity-map'>
                        {activity.gpx_file ? <iframe src={activity.gpx_file} width='100%' height='100%'></iframe> : 
                        <iframe src="https://www.google.com/maps/d/embed?mid=1_Nd9y4jr4qGFY1y3aKu_6eCxOjd3HAeq" width='100%' height='100%'></iframe>}
                        
                    </div>
                    
                <div className='user-activity-createdAt'>
                <h6 id={activity.id}>Created: {activity.createdAt.split(' ').filter((sec, i) => i < 4).join(' ')}</h6>
                </div>
                </div>)
            ) : (
                <div>No current activities</div>
            )}
        </div>
    )
}

export default UserActivities