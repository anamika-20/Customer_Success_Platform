import React, { useState } from 'react';
import Layout from '../Layout';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, InputLabel } from '@mui/material';

const ClientFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [formData, setFormData] = useState({
    feedbackType: '',
    dateReceived: '',
    detailedFeedback: '',
    actionTaken: '',
    closureDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback([...feedback, formData]);
    setFormData({
      feedbackType: '',
      dateReceived: '',
      detailedFeedback: '',
      actionTaken: '',
      closureDate: ''
    });
  };

  return (
    <Layout>
      {/* Form */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="feedbackType">Feedback Type</InputLabel>
            <TextField
              id="feedbackType"
              name="feedbackType"
              value={formData.feedbackType}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="dateReceived">Date Received</InputLabel>
            <TextField
              id="dateReceived"
              name="dateReceived"
              type="date"
              value={formData.dateReceived}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="detailedFeedback">Detailed Feedback</InputLabel>
            <TextField
              id="detailedFeedback"
              name="detailedFeedback"
              multiline
              rows={4}
              value={formData.detailedFeedback}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="actionTaken">Action Taken</InputLabel>
            <TextField
              id="actionTaken"
              name="actionTaken"
              multiline
              rows={4}
              value={formData.actionTaken}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="closureDate">Closure Date</InputLabel>
            <TextField
              id="closureDate"
              name="closureDate"
              type="date"
              value={formData.closureDate}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" type="submit">Submit</Button>
          </form>
        </Paper>
      </Grid>

    
       <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Feedback Type</TableCell>
                <TableCell>Date Received</TableCell>
                <TableCell>Detailed Feedback</TableCell>
                <TableCell>Action Taken</TableCell>
                <TableCell>Closure Date</TableCell>
              </TableRow>
            </TableHead>
            {!feedback || feedback.length === 0 ? (
               <TableBody>
               <TableRow>
                 <TableCell colSpan={5} align="center">No feedback</TableCell>
               </TableRow>
             </TableBody>
           ) : (
            <TableBody>
              {feedback.map((feedback, index) => (
                <TableRow key={index}>
                  <TableCell>{feedback.feedbackType}</TableCell>
                  <TableCell>{feedback.dateReceived}</TableCell>
                  <TableCell>{feedback.detailedFeedback}</TableCell>
                  <TableCell>{feedback.actionTaken}</TableCell>
                  <TableCell>{feedback.closureDate}</TableCell>
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

export default ClientFeedback;
