// frontend/src/api/profileApi.js

const fetchProfile = async () => {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "GET",
      credentials: "include", // Important: Include credentials for cross-origin requests
    });
    if (response.ok) {
      console.log(response);
    } else {
      throw new Error("Failed to fetch profile");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export { fetchProfile };
