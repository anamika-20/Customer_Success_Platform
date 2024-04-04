import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/sprints';

export const getAllSprintDetails = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching sprint Detail: ${error.message}`);
  }
};

export const createSprintDetail = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating sprint Detail: ${error.message}`);
  }
};

export const updateSprintDetail = async (id, formData) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating sprint Detail: ${error.message}`);
  }
};

export const deleteSprintDetail = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(`Error deleting sprint Detail: ${error.message}`);
  }
};
