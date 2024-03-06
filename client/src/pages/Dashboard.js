import React from 'react';
import Layout from '../Layout';
import Chart from '../components/Chart';
import Orders from '../components/Orders';
import { Grid, Paper } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
  
  // axios.get('http://localhost:8080/user/user-info')
  // .then(response => {
  //   const data = response.data;
  //   const userRole = data.nickname;
  //   console.log('User Role:', userRole);
  //   if (!userRole) {
  //     console.log("Role not found");
  //   }
  // })
  // .catch(error => {
  //   console.error('Error fetching user role:', error);
  // });


  return (
    <Layout>
      {/* <Grid item xs={12} md={8} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid> */}
    </Layout>
  );
};

export default Dashboard;
