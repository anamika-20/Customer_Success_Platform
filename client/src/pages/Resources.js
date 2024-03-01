import React, { useState } from 'react';
import Layout from '../Layout';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, InputLabel } from '@mui/material';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    resourceName: '',
    role: '',
    startDate: '',
    endDate: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResources([...resources, formData]);
    setFormData({
      resourceName: '',
      role: '',
      startDate: '',
      endDate: '',
      comment: ''
    });
  };

  return (
    <Layout>
      {/* Form */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="resourceName">Resource Name</InputLabel>
            <TextField
              id="resourceName"
              name="resourceName"
              value={formData.resourceName}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="role">Role</InputLabel>
            <TextField
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="startDate">Start Date</InputLabel>
            <TextField
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="endDate">End Date</InputLabel>
            <TextField
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="comment">Comment</InputLabel>
            <TextField
              id="comment"
              name="comment"
              multiline
              rows={4}
              value={formData.comment}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" type="submit">Submit</Button>
          </form>
        </Paper>
      </Grid>

      {/* Table */}
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Resource Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Comment</TableCell>
              </TableRow>
            </TableHead>
            
            {!resources || resources.length === 0 ? (
              <TableBody>
              <TableRow>
                <TableCell colSpan={5} align="center">No Resources have been added</TableCell>
              </TableRow>
            </TableBody>
            ) : (
            <TableBody>
              {resources.map((resource, index) => (
                <TableRow key={index}>
                  <TableCell>{resource.resourceName}</TableCell>
                  <TableCell>{resource.role}</TableCell>
                  <TableCell>{resource.startDate}</TableCell>
                  <TableCell>{resource.endDate}</TableCell>
                  <TableCell>{resource.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            )}
          </Table>
        </TableContainer>
      </Grid>
    </Layout>
  );
};

export default Resources;
