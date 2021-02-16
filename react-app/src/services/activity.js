
export const deleteActivity = async (id) => {
    const response = await fetch(`/api/activities/activity/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }


  export const createActivity = async (activity, user_id) => {
  const res = await fetch(`/api/activities/new/${user_id}`, {
    // /api/activities/users/1/activities/new
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(activity)
})
if (res.ok){
    alert('Your Activity Has Been Recorded!');
  
} else {
    console.log(res)
    console.log('POST failed.')
}
}