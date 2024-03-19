import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  // const getUserData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/user/user-info");
  //     console.log(response);
  //   } catch (error) {}
  // };
  // // axios
  // //   .get("http://localhost:8080/user/user-info")
  // //   .then((response) => {
  // //     console.log(response);
  // //     const data = response.data;
  // //     const userRole = data.nickname;
  // //     console.log("User Role:", userRole);
  // //     if (!userRole) {
  // //       console.log("Role not found");
  // //     }
  // //   })
  // //   .catch((error) => {
  // //     console.error("Error fetching user role:", error);
  // //   });
  // useEffect(() => {
  //   getUserData();
  // }, []);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userRole, setUserRole] = useState("");
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
  useEffect(() => {
    const checkUserRole = async (email) => {
      try {
        const token = await getAccessTokenSilently({
          audience: "http://localhost:8080/",
        });
        const response = await axios.get("http://localhost:8080/user/getRole", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { email },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isAuthenticated) {
      checkUserRole(user?.email);
    }
  }, [getAccessTokenSilently, isAuthenticated, user]);
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
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography>Role: {userRole}</Typography>
        </Grid>
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
      </Grid>
    </Layout>
  );
};

export default Dashboard;
