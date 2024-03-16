import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Layout from '../Layout';

const ProjectDetails = () => {
  const [formData, setFormData] = useState({
    project_name: '',
    project_desc: '',
    project_manager: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here, such as sending data to the server
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      project_name: '',
      project_desc: '',
      project_manager: '',
    });
  };

  return (
    <Layout>
      <Grid item container>
        <Grid item xs={6} sx={{ marginLeft: 5 }}>
      <h2>Project Details</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="project_name"
              name="project_name"
              label="Project Name"
              value={formData.project_name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="project_desc"
              name="project_desc"
              label="Project Description"
              value={formData.project_desc}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="project_scope"
              name="project_scope"
              label="Project Scope"
              value={formData.project_desc}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={2}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="project_manager"
              name="project_manager"
              label="Project Manager"
              value={formData.project_manager}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      </Grid>
      </Grid>
    </Layout>
  );
};

export default ProjectDetails;
