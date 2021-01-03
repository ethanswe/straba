export const createComment = async (text, user_id, activity_id) => {
    const response = await fetch("/api/comments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        user_id,
        activity_id,
      }),
    });
    return await response.json();
  }

  export const deleteComment = async (id) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  // export const getComments = async (activityId) => {
  //   // console.log("Inside useEffect: " + activity_Id)
  //   const response = await fetch(`/api/comments/activity/${activityId}`)
  //   const data = await response.json() 
  //   return data    
  // } 