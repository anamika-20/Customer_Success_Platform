// Escalation.js
import React, { useContext, useEffect } from "react";
import { Typography, Button, Grid } from "@mui/material";
import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";

import HorizontalList from "./HorizontalList";

const Escalation = () => {
  const { id } = useParams();

  const { projects, loading, error, role } = useContext(DataContext);
  console.log(projects);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  // useEffect(() => {
  //   if (id && projects) {
  //     const project = projects.find((project) => project._id === id);
  //     // if (project) {
  //     //   setResources(project.resources);
  //     // }
  //   }
  // }, [id, projects]);

  return (
    <Layout>
      <Grid container>
        <Grid item>
          <HorizontalList />
        </Grid>
        <Typography variant="h3">There are 3 Escalation Matrices</Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              onClick={() => handleNavigate(`/project/${id}/technical`)}
              variant="contained"
              color="primary"
            >
              Technical Escalation Matrix
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleNavigate(`/project/${id}/financial`)}
              variant="contained"
              color="primary"
            >
              Financial Escalation Matrix
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => handleNavigate(`/project/${id}/operational`)}
              variant="contained"
              color="primary"
            >
              Operational Escalation Matrix
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Escalation;
