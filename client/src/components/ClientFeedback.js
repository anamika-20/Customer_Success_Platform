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
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

const ClientFeedback = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [formData, setFormData] = useState({
    feedbackType: "",
    dateReceived: "",
    detailedFeedback: "",
    actionTaken: "",
    closureDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/clientfeedback",
        formData
      );
      console.log("Feedback submitted:", response.data);
      setFormData({
        feedbackType: "",
        dateReceived: "",
        detailedFeedback: "",
        actionTaken: "",
        closureDate: "",
      });
      setFeedback([...feedback, response.data]);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/clientfeedback"
        );
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchData();
  }, []);
  const getRole = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/getRole?email=${user?.email}`
      );
      if (response.data.role === "Does not Exists") setRole(null);
      else setRole(response.data.role);
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };
  if (!isLoading) getRole();

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    _id: null,
    feedbackType: "",
    dateReceived: "",
    detailedFeedback: "",
    actionTaken: "",
    closureDate: "",
  });

  const handleEdit = (feedbackItem) => {
    setEditFormData({
      _id: feedbackItem._id,
      feedbackType: feedbackItem.feedbackType,
      dateReceived: feedbackItem.dateReceived,
      detailedFeedback: feedbackItem.detailedFeedback,
      actionTaken: feedbackItem.actionTaken,
      closureDate: feedbackItem.closureDate,
    });
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.patch(
        `http://localhost:8080/api/clientfeedback/${editFormData._id}`,
        editFormData
      );
      console.log("Feedback edited:", editFormData);
      setFeedback(
        feedback.map((item) =>
          item._id === editFormData._id ? editFormData : item
        )
      );
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error editing feedback:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      if (!_id) {
        console.error("Feedback _id is undefined or null");
        return;
      }

      await axios.delete(`http://localhost:8080/api/clientfeedback/${_id}`);
      console.log("Feedback deleted with _id:", _id);
      setFeedback(feedback.filter((item) => item._id !== _id));
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <Layout>
      <h2>Client Feedback</h2>
      {/* Form */}
      {(role === "client" || role === "admin") && (
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
              <InputLabel htmlFor="detailedFeedback">
                Detailed Feedback
              </InputLabel>
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
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      )}
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
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            {!feedback || feedback.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No feedback
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {feedback.map((feedBackItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{feedBackItem.feedbackType}</TableCell>
                    <TableCell>
                      {feedBackItem.dateReceived.split("T")[0]}
                    </TableCell>
                    <TableCell>{feedBackItem.detailedFeedback}</TableCell>
                    <TableCell>{feedBackItem.actionTaken}</TableCell>
                    <TableCell>
                      {feedBackItem.closureDate.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={role !== "admin"}
                        color="primary"
                        onClick={() => handleEdit(feedBackItem)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <Dialog
                      open={editDialogOpen}
                      onClose={handleCloseEditDialog}
                      maxWidth="md"
                      fullWidth
                    >
                      <DialogTitle>Edit Feedback</DialogTitle>
                      <DialogContent>
                        <label>FeedBack Type</label>
                        <TextField
                          id="feedbackType"
                          name="feedbackType"
                          value={editFormData.feedbackType}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              feedbackType: e.target.value,
                            })
                          }
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <label>Detailed Feedback</label>
                        <TextField
                          id="detailedFeedback"
                          name="detailedFeedback"
                          multiline
                          rows={4}
                          value={editFormData.detailedFeedback}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              detailedFeedback: e.target.value,
                            })
                          }
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <label>Date Recieved</label>
                        <TextField
                          id="dateReceived"
                          type="date"
                          value={
                            editFormData.dateReceived
                              ? editFormData.dateReceived.split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              dateReceived: e.target.value,
                            })
                          }
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <label>Action Taken</label>
                        <TextField
                          id="actionTaken"
                          multiline
                          rows={4}
                          value={editFormData.actionTaken}
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              actionTaken: e.target.value,
                            })
                          }
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                        <label>Closure Date</label>
                        <TextField
                          id="closureDate"
                          type="date"
                          value={
                            editFormData.closureDate
                              ? editFormData.closureDate.split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setEditFormData({
                              ...editFormData,
                              closureDate: e.target.value,
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
                    <TableCell>
                      <Button
                        disabled={role !== "admin"}
                        color="error"
                        onClick={() => handleDelete(feedBackItem._id)}
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

export default ClientFeedback;
