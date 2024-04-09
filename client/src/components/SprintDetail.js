import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  InputLabel,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const SprintDetail = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role } = useContext(DataContext);
  console.log(projects);
  const [sprintDetails, setSprintDetails] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    status: "",
    comments: "",
  });
  const [editFormData, setEditFormData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setSprintDetails(project.sprints);
      }
    }
  }, [id, projects]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getAllSprintDetails();
  //       setSprintDetails(data);
  //     } catch (error) {
  //       console.error("Error fetching sprint details:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.post(
        `http://localhost:8080/sprint/${id}/add`,
        {
          startDate: formData.startDate,
          endDate: formData.endDate,
          comments: formData.comments,
          status: formData.status,
        }
      );
      setSprintDetails([...sprintDetails, response.data]);
      setFormData({
        startDate: "",
        endDate: "",
        status: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error creating sprint detail:", error);
    }
  };

  const handleEdit = (id) => {
    const sprintDetailToEdit = sprintDetails.find(
      (detail) => detail._id === id
    );
    setEditItemId(id);
    setEditFormData({
      // project_id: sprintDetailToEdit.project_id,
      startDate: sprintDetailToEdit.startDate,
      endDate: sprintDetailToEdit.endDate,
      status: sprintDetailToEdit.status,
      comments: sprintDetailToEdit.comments,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      // await updateSprintDetail(editItemId, editFormData);
      const updatedSprintDetails = sprintDetails.map((detail) => {
        if (detail._id === editItemId) {
          return {
            ...detail,
            // project_id: editFormData.project_id,
            startDate: editFormData.startDate,
            endDate: editFormData.endDate,
            status: editFormData.status,
            comments: editFormData.comments,
          };
        }
        return detail;
      });
      setSprintDetails(updatedSprintDetails);
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating sprint detail:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // await deleteSprintDetail(id);
      setSprintDetails(sprintDetails.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting version history:", error);
    }
  };

  return (
    !isLoading && (
      <Layout>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Grid item xs={12}>
            <HorizontalList />
          </Grid>
          {(role === "projectmanager" || role === "admin") && (
            <Grid item xs={12}>
              <h2>Sprint Detail</h2>
              <Paper sx={{ p: 2 }}>
                <form onSubmit={handleSubmit}>
                  {/* <TextField
                    name="project_id"
                    label="Project ID"
                    value={formData.project_id}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  /> */}
                  <InputLabel htmlFor="startDate">Start Date</InputLabel>
                  <TextField
                    required={true}
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel htmlFor="endDate">End Date</InputLabel>
                  <TextField
                    required={true}
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel htmlFor="status">Status</InputLabel>
                  <TextField
                    required={true}
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel htmlFor="comments">Comments</InputLabel>
                  <TextField
                    required={true}
                    name="comments"
                    multiline
                    rows={4}
                    value={formData.comments}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" type="submit">
                    Add Sprint Detail
                  </Button>
                </form>
              </Paper>
            </Grid>
          )}

          <h2>Sprint Detail</h2>
          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Project ID</TableCell> */}
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Comments</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sprintDetails.map((detail) => (
                    <TableRow key={detail._id}>
                      {/* <TableCell>{detail.project_id}</TableCell> */}
                      <TableCell>{detail?.startDate?.split("T")[0]}</TableCell>
                      <TableCell>{detail?.endDate?.split("T")[0]}</TableCell>
                      <TableCell>{detail?.status}</TableCell>
                      <TableCell>{detail?.comments}</TableCell>
                      <TableCell>
                        <Button
                          disabled={role !== "admin"}
                          color="primary"
                          onClick={() => handleEdit(detail._id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={role !== "admin"}
                          color="error"
                          onClick={() => handleDelete(detail._id)}
                        >
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
            <DialogTitle>Edit Sprint Detail</DialogTitle>
            <DialogContent>
              <form>
                {/* <TextField
                  name="project_id"
                  label="Project ID"
                  value={editFormData.project_id}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      project_id: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                /> */}
                <InputLabel htmlFor="startDate">Start Date</InputLabel>
                <TextField
                  required={true}
                  name="startDate"
                  type="date"
                  value={editFormData.startDate}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      startDate: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="endDate">End Date</InputLabel>
                <TextField
                  required={true}
                  name="endDate"
                  type="date"
                  value={editFormData.endDate}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      endDate: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="status">Status</InputLabel>
                <TextField
                  required={true}
                  name="status"
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="comments">Comments</InputLabel>
                <TextField
                  required={true}
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
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button onClick={handleSaveEdit}>Save</Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Layout>
    )
  );
};

export default SprintDetail;
