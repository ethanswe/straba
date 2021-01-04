export const createKudos = async (activity_id, user_id) => {
    const response = await fetch("/api/kudos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activity_id,
        user_id,
      }),
    });
    return await response.json();
}


  export const deleteKudos = async (id) => {
    const response = await fetch(`/api/kudos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  // This route makes a request to see if a user likes a post
export const userLikesPost = async (activity_id, user_id) => {
  const response = await fetch(`/api/kudos/${activity_id}/activity/${user_id}`)
  return await response.json()

}

export const dislikePost = async (activity_id, user_id) => {
  const response= await fetch('/api/kudos/delete/', {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        activity_id,
        user_id
      })
  })
  return await response.json()
}