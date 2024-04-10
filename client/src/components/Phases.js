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
  Typography,
  Select,
  MenuItem,
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

  const handleEdit = (phase) => {
    // const selectedPhase = phases.find((phase) => phase._id === id);
    setEditFormData(phase);
    setEditDialogOpen(true);
    // setSelectedId(phase);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const { _id, ...data } = editFormData;

    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.put(
        `/phase/${id}/${_id}/edit`,
        data
      );

      if (response.status === 200) {
        const updatedPhase = phases.map((phase) =>
          phase._id === _id ? response.data : phase
        );
        setPhases(updatedPhase);
        setEditDialogOpen(false);
        console.log("Phase updated with _id:", _id);
      } else {
        console.error("Error updating Phase:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating phase:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      await axiosInstance.delete(
        `http://localhost:8080/phase/${id}/${_id}/delete`
      );
      setPhases((phases) => phases.filter((phase) => phase._id !== _id));
      console.log("Phase deleted with _id:", _id);
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
            <Paper sx={{ p: 2, mt: 4 }}>
              <h2>Add Phase</h2>
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
                  Add Phase
                </Button>
              </form>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <h2>Phases</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Start Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Completion Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Revised Completion Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Approval Date
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
                          onClick={() => handleEdit(p?.phase)}
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
              <InputLabel htmlFor="name">Resource Name</InputLabel>
              <TextField
                required={true}
                name="title"
                value={editFormData.title}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, title: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="startDate">Start Date</InputLabel>
              <TextField
                required={true}
                name="startDate"
                type="date"
                value={editFormData.startDate?.split("T")[0]}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    startDate: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="completionDate">Completion Date</InputLabel>
              <TextField
                required={true}
                name="completionDate"
                type="date"
                value={editFormData.revisedCompletionDate?.split("T")[0]}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    completionDate: e.target.value,
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
                  setEditFormData({
                    ...editFormData,
                    status: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
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

export default Phases;
