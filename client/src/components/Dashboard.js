import React, { useContext } from "react";
import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { Grid, Typography } from "@mui/material";
import { DataContext } from "../DataContext";

const Dashboard = () => {
  const { role } = useContext(DataContext);
  const { isLoading } = useAuth0();

  return (
    <Layout>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography>Role: {role}</Typography>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default Dashboard;
