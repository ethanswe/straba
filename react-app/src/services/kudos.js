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