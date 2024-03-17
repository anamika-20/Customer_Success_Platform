import axios from "axios";

const baseUrl = "http://localhost:8080/api/stakeHolders";

export const getAllStakeholders = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching RiskProfiling: ${error.message}`);
  }
};

export const createStakeholder = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating RiskProfiling: ${error.message}`);
  }
};

export const updateStakeholder = async (id, formData) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating RiskProfiling: ${error.message}`);
  }
};

export const deleteStakeholder = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(`Error deleting RiskProfiling: ${error.message}`);
  }
};
