import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { Grid, Paper, TextField, Button, InputLabel } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const ProjectUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    generalUpdates: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFeedback([...feedback, formData]);
    // setFormData({
    //   feedbackType: "",
    //   dateReceived: "",
    //   detailedFeedback: "",
    //   actionTaken: "",
    //   closureDate: "",
    // });
    try {
      const response = await axios.post(
        "http://localhost:8080/api/projectupdates",
        formData
      );
      setUpdates([...updates, response.data]);
      console.log("Updates submitted:", response.data);
      // Optionally, you can reset the form after successful submission
      setFormData({
      date: '',
      generalUpdates: ''
      });
    } catch (error) {
      console.error("Error submitting Updates:", error);
    }
  };

   // Function to fetch all ProjectUpdates
   const fetchProjectUpdates = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/projectupdates"); // Make a GET request to fetch all moms
      setUpdates(response.data); // Update state with the fetched moms
    } catch (error) {
      console.error("Error fetching Updates:", error);
    }
  };

  // Fetch ProjectUpdates when the component mounts
  useEffect(() => {
    fetchProjectUpdates();
  }, []);

  //delete
  const handleDelete = async (_id) => {
    try {
      if (!_id) {
        console.error("Updates _id is undefined or null");
        return;
      }

      await axios.delete(`http://localhost:8080/api/projectupdates/${_id}`);
      setUpdates(updates.filter((update) => update._id !== _id));
      console.log("Update deleted with _id:", _id);
    } catch (error) {
      console.error("Error deleting Update:", error);
    }
  };

  return (
    <Layout>
      {/* Form */}
      <Grid item xs={12}>
      <h2>Project Updates</h2>
        <Paper sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="date">Date</InputLabel>
            <TextField
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="generalUpdates">General Updates</InputLabel>
            <TextField
              id="generalUpdates"
              name="generalUpdates"
              multiline
              rows={4}
              value={formData.generalUpdates}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" type="submit">Submit</Button>
          </form>
        </Paper>
      </Grid>

      {/* Display Updates */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, mt: 4 }}>
          <h2>Older Updates</h2>
          {updates.map((update, index) => (
            <div key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>Date: {update.date}</h3>
                <Button>
                <EditIcon style={{ marginLeft: '10px' }} />
                </Button>
                <Button>
                <DeleteIcon style={{ marginLeft: '10px' }}  color="error"
                        onClick={() => handleDelete(update._id)} />
                        </Button>
              </div>
              <p>General Updates: {update.generalUpdates}</p>
            </div>
          ))}
          {updates.length === 0 && <p>No updates yet.</p>}
        </Paper>
      </Grid>


    </Layout>
  );
};

export default ProjectUpdates;
