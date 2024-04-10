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
  Select,
  MenuItem,
  Typography,
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

  const { projects, loading, error, role, refreshData } =
    useContext(DataContext);
  console.log(projects);
  const [sprintDetails, setSprintDetails] = useState([]);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    status: "",
    comments: "",
  });
  const [editFormData, setEditFormData] = useState({
    _id: "",
    startDate: "",
    endDate: "",
    status: "",
    comments: "",
  });
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
      await refreshData();
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

  const handleEdit = (detail) => {
    // setEditItemId(detail._id); ye purana th
    setEditFormData({
      _id: detail.sprint._id,
      startDate: detail.sprint.startDate.split("T")[0],
      endDate: detail.sprint.endDate.split("T")[0],
      status: detail.sprint.status,
      comments: detail.sprint.comments,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const { _id, ...data } = editFormData;
    console.log(_id);
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.put(
        `/sprint/${id}/${_id}/edit`,
        data
      );

      if (response.status === 200) {
        const updatedSprint = sprintDetails.map((sprint) =>
          sprint._id === _id ? response.data : sprint
        );
        setSprintDetails(updatedSprint);
        setEditDialogOpen(false);
        console.log("Sprint updated with _id:", _id);
      } else {
        console.error("Error updating Sprint:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating sprint detail:", error);
    }
    await refreshData();
  };

  const handleDelete = async (_id) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      await axiosInstance.delete(`/sprint/${id}/${_id}/delete`);
      setSprintDetails(sprintDetails.filter((item) => item._id !== _id));
      console.log("sprint deleted with _id:", _id);
    } catch (error) {
      console.error("Error deleting Sprint :", error);
    }
    await refreshData();
  };

  return (
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
          <Grid item xs={6}>
            <Paper sx={{ p: 2, mt: 4 }}>
              <h2>Sprint Detail</h2>
              <form onSubmit={handleSubmit}>
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
                <Select
                  required={true}
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="Delayed">Delayed</MenuItem>
                  <MenuItem value="On-time">On-time</MenuItem>
                  <MenuItem value="Sign-off Pending">Sign-off Pending</MenuItem>
                  <MenuItem value="Signed-off">Signed-off</MenuItem>
                </Select>
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

        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <h2>Sprint Detail</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Start Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      End Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Comments
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Edit
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Delete
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sprintDetails.map((detail) => (
                  <TableRow key={detail.sprint?._id}>
                    {/* <TableCell>{detail.project_id}</TableCell> */}
                    <TableCell>
                      {detail?.sprint?.startDate?.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      {detail?.sprint?.endDate?.split("T")[0]}
                    </TableCell>
                    <TableCell>{detail?.sprint?.status}</TableCell>
                    <TableCell>{detail?.sprint?.comments}</TableCell>
                    <TableCell>
                      <Button
                        disabled={role !== "admin"}
                        color="primary"
                        onClick={() => handleEdit(detail)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={role !== "admin"}
                        color="error"
                        onClick={() => handleDelete(detail.sprint?._id)}
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
              <Select
                required={true}
                name="status"
                value={editFormData.status}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, status: e.target.value })
                }
                fullWidth
              >
                <MenuItem value="Delayed">Delayed</MenuItem>
                <MenuItem value="On-time">On-time</MenuItem>
                <MenuItem value="Sign-off Pending">Sign-off Pending</MenuItem>
                <MenuItem value="Signed-off">Signed-off</MenuItem>
              </Select>
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
  );
};

export default SprintDetail;
