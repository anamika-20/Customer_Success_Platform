import React from 'react';
import Layout from '../Layout';
import Chart from '../components/Chart';
import Orders from '../components/Orders';
import { Grid, Paper } from '@mui/material';

const Dashboard = () => {
  return (
    <Layout>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={12}>
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
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
