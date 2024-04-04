// api/auditHistory.js

import axios from "axios";

const baseUrl = "http://localhost:8080/api/audits";

export const getAllAuditHistory = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching audit history: ${error.message}`);
  }
};

export const getAuditHistoryById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching audit history by ID: ${error.message}`);
  }
};
export const createAuditHistory = async (formData) => {
  try {
    const response = await axios.post(baseUrl, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating audit history: ${error.message}`);
  }
};

export const updateAuditHistory = async (id, formData) => {
  try {
    const response = await axios.patch(`${baseUrl}/${id}`, formData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating audit history: ${error.message}`);
  }
};

export const deleteAuditHistory = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    throw new Error(`Error deleting audit history: ${error.message}`);
  }
};
