export const deleteActivity = async (id) => {
    const response = await fetch(`/api/activities/activity/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }