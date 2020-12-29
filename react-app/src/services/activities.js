export const createActivity = async (first_name, last_name, city, country, email, password) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        city,
        country,
        email,
        password,
      }),
    });
    return await response.json();
  }