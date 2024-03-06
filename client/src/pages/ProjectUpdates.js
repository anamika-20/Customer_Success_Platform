import React, { useState } from "react";
import Layout from "../Layout";
import { Grid, Paper, TextField, Button, InputLabel } from "@mui/material";

const ProjectUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [formData, setFormData] = useState({
    projectDetails: "",
    date: "",
    generalUpdates: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdates([...updates, formData]);
    setFormData({
      projectDetails: "",
      date: "",
      generalUpdates: "",
    });
  };

  return (
    <Layout>
      {/* Form */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="projectDetails">Project Details</InputLabel>
            <TextField
              id="projectDetails"
              name="projectDetails"
              value={formData.projectDetails}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="date">Date</InputLabel>
            <TextField
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="generalUpdates">General Updates</InputLabel>
            <TextField
              id="generalUpdates"
              name="generalUpdates"
              multiline
              rows={4}
              value={formData.generalUpdates}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Paper>
      </Grid>

      {/* Display Updates */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, mt: 4 }}>
          <h2>Project Updates</h2>
          {updates.map((update, index) => (
            <div key={index}>
              <h3>Date: {update.date}</h3>
              <p>Project Details: {update.projectDetails}</p>
              <p>General Updates: {update.generalUpdates}</p>
            </div>
          ))}
          {updates.length === 0 && <p>No updates yet.</p>}
        </Paper>
      </Grid>
    </Layout>
  );
};

export default ProjectUpdates;
