import React, { useContext } from "react";
import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import { DataContext } from "../DataContext";

const Dashboard = () => {
  const { role } = useContext(DataContext);
  const { isLoading } = useAuth0();

  const rootStyle = {
    height: "100%",
    backgroundColor: "#f4f4f4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

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
        <Box style={rootStyle} sx={{ justifyContent: "center" }}>
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
        </Box>
      )}
    </Layout>
  );
};

export default Dashboard;
