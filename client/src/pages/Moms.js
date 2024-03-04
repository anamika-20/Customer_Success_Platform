import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  InputLabel,
} from "@mui/material";

const Moms = () => {
  const [moms, setmoms] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    momLink: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setmoms([...moms, formData]);
  //   setFormData({
  //     date: "",
  //     duration: "",
  //     momLink: "",
  //     comment: "",
  //   });
  // };

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
        "http://localhost:8080/api/moms",
        formData
      );
      setmoms([...moms, response.data]);
      console.log("MoM submitted:", response.data);
      // Optionally, you can reset the form after successful submission
      setFormData({
        date: "",
        duration: "",
        momLink: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error submitting MoM:", error);
    }
  };

  // Function to fetch all moms
  const fetchMoms = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/moms"); // Make a GET request to fetch all moms
      setmoms(response.data); // Update state with the fetched moms
    } catch (error) {
      console.error("Error fetching moms:", error);
    }
  };

  // Fetch moms when the component mounts
  useEffect(() => {
    fetchMoms();
  }, []);

  // const handleSaveEdit = async (_id) => {
  //   try {
  //     // Send PATCH request to update the feedback item on the server
  //     await axios.patch(
  //       `http://localhost:8080/api/moms/${mom._id}`,
  //       editFormData
  //     );
  //     console.log("MoMs edited:", editFormData);
  //     setEditDialogOpen(false);
  //   } catch (error) {
  //     console.error("Error editing feedback:", error);
  //   }
  // };

  const handleDelete = async (_id) => {
    try {
      if (!_id) {
        console.error("MoM _id is undefined or null");
        return;
      }

      // Implement your DELETE request logic here
      await axios.delete(`http://localhost:8080/api/moms/${_id}`);
      setmoms(moms.filter((mom) => mom._id !== _id));
      console.log("Feedback deleted with _id:", _id);
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
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
              type="date"
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
              value={formData.momLink}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />

            <InputLabel htmlFor="comments">Comment</InputLabel>
            <TextField
              id="comments"
              name="comments"
              multiline
              rows={4}
              value={formData.comments}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
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
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            {!moms || moms.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No moms have been added
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {moms.map((mom, index) => (
                  <TableRow key={index}>
                    <TableCell>{mom.date}</TableCell>
                    <TableCell>{mom.duration}</TableCell>
                    <TableCell>{mom.momLink}</TableCell>
                    <TableCell>{mom.comments}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        // onClick={() => handleEdit(mom._id)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => handleDelete(mom._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
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
