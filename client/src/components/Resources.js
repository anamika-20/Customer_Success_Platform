import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchResources,
  submitResource,
  updateResource,
  deleteResource,
  fetchUserRole,
} from "../api/resourcesAPI";

const Resources = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    resourceName: "",
    role: "",
    startDate: "",
    endDate: "",
    comment: "",
  });
  const [editFormData, setEditFormData] = useState({
    _id: null,
    resourceName: "",
    role: "",
    startDate: "",
    endDate: "",
    comment: "",
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
    try {
      const updatedResource = await updateResource(
        editFormData._id,
        editFormData
      );
      setResources(
        resources.map((resource) =>
          resource._id === updatedResource._id ? updatedResource : resource
        )
      );
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error editing resource:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitResource(formData);
      setResources([...resources, response]);
      console.log("Resource submitted:", response);
      setFormData({
        resourceName: "",
        role: "",
        startDate: "",
        endDate: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error submitting Resource:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchResources();
        setResources(data);
      } catch (error) {
        console.error("Error fetching Resources:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const userRole = await fetchUserRole(user?.email);
        if (userRole === "Does not Exists") setRole(null);
        else setRole(userRole);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    if (!isLoading) getUserRole();
  }, [isLoading, user]);

  const handleDelete = async (_id) => {
    try {
      await deleteResource(_id);
      setResources(resources.filter((resource) => resource._id !== _id));
      console.log("Resource deleted with _id:", _id);
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  return (
    <Layout>
      {/* Form */}
      {(role === "projectmanager" || role === "admin") && (
        <Grid item xs={12}>
          <h2>Resources</h2>
          <Paper sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
              <InputLabel htmlFor="resourceName">Resource Name</InputLabel>
              <TextField
                required={true}
                id="resourceName"
                name="resourceName"
                value={formData.resourceName}
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
              <InputLabel htmlFor="comment">Comment</InputLabel>
              <TextField
              required={true}
                id="comment"
                name="comment"
                multiline
                rows={4}
                value={formData.comment}
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
                <TableCell>Resource Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
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
                {resources.map((resource, index) => (
                  <TableRow key={index}>
                    <TableCell>{resource.resourceName}</TableCell>
                    <TableCell>{resource.role}</TableCell>
                    <TableCell>{resource.startDate.split("T")[0]}</TableCell>
                    <TableCell>{resource.endDate.split("T")[0]}</TableCell>
                    <TableCell>{resource.comment}</TableCell>
                    <TableCell>
                      <Button
                        disabled={role !== "projectmanager" && role !== "admin"}
                        color="primary"
                        onClick={() => handleEdit(resource)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={role !== "projectmanager" && role !== "admin"}
                        color="error"
                        onClick={() => handleDelete(resource._id)}
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

      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit Resource</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSaveEdit}>
            <InputLabel htmlFor="resourceName">Resource Name</InputLabel>
            <TextField
            required={true}
              id="resourceName"
              name="resourceName"
              value={editFormData.resourceName}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  resourceName: e.target.value,
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
                setEditFormData({ ...editFormData, startDate: e.target.value })
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
            <InputLabel htmlFor="comment">Comment</InputLabel>
            <TextField
            required={true}
              id="comment"
              name="comment"
              multiline
              rows={4}
              value={editFormData.comment}
              onChange={(e) =>
                setEditFormData({ ...editFormData, comment: e.target.value })
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
    </Layout>
  );
};

export default Resources;
