import axios from "axios";

const baseUrl = "http://localhost:8080/api/technicalEscalationMatrix";

export const getAllTechnicalEscalationMatrix = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error fetching TechnicalEscalationMatrix: ${error.message}`
    );
  }
};

export const createTechnicalEscalationMatrix = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error creating TechnicalEscalationMatrix: ${error.message}`
    );
  }
};

export const updateTechnicalEscalationMatrix = async (id, formData) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error updating TechnicalEscalationMatrix: ${error.message}`
    );
  }
};

export const deleteTechnicalEscalationMatrix = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(
      `Error deleting TechnicalEscalationMatrix: ${error.message}`
    );
  }
};
