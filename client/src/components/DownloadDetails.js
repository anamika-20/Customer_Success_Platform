import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import HorizontalList from "./HorizontalList";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";

const DownloadDetails = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role } = useContext(DataContext);
  console.log(projects);
  //   const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
  // useAuth0();
  //   const [userRole, setUserRole] = useState("");
  // const [projectId, setProjectId] = useState("");
  // const [projects, setProjects] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setMyProjects(project.projectName);
      }
    }
  }, [id, projects]);

  // useEffect(() => {
  //   const getProjectNames = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/project`);
  //       setProjects(response.data);
  //     } catch (error) {
  //       console.error("Error fetching projects:", error);
  //     }
  //   };
  //   getProjectNames();
  // }, []);

  // const handleChange = (e) => {
  //   setProjectId(e.target.value);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const project = projects.find((project) => project.projectName === id);
      console.log(project);
      window.location.href = `http://localhost:8080/download-pdf/${project?._id}`;
      // navigate(`http://localhost:8080/download-pdf/${project?._id}`, {
      //   replace: true,
      // });
    } catch (error) {
      console.error("Error Downloading PDF:", error);
    }
  };
  const handleDownloadProject = () => {
    // Implement your download project logic here
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
                value={id}
                // onChange={handleChange}
                name="project_id"
                required
              >
                {myProjects.map((project) => (
                  <MenuItem key={project._id} value={project.projectName}>
                    {project.projectName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <Button variant="contained" type="submit">
              Submit
            </Button> */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDownloadProject}
              style={{ marginRight: "10px" }}
            >
              Download Project
            </Button>
          </form>
        </Grid>
      </Layout>
    </div>
  );
};

export default DownloadDetails;
