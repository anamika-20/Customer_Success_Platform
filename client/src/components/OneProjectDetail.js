import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import Layout from "./Layout";
import HorizontalList from "./HorizontalList";
import { DataContext } from "../DataContext";
import { useAuth0 } from "@auth0/auth0-react";

import axiosInstance, { setAuthHeader } from "../axiosConfig";

const OneProjectDetail = () => {
  const [editable, setEditable] = useState(false);
  const { id } = useParams();
  const { projects, loading, error, role } = useContext(DataContext);
  const { getAccessTokenSilently } = useAuth0();

  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    durationMonths: 0,
    budgetedHours: 0,
    projectDescription: "",
    // stakeholders: [],
    scope: "",
    detailedTimelineReference: "",
  });

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setFormData({
          projectName: project.projectName,
          projectType: project.projectType,
          durationMonths: project.durationMonths,
          budgetedHours: project.budgetedHours,
          projectDescription: project.projectDescription,
          scope: project.scope,
          detailedTimelineReference: project.detailedTimelineReference,
        });
      }
    }
  }, [id, projects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsChanged(true);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);
      await axiosInstance.put(`/project/edit/${id}`, formData);
      console.log(editable);
      setEditable(false);
      console.log(editable);
    } catch (error) {
      console.error("Error editing Project:", error);
    }
  };

  const handleCancel = () => {
    setEditable(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>
        <Grid item xs={12}>
          <a
            href={`http://localhost:8080/downloadpdf/${id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="contained" color="secondary">
              Download Project
            </Button>
          </a>{" "}
          {(role === "projectmanager" || role === "admin") && !editable && (
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
              onClick={() => setEditable(true)}
            >
              Edit
            </Button>
          )}
        </Grid>

        <Grid item xs={12}>
          <form onSubmit={handleSaveChanges}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Project Name"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                variant="outlined"
                disabled={!editable}
              />
            </Box>
            <Box mb={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Project Type</InputLabel>
                <Select
                  label="Project Type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  disabled={!editable}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Fixed Budget">Fixed Budget</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Duration (Months)"
                name="durationMonths"
                type="number"
                value={formData.durationMonths}
                onChange={handleChange}
                variant="outlined"
                disabled={!editable}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Budgeted Hours"
                name="budgetedHours"
                type="number"
                value={formData.budgetedHours}
                onChange={handleChange}
                variant="outlined"
                disabled={!editable}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Project Description"
                name="projectDescription"
                multiline
                rows={4}
                value={formData.projectDescription}
                onChange={handleChange}
                variant="outlined"
                disabled={!editable}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Scope"
                name="scope"
                multiline
                rows={4}
                value={formData.scope}
                onChange={handleChange}
                variant="outlined"
                disabled={!editable}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Detailed Timeline Reference"
                name="detailedTimelineReference"
                multiline
                rows={4}
                value={formData.detailedTimelineReference}
                onChange={handleChange}
                variant="outlined"
                disabled={!editable}
              />
            </Box>
            {/* <Box mb={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>StakeHolder - Auditor</InputLabel>
                <Select
                  label="StakeHolder - Auditor"
                  name="auditor"
                  value={formData.projectType}
                  onChange={handleChange}
                  disabled={!editable}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Fixed Budget">Fixed Budget</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Project Type</InputLabel>
                <Select
                  label="Project Type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  disabled={!editable}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Fixed Budget">Fixed Budget</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Project Type</InputLabel>
                <Select
                  label="Project Type"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  disabled={!editable}
                >
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Fixed Budget">Fixed Budget</MenuItem>
                </Select>
              </FormControl>
            </Box> */}

            {editable && (
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isChanged}
                  style={{ marginRight: "10px" }}
                  type="submit"
                >
                  Save Changes
                </Button>
                <Button variant="contained" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            )}
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default OneProjectDetail;
