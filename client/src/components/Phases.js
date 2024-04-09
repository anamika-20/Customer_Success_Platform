import React, { useState, useEffect, useContext } from "react";
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
import Layout from "./Layout";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import HorizontalList from "./HorizontalList";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";

const Phases = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role } = useContext(DataContext);
  console.log(projects);
  const [phases, setPhases] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    completionDate: "",
    approvalDate: "",
    revisedCompletionDate: "",
    status: "",
    comments: "",
  });
  const [editFormData, setEditFormData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setPhases(project.phases);
      }
    }
  }, [id, projects]);

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
      // await updatePhases(selectedId, editFormData);
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
      // await deletePhases(id);
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
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.post(
        `http://localhost:8080/phase/${id}/add`,
        {
          title: formData.title,
          status: formData.status,
          startDate: formData.startDate,
          completionDate: formData.completionDate,
          approvalDate: formData.approvalDate,
          revisedCompletionDate: formData.revisedCompletionDate,
          comments: formData.comments,
        }
      );
      setPhases([...phases, response.data]);

      setFormData({
        title: "",
        startDate: "",
        completionDate: "",
        approvalDate: "",
        revisedCompletionDate: "",
        status: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error creating phase:", error);
    }
  };

  return (
    <Layout>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>
        {(role === "projectmanager" || role === "admin") && (
          <Grid item xs={8}>
            <h2>Add Phase</h2>
            <Paper sx={{ p: 2 }}>
              <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="title">Title</InputLabel>
                <TextField
                  required={true}
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
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
                <InputLabel htmlFor="completionDate">
                  Completion Date
                </InputLabel>
                <TextField
                  required={true}
                  name="completionDate"
                  type="date"
                  value={formData.completionDate}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="revisedCompletionDate">
                  Revised Completion Date
                </InputLabel>
                <TextField
                  required={true}
                  name="revisedCompletionDate"
                  type="date"
                  value={formData.revisedCompletionDate}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="approvalDate">Approval Date</InputLabel>
                <TextField
                  required={true}
                  name="approvalDate"
                  type="date"
                  value={formData.approvalDate}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="status">Status Date</InputLabel>
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
                  <TableCell>Revised Completion Date</TableCell>
                  <TableCell>Approval Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Comments</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {phases.map((p) => (
                  <TableRow key={p?.phase?._id}>
                    <TableCell>{p?.phase?.title}</TableCell>
                    <TableCell>{p?.phase?.startDate?.split("T")[0]}</TableCell>
                    <TableCell>
                      {p?.phase?.completionDate?.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      {p?.phase?.revisedCompletionDate?.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      {p?.phase?.approvalDate?.split("T")[0]}
                    </TableCell>
                    <TableCell>{p?.phase?.status}</TableCell>
                    <TableCell>{p?.phase?.comments}</TableCell>
                    {(role === "projectmanager" || role === "admin") && (
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() => handleEdit(p?.phase?._id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    )}
                    {(role === "projectmanager" || role === "admin") && (
                      <TableCell>
                        <Button
                          color="error"
                          onClick={() => handleDelete(p?.phase._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
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
                value={editFormData.revisedCompletionDate}
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
  );
};

export default Phases;
