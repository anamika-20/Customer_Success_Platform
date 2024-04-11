import React, { useContext } from "react";
import { Typography, Button, Grid, Box } from "@mui/material";
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <Box p={4}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12}>
            <HorizontalList />
          </Grid>
          <Grid item container spacing={2} justifyContent="center" xs={12}>
            <Grid item>
              <Button
                onClick={() => handleNavigate(`/project/${id}/technical`)}
                variant="contained"
                color="primary"
                size="large"
              >
                Technical Escalation Matrix
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleNavigate(`/project/${id}/financial`)}
                variant="contained"
                color="primary"
                size="large"
              >
                Financial Escalation Matrix
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleNavigate(`/project/${id}/operational`)}
                variant="contained"
                color="primary"
                size="large"
              >
                Operational Escalation Matrix
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Escalation;
