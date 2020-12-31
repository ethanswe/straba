import React, { useState, useEffect } from 'react'
import { List, Header } from 'semantic-ui-react'



export const UserGlance = ()=> {
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
      fetch('/api/activities').then(res =>
        res.json().then(data => {
            setActivities(data.activities)
            
            setLoaded(true);
            console.log(data)
        })
        )
    }, [])
    if (!loaded) {
        return null;
      }
    return (
      <>
            {/* <List>
                {activities.map(activity =>{
                   return(
                        <List.Item key={activity.title}>
                            <Header>
                                {activity.title}
                            </Header>
                            <Header>
                                {activity.description}
                            </Header>
                            <Header>
                                {activity.distance} miles
                            </Header>
                            <Header>
                                {activity.time} minutes
                            </Header>
                        </List.Item>
                   )
                })}
            </List> */}
            {activities.map(activity =>{
              return (
                <div className='newsContainer' key={activity.id}>
                    <div className='newsTitle'>
                      {activity.title}
                    </div>
                    <div className='newsSummary'>
                    {activity.description}
                    </div>
                     <img height='50px' width='50px' src={logo} alt='activity pic'></img>
                 </div>
              )
            })}
        </>
    
    )

}