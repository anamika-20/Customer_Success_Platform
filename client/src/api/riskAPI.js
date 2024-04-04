import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/risks';

export const getAllRiskProfilings = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching RiskProfiling: ${error.message}`);
  }
};

export const createRiskProfiling = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating RiskProfiling: ${error.message}`);
  }
};

export const updateRiskProfiling = async (id, formData) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating RiskProfiling: ${error.message}`);
  }
};

export const deleteRiskProfiling = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(`Error deleting RiskProfiling: ${error.message}`);
  }
};
