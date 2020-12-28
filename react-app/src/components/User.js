import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function User() {
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState(false);
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  const handleFollowers = () => {
    return followers ? setFollowers(false) : setFollowers(true)
  }

  return (
    <>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>First Name</strong> {user.first_name}
        </li>
        <li>
          <strong>Last Name</strong> {user.last_name}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      {followers ? (
        <div className='followers'>
          This is a test
        </div>
      ) : (
        null
      )}
      <div className='socialStats'>
        <h2>Social Stats</h2>
        <div>
          <h4>Following</h4>
          <h4 onClick={handleFollowers}>0</h4>
          <h4>Followers</h4>
        </div>
      </div>
    </>
  );
}
export default User;
