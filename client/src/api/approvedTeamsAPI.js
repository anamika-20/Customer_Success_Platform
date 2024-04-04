
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/approvedteams";

export const fetchTeams = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

export const saveTeam = async (team) => {
  try {
    const response = await axios.post(BASE_URL, team);
    return response.data;
  } catch (error) {
    console.error("Failed to save team:", error);
    throw error;
  }
};

export const updateTeam = async (teamId, team) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${teamId}`, team);
    return response.data;
  } catch (error) {
    console.error("Failed to update team:", error);
    throw error;
  }
};

export const deleteTeam = async (teamId) => {
  try {
    await axios.delete(`${BASE_URL}/${teamId}`);
    return true;
  } catch (error) {
    console.error("Error deleting Team:", error);
    throw error;
  }
};

export const fetchUserRole = async (email) => {
  try {
    const response = await axios.get(`http://localhost:8080/user/getRole?email=${email}`);
    return response.data.role;
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error;
  }
};
