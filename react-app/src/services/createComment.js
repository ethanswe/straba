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