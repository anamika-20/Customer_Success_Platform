import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/phases';

export const getAllPhases = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching Phases: ${error.message}`);
  }
};

export const createPhases = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating Phases: ${error.message}`);
  }
};

export const updatePhases = async (id, formData) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating Phases: ${error.message}`);
  }
};

export const deletePhases = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(`Error deleting Phases: ${error.message}`);
  }
};
