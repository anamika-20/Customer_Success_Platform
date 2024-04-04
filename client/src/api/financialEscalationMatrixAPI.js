import axios from "axios";

const baseUrl = "http://localhost:8080/api/financials";

export const getAllFinancialEscalationMatrix = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error fetching FinancialEscalationMatrix: ${error.message}`
    );
  }
};

export const createFinancialEscalationMatrix = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error creating FinancialEscalationMatrix: ${error.message}`
    );
  }
};

export const updateFinancialEscalationMatrix = async (id, formData) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error updating FinancialEscalationMatrix: ${error.message}`
    );
  }
};

export const deleteFinancialEscalationMatrix = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(
      `Error deleting FinancialEscalationMatrix: ${error.message}`
    );
  }
};
