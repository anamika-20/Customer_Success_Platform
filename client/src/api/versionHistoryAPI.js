import axios from 'axios';


const baseUrl = 'http://localhost:8080/api/versionHistory';
// Fetch all version history
export const getAllVersionHistory = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching Version history: ${error.message}`);
      }
};

// Fetch version history by ID
export const getVersionHistoryById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
      } catch (error) {
        throw new Error(`Error fetching version history by ID: ${error.message}`);
      }
};

// Create new version history
export const createVersionHistory = async (formData) => {
    try {
        const response = await axios.post(baseUrl, formData);
        return response.data;
      } catch (error) {
        throw new Error(`Error creating verion history: ${error.message}`);
      }
};

// Update version history
export const updateVersionHistory = async (id, formData) => {
    try {
        const response = await axios.patch(`${baseUrl}/${id}`, formData);
        return response.data;
      } catch (error) {
        throw new Error(`Error updating version history: ${error.message}`);
      }
};

// Delete version history
export const deleteVersionHistory = async (id) => {
    try {
        await axios.delete(`${baseUrl}/${id}`);
      } catch (error) {
        throw new Error(`Error deleting version history: ${error.message}`);
      }
};
