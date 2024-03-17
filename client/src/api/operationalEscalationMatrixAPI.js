import axios from "axios";

const baseUrl = "http://localhost:8080/api/operationalEscalationMatrix";

export const getAllOperationalEscalationMatrix = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error fetching OperationalEscalationMatrix: ${error.message}`
    );
  }
};

export const createOperationalEscalationMatrix = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error creating OperationalEscalationMatrix: ${error.message}`
    );
  }
};

export const updateOperationalEscalationMatrix = async (id, formData) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error updating OperationalEscalationMatrix: ${error.message}`
    );
  }
};

export const deleteOperationalEscalationMatrix = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(
      `Error deleting OperationalEscalationMatrix: ${error.message}`
    );
  }
};
