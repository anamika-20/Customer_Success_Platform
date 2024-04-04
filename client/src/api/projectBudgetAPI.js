
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/budgets';

export const getAllProjectBudget = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching project budget: ${error.message}`);
  }
};

export const createProjectBudget = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating project budget: ${error.message}`);
  }
};

export const updateProjectBudget = async (id, formData) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating project budget: ${error.message}`);
  }
};

export const deleteProjectBudget = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(`Error deleting project budget: ${error.message}`);
  }
};
