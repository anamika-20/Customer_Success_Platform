import React, { useEffect, useState, useContext } from "react";
import Layout from "./Layout";
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
  Typography,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const Resources = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role, refreshData } =
    useContext(DataContext);
  console.log(projects);
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    startDate: "",
    endDate: "",
    comments: "",
  });

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setResources(project.resources);
      }
    }
  }, [id, projects]);

  const [editFormData, setEditFormData] = useState({
    _id: null,
    name: "",
    role: "",
    startDate: "",
    endDate: "",
    comments: "",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (resource) => {
    setEditFormData(resource);
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
        `http://localhost:8080/resources/${id}/${_id}/edit`,
        data
      );

      if (response.status === 200) {
        const updatedResources = resources.map((resource) =>
          resource._id === _id ? response.data : resource
        );
        setResources(updatedResources);
        await refreshData();

        setEditDialogOpen(false);
        console.log("Resource updated with _id:", _id);
      } else {
        console.error("Error updating resource:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.post(
        `http://localhost:8080/resources/${id}/add`,
        {
          name: formData.name,
          role: formData.role,
          startDate: formData.startDate,
          endDate: formData.endDate,
          comments: formData.comments,
        }
      );

      setResources([...resources, response.data]);
      await refreshData();

      setFormData({
        name: "",
        role: "",
        startDate: "",
        endDate: "",
        comments: "",
      });
    } catch (error) {
      console.error(
        "Error submitting Resource:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await fetchResources();
        // setResources(data);

        if (projects && projects.length > 0) {
          const project = projects.find((project) => project._id === id);
          if (project) {
            setResources(project.resources || []);
          }
        }
      } catch (error) {
        console.error("Error fetching Resources:", error);
      }
    };
    fetchData();
  }, [projects, id]);

  const handleDelete = async (_id) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      await axiosInstance.delete(`/resources/${id}/${_id}/delete`);
      setResources(resources.filter((resource) => resource._id !== _id));
      console.log("Resource deleted with _id:", _id);
      await refreshData();
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      {/* Form */}
      <Grid container>
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>
        <Grid container item justifyContent="center" spacing={4}>
          {(role === "projectmanager" || role === "admin") && (
            <Grid item xs={6}>
              <Paper sx={{ p: 2, mt: 4 }}>
                <h2>Add Resources</h2>
                <form onSubmit={handleSubmit}>
                  <InputLabel htmlFor="name">Resource Name</InputLabel>
                  <TextField
                    required={true}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel htmlFor="role">Role</InputLabel>
                  <TextField
                    required={true}
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel htmlFor="startDate">Start Date</InputLabel>
                  <TextField
                    required={true}
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate.split("T")[0]}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel htmlFor="endDate">End Date</InputLabel>
                  <TextField
                    required={true}
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate.split("T")[0]}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel htmlFor="comments">Comment</InputLabel>
                  <TextField
                    required={true}
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
          )}
          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <h2>Resources</h2>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Resource Name
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Role
                      </Typography>
                    </TableCell>
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
                        Comment
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

                {!resources || resources.length === 0 ? (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No Resources have been added
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  <TableBody>
                    {resources?.map((resource, index) => (
                      <TableRow key={index}>
                        <TableCell>{resource?.name}</TableCell>
                        <TableCell>{resource?.role}</TableCell>
                        <TableCell>
                          {resource?.startDate?.split("T")[0]}
                        </TableCell>
                        <TableCell>
                          {resource?.endDate?.split("T")[0]}
                        </TableCell>
                        <TableCell>{resource?.comments}</TableCell>
                        {(role === "projectmanager" || role === "admin") && (
                          <TableCell>
                            <Button
                              color="primary"
                              onClick={() => handleEdit(resource)}
                            >
                              Edit
                            </Button>
                          </TableCell>
                        )}
                        {(role === "projectmanager" || role === "admin") && (
                          <TableCell>
                            <Button
                              color="error"
                              onClick={() => handleDelete(resource._id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Dialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Edit Resource</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSaveEdit}>
              <InputLabel htmlFor="name">Resource Name</InputLabel>
              <TextField
                required={true}
                id="name"
                name="name"
                value={editFormData.name}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    name: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="role">Role</InputLabel>
              <TextField
                required={true}
                id="role"
                name="role"
                value={editFormData.role}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, role: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="startDate">Start Date</InputLabel>
              <TextField
                required={true}
                id="startDate"
                name="startDate"
                type="date"
                value={editFormData.startDate.split("T")[0]}
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
                id="endDate"
                name="endDate"
                type="date"
                value={editFormData.endDate.split("T")[0]}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, endDate: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="comments">Comment</InputLabel>
              <TextField
                required={true}
                id="comments"
                name="comments"
                multiline
                rows={4}
                value={editFormData.comments}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, comments: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button type="submit">Save</Button>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Layout>
  );
};

export default Resources;
