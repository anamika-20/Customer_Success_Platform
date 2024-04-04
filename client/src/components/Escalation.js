// Escalation.js
import React from "react";
import { Typography, Button, Grid } from "@mui/material";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

const Escalation = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Layout>
      <Typography variant="h2">There are 3 Escalation Matrices</Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button
            onClick={() => handleNavigate("/technical")}
            variant="contained"
            color="primary"
          >
            Technical Escalation Matrix
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleNavigate("/financial")}
            variant="contained"
            color="primary"
          >
            Financial Escalation Matrix
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => handleNavigate("/operational")}
            variant="contained"
            color="primary"
          >
            Operational Escalation Matrix
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Escalation;
