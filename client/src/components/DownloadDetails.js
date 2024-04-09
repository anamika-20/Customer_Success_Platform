import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const DownloadDetails = () => {
  //   const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
  // useAuth0();
  //   const [userRole, setUserRole] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjectNames = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/project`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    getProjectNames();
  }, []);

  const handleChange = (e) => {
    setProjectId(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const project = projects.find(
        (project) => project.projectName === projectId
      );
      console.log(project);
      window.location.href = `http://localhost:8080/download-pdf/${project?._id}`;
      // navigate(`http://localhost:8080/download-pdf/${project?._id}`, {
      //   replace: true,
      // });
    } catch (error) {
      console.error("Error Downloading PDF:", error);
    }
  };

  return (
    <div>
      <Layout>
        <Grid item xs={4}>
          <Typography>Export details as PDF</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="project-id-label">Project ID</InputLabel>
              <Select
                labelId="project-id-label"
                id="project-id-select"
                value={projectId}
                onChange={handleChange}
                name="project_id"
                required
              >
                {projects.map((project) => (
                  <MenuItem key={project._id} value={project.projectName}>
                    {project.projectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Grid>
      </Layout>
    </div>
  );
};

export default DownloadDetails;
