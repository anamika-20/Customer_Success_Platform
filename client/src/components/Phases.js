import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Layout from "./Layout";
import {
  getAllPhases,
  createPhases,
  updatePhases,
  deletePhases,
} from "../api/phasesAPI";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Phases = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  const [phases, setPhases] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    completionDate: "",
    status: "",
    comments: "",
  });
  const [editFormData, setEditFormData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const phaseData = await getAllPhases();
        setPhases(phaseData);
      } catch (error) {
        console.error("Error fetching phases:", error);
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
  const handleEdit = (id) => {
    const selectedPhase = phases.find((phase) => phase._id === id);
    setEditFormData(selectedPhase);
    setEditDialogOpen(true);
    setSelectedId(id);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveEdit = async () => {
    try {
      await updatePhases(selectedId, editFormData);
      setEditDialogOpen(false);
      // Instead of refetching all phases, update the specific phase in the state
      setPhases((prevPhases) =>
        prevPhases.map((phase) =>
          phase._id === selectedId ? editFormData : phase
        )
      );
    } catch (error) {
      console.error("Error updating phase:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePhases(id);
      // Filter out the deleted phase from the state
      setPhases((prevPhases) => prevPhases.filter((phase) => phase._id !== id));
    } catch (error) {
      console.error("Error deleting phase:", error);
    }
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPhase = await createPhases(formData);
      setPhases([...phases, newPhase]);
      setFormData({
        title: "",
        startDate: "",
        completionDate: "",
        status: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error creating phase:", error);
    }
  };

  return (
    !isLoading && (
      <Layout>
        <Grid container spacing={2} justifyContent="center">
          {(role === "projectmanager" || role === "admin") && (
            <Grid item xs={12}>
              <h2>Add Phase</h2>
              <Paper sx={{ p: 2 }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    required={true}
                    name="title"
                    label="Title"
                    value={formData.title}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                   required={true}
                    name="startDate"
                    label="Start Date"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    required={true}
                    name="completionDate"
                    label="Completion Date"
                    type="date"
                    value={formData.completionDate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                   required={true}
                    name="status"
                    label="Status"
                    value={formData.status}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                   required={true}
                    name="comments"
                    label="Comments"
                    multiline
                    rows={4}
                    value={formData.comments}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" type="submit">
                    Add Phase
                  </Button>
                </form>
              </Paper>
            </Grid>
          )}

          <Grid item xs={12}>
            <h2>Phases</h2>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Completion Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Comments</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {phases.map((phase) => (
                    <TableRow key={phase._id}>
                      <TableCell>{phase.title}</TableCell>
                      <TableCell>{phase.startDate}</TableCell>
                      <TableCell>{phase.completionDate}</TableCell>
                      <TableCell>{phase.status}</TableCell>
                      <TableCell>{phase.comments}</TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            role !== "projectmanager" && role !== "admin"
                          }
                          color="primary"
                          onClick={() => handleEdit(phase._id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            role !== "projectmanager" && role !== "admin"
                          }
                          color="error"
                          onClick={() => handleDelete(phase._id)}
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
            <DialogTitle>Edit Phase</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSaveEdit}>
                {/* Form fields for editing existing phase */}
                <TextField
                 required={true}
                  name="title"
                  label="Title"
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                 required={true}
                  name="startDate"
                  label="Start Date"
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
                <TextField
                 required={true}
                  name="completionDate"
                  label="Completion Date"
                  type="date"
                  value={editFormData.completionDate}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      completionDate: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                 required={true}
                  name="status"
                  label="Status"
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, status: e.target.value })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                 required={true}
                  name="comments"
                  label="Comments"
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

export default Phases;
