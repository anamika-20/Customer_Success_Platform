
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const Moms = () => {
  const [moms, setMoms] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    momLink: "",
    comments: "",
  });
  const [editFormData, setEditFormData] = useState({
    _id: null,
    date: "",
    duration: "",
    momLink: "",
    comments: "",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (mom) => {
    setEditFormData(mom);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/moms",
        formData
      );
      setMoms([...moms, response.data]);
      console.log("MoM submitted:", response.data);
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

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/api/moms/${editFormData._id}`,
        editFormData
      );
      console.log("MoM edited:", editFormData);
      setEditDialogOpen(false);
      setMoms(
        moms.map((item) =>
          item._id === editFormData._id ? editFormData : item
        )
      );
    } catch (error) {
      console.error("Error editing MoM:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      if (!_id) {
        console.error("MoM _id is undefined or null");
        return;
      }

      // Implement your DELETE request logic here
      await axios.delete(`http://localhost:8080/api/moms/${_id}`);
      setMoms(moms.filter((mom) => mom._id !== _id));
      console.log("Feedback deleted with _id:", _id);
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  useEffect(() => {
    const fetchMoms = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/moms");
        setMoms(response.data);
      } catch (error) {
        console.error("Error fetching moms:", error);
      }
    };
    fetchMoms();
  }, []);

  return (
    <Layout>
      <Grid item xs={12}>
      <h2>Minutes of Meeting</h2>
        <Paper sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <InputLabel htmlFor="date">Date</InputLabel>
            <TextField
              id="date"
              name="date"
              type="date"
              value={formData.date.split("T")[0]}
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

      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>MoM Link</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {moms.map((mom, index) => (
                <TableRow key={index}>
                  <TableCell>{mom.date.split("T")[0]}</TableCell>
                  <TableCell>{mom.duration}</TableCell>
                  <TableCell>{mom.momLink}</TableCell>
                  <TableCell>{mom.comments}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleEdit(mom)}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button color="error" onClick={() => handleDelete(mom._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit MoM</DialogTitle>
        <DialogContent>
          <InputLabel htmlFor="date">Date</InputLabel>
          <TextField
            id="date"
            name="date"
            type="date"
            value={editFormData.date.split("T")[0]}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                date: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <InputLabel htmlFor="duration">Duration</InputLabel>
          <TextField
            id="duration"
            name="duration"
            value={editFormData.duration}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                duration: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <InputLabel htmlFor="momLink">MoM Link</InputLabel>
          <TextField
            id="momLink"
            name="momLink"
            value={editFormData.momLink}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                momLink: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <InputLabel htmlFor="comments">Comment</InputLabel>
          <TextField
            id="comments"
            name="comments"
            multiline
            rows={4}
            value={editFormData.comments}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                comments: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Moms;