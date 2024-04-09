import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import Layout from "./Layout";
import HorizontalList from "./HorizontalList";
import { DataContext } from "../DataContext";

const OneProjectDetail = () => {
  const { id } = useParams();
  const { projects, loading, error } = useContext(DataContext);

  const [formData, setFormData] = useState({
    projectName: "",
    projectType: "",
    durationMonths: 0,
    budgetedHours: 0,
    projectDescription: "",
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

  const handleSaveChanges = () => {
    // Implement your save changes logic here
    setIsChanged(false);
  };

  const handleCancel = () => {
    if (id && projects) {
      const project = projects.find((project) => project.id === parseInt(id));
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
    setIsChanged(false);
  };

  const handleDownloadProject = () => {
    // Implement your download project logic here
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <Grid item xs={12}>
        <HorizontalList />
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDownloadProject}
        style={{ marginRight: "10px" }}
      >
        Download Project
      </Button>
      <form>
        <TextField
          fullWidth
          label="Project Name"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Project Type</InputLabel>
          <Select
            label="Project Type"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
          >
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Fixed Budget">Fixed Budget</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Duration (Months)"
          name="durationMonths"
          type="number"
          value={formData.durationMonths}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Budgeted Hours"
          name="budgetedHours"
          type="number"
          value={formData.budgetedHours}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Project Description"
          name="projectDescription"
          multiline
          rows={4}
          value={formData.projectDescription}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Scope"
          name="scope"
          multiline
          rows={4}
          value={formData.scope}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Detailed Timeline Reference"
          name="detailedTimelineReference"
          multiline
          rows={4}
          value={formData.detailedTimelineReference}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveChanges}
          disabled={!isChanged}
          style={{ marginRight: "10px" }}
        >
          Save Changes
        </Button>

        <Button variant="contained" onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </Layout>
  );
};

export default OneProjectDetail;
