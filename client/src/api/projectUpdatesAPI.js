import axios from "axios";

const BASE_URL = "http://localhost:8080/api/projectupdates";

export const fetchProjectUpdates = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching Updates:", error);
    throw error;
  }
};

export const submitProjectUpdate = async (formData) => {
  try {
    const response = await axios.post(BASE_URL, formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting Updates:", error);
    throw error;
  }
};

export const updateProjectUpdate = async (id, formData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error editing feedback:", error);
    throw error;
  }
};

export const deleteProjectUpdate = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting Update:", error);
    throw error;
  }
};

export const fetchUserRole = async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/user/getRole?email=${email}`
    );
    return response.data.role;
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error;
  }
};
