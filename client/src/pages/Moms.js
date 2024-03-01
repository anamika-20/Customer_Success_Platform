import React, { useState } from 'react';
import Layout from '../Layout';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, InputLabel } from '@mui/material';

const Moms = () => {
  const [moms, setmoms] = useState([]);
  const [formData, setFormData] = useState({
    date:'',
    duration:'',
    momLink:'',
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
    setmoms([...moms, formData]);
    setFormData({
    date:'',
    duration:'',
    momLink:'',
    comment: ''
    });
  };

  return (
    <Layout>
      {/* Form */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="date">Date</InputLabel>
            <TextField
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="duration">Duration</InputLabel>
            <TextField
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="momLink">MoM Link</InputLabel>
            <TextField
              id="momLink"
              name="momLink"
              type="date"
              value={formData.momLink}
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
                <TableCell>Date</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Mom Link</TableCell>
                <TableCell>Comment</TableCell>
              </TableRow>
            </TableHead>
            
            {!moms || moms.length === 0 ? (
              <TableBody>
              <TableRow>
                <TableCell colSpan={5} align="center">No moms have been added</TableCell>
              </TableRow>
            </TableBody>
            ) : (
            <TableBody>
              {moms.map((mom, index) => (
                <TableRow key={index}>
                  <TableCell>{mom.date}</TableCell>
                  <TableCell>{mom.duration}</TableCell>
                  <TableCell>{mom.momLink}</TableCell>
                  <TableCell>{mom.comment}</TableCell>
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

export default Moms;
