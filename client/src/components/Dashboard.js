import React, { useContext } from "react";
import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import { DataContext } from "../DataContext";

const Dashboard = () => {
  const { role } = useContext(DataContext);
  const { isLoading } = useAuth0();

  const paperStyle = {
    padding: "32px",
    textAlign: "center",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    borderRadius: "12px",
  };

  const titleStyle = {
    marginBottom: "16px",
    color: "#333333",
  };

  const subTitleStyle = {
    color: "#666666",
  };

  return (
    <Layout>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "80vh", backgroundColor: "#f4f4f4" }}
        >
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Paper elevation={3} style={paperStyle}>
              <Typography variant="h5" style={titleStyle}>
                Welcome to the
              </Typography>
              <Typography variant="h4" style={titleStyle}>
                Customer Success Platform
              </Typography>
              <Typography variant="subtitle1" style={subTitleStyle}>
                You are logged in as : {role}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default Dashboard;
