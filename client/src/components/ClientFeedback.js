import React, { useContext, useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
  Typography,
  Select,
  MenuItem,
  Dialog,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const ClientFeedback = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role, refreshData } =
    useContext(DataContext);
  console.log(projects);

  const [feedback, setFeedback] = useState([]);
  const [formData, setFormData] = useState({
    feedbackType: "",
    dateReceived: "",
    detailedFeedback: "",
    actionTaken: "",
    closureDate: "",
  });

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setFeedback(project.clientFeedback);
      }
    }
  }, [id, projects]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.post(`/clientfeedback/${id}/add`, {
        type: formData.feedbackType,
        dateReceived: formData.dateReceived,
        detailedFeedback: formData.detailedFeedback,
        actionTaken: formData.actionTaken,
        closureDate: formData.closureDate,
      });

      setFeedback([...feedback, response.data]);
      setFormData({
        feedbackType: "",
        dateReceived: "",
        detailedFeedback: "",
        actionTaken: "",
        closureDate: "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    // _id: null,
    feedbackType: "",
    dateReceived: "",
    detailedFeedback: "",
    actionTaken: "",
    closureDate: "",
  });

  const handleEdit = (feedbackItem) => {
    setEditFormData({
      _id: feedbackItem._id,
      feedbackType: feedbackItem.type,
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

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const { _id, ...data } = editFormData;
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.put(
        `http://localhost:8080/clientfeedback/${id}/${_id}/edit`,
        data
      );

      if (response.status === 200) {
        const updatedfeedback = feedback.map((f) =>
          f._id === _id ? response.data : f
        );
        setFeedback(updatedfeedback);
        await refreshData();

        setEditDialogOpen(false);
        console.log("Feedback updated with _id:", _id);
      } else {
        console.error("Error updating Feedback:", response.data.message);
      }
    } catch (error) {
      console.error("Error editing feedback:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      await axiosInstance.delete(
        `http://localhost:8080/clientfeedback/${id}/${_id}/delete`
      );
      setFeedback(feedback.filter((f) => f._id !== _id));
      await refreshData();

      console.log("Feedback deleted with _id:", _id);
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>
        {/* Form */}
        <Grid container item justifyContent="center" spacing={4}>
          {(role === "client" || role === "admin") && (
            <Grid item xs={8}>
              <Paper sx={{ p: 2, mt: 4 }}>
                <h2>Client Feedback</h2>
                <form onSubmit={handleSubmit}>
                  <InputLabel htmlFor="feedbackType">Feedback Type</InputLabel>
                  <Select
                    required={true}
                    id="feedbackType"
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Complaint">Complaint</MenuItem>
                    <MenuItem value="Appreciation">Appreciation</MenuItem>
                  </Select>
                  <InputLabel htmlFor="dateReceived">Date Received</InputLabel>
                  <TextField
                    required={true}
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
                    required={true}
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
                    required={true}
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
                    required={true}
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
              <h2>Client Feedbacks</h2>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Feedback Type
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Date Received
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Detailed Feedback
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Action Taken
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Closure Date
                      </Typography>
                    </TableCell>
                    {(role === "projectmanager" || role === "admin") && (
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Edit
                        </Typography>
                      </TableCell>
                    )}
                    {(role === "projectmanager" || role === "admin") && (
                      <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Delete
                        </Typography>
                      </TableCell>
                    )}
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
                        <TableCell>{feedBackItem?.type}</TableCell>
                        <TableCell>
                          {feedBackItem?.dateReceived?.split("T")[0]}
                        </TableCell>
                        <TableCell>{feedBackItem?.detailedFeedback}</TableCell>
                        <TableCell>{feedBackItem?.actionTaken}</TableCell>
                        <TableCell>
                          {feedBackItem?.closureDate?.split("T")[0]}
                        </TableCell>
                        {role === "admin" && (
                          <TableCell>
                            <Button
                              color="primary"
                              onClick={() => handleEdit(feedBackItem)}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        )}
                        {role === "admin" && (
                          <TableCell>
                            <Button
                              color="error"
                              onClick={() => handleDelete(feedBackItem._id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        )}
                        <Dialog
                          open={editDialogOpen}
                          onClose={handleCloseEditDialog}
                          maxWidth="md"
                          fullWidth
                        >
                          <DialogTitle>Edit Feedback</DialogTitle>
                          <DialogContent>
                            <label>FeedBack Type</label>
                            <Select
                              required={true}
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
                            >
                              <MenuItem value="Complaint">Complaint</MenuItem>
                              <MenuItem value="Appreciation">
                                Appreciation
                              </MenuItem>
                            </Select>
                            <label>Detailed Feedback</label>
                            <TextField
                              required={true}
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
                              required={true}
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
                              required={true}
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
                              required={true}
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
                            <Button onClick={handleCloseEditDialog}>
                              Cancel
                            </Button>
                            <Button onClick={handleSaveEdit}>Save</Button>
                          </DialogActions>
                        </Dialog>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ClientFeedback;
