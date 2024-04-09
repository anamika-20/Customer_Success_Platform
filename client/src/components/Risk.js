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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
} from "@mui/material";

import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const Risk = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role } = useContext(DataContext);
  console.log(projects);
  const [riskProfiles, setRiskProfiles] = useState([]);
  const [formData, setFormData] = useState({
    riskType: "",
    description: "",
    severity: "",
    impact: "",
    remedialSteps: "",
    status: "",
    closureDate: "",
  });
  const [editFormData, setEditFormData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setRiskProfiles(project.riskProfiling);
      }
    }
  }, [id, projects]);

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
        `http://localhost:8080/riskprofiling/${id}/add`,
        {
          riskType: formData.riskType,
          description: formData.description,
          severity: formData.severity,
          impact: formData.impact,
          remedialSteps: formData.remedialSteps,
          status: formData.status,
          closureDate: formData.closureDate,
        }
      );

      setRiskProfiles([...riskProfiles, response.data]);
      setFormData({
        // project_id: "",
        riskType: "",
        description: "",
        severity: "",
        impact: "",
        remedialSteps: "",
        status: "",
        closureDate: "",
      });
    } catch (error) {
      console.error("Error creating risk profile:", error);
    }
  };

  const handleEdit = (id) => {
    const riskProfileToEdit = riskProfiles.find(
      (profile) => profile._id === id
    );
    setEditItemId(id);
    setEditFormData({
      // project_id: riskProfileToEdit.project_id,
      riskType: riskProfileToEdit.riskType,
      description: riskProfileToEdit.description,
      severity: riskProfileToEdit.severity,
      impact: riskProfileToEdit.impact,
      remedialSteps: riskProfileToEdit.remedialSteps,
      status: riskProfileToEdit.status,
      closureDate: riskProfileToEdit.closureDate,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      // await updateRiskProfiling(editItemId, editFormData);
      const updatedRiskProfiles = riskProfiles.map((profile) => {
        if (profile._id === editItemId) {
          return {
            ...profile,
            // project_id: editFormData.project_id,
            riskType: editFormData.riskType,
            description: editFormData.description,
            severity: editFormData.severity,
            impact: editFormData.impact,
            remedialSteps: editFormData.remedialSteps,
            status: editFormData.status,
            closureDate: editFormData.closureDate,
          };
        }
        return profile;
      });
      setRiskProfiles(updatedRiskProfiles);
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating risk profile:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // await deleteRiskProfiling(id);
      setRiskProfiles(riskProfiles.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting version history:", error);
    }
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
          <Grid item xs={12}>
            <h2>Add Risks</h2>
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
                <InputLabel htmlFor="riskType">Risk Type</InputLabel>
                <TextField
                  required={true}
                  name="riskType"
                  value={formData.riskType}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="description">Description</InputLabel>
                <TextField
                  required={true}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="severity">Severity</InputLabel>
                <TextField
                  required={true}
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="impact">Impact</InputLabel>
                <TextField
                  required={true}
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="remedialSteps">Remedial Steps</InputLabel>
                <TextField
                  required={true}
                  name="remedialSteps"
                  value={formData.remedialSteps}
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
                <InputLabel htmlFor="closureDate">Closure Date</InputLabel>
                <TextField
                  required={true}
                  name="closureDate"
                  type="date"
                  value={formData.closureDate}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" type="submit">
                  Add Risk Profile
                </Button>
              </form>
            </Paper>
          </Grid>
        )}

        <h2>Risks</h2>
        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>Project ID</TableCell> */}
                  <TableCell>Risk Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Severity</TableCell>
                  <TableCell>Impact</TableCell>
                  <TableCell>Remedial Steps</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Closure Date</TableCell>
                  {(role === "projectmanager" || role === "admin") && (
                    <TableCell>Edit</TableCell>
                  )}
                  {(role === "projectmanager" || role === "admin") && (
                    <TableCell>Delete</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {riskProfiles.map((profile) => (
                  <TableRow key={profile._id}>
                    {/* <TableCell>{profile.project_id}</TableCell> */}
                    <TableCell>{profile?.riskType}</TableCell>
                    <TableCell>{profile?.description}</TableCell>
                    <TableCell>{profile?.severity}</TableCell>
                    <TableCell>{profile?.impact}</TableCell>
                    <TableCell>{profile?.remedialSteps}</TableCell>
                    <TableCell>{profile?.status}</TableCell>
                    <TableCell>{profile?.closureDate?.split("T")[0]}</TableCell>
                    {(role === "projectmanager" || role === "admin") && (
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() => handleEdit(profile._id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    )}
                    {(role === "projectmanager" || role === "admin") && (
                      <TableCell>
                        <Button
                          color="error"
                          onClick={() => handleDelete(profile._id)}
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
          maxWidth="md"
        >
          <DialogTitle>Edit Risk Profile</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSaveEdit}>
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
              <InputLabel htmlFor="type">Type</InputLabel>
              <TextField
                required={true}
                name="riskType"
                value={editFormData.riskType}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    riskType: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="description">Description</InputLabel>
              <TextField
                required={true}
                name="description"
                value={editFormData.description}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    description: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="severity">Severity</InputLabel>
              <TextField
                required={true}
                name="severity"
                value={editFormData.severity}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    severity: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="impact">Impact</InputLabel>
              <TextField
                required={true}
                name="impact"
                value={editFormData.impact}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, impact: e.target.value })
                }
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="remedialSteps">Remedial Steps</InputLabel>
              <TextField
                required={true}
                name="remedialSteps"
                value={editFormData.remedialSteps}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    remedialSteps: e.target.value,
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
              <InputLabel htmlFor="closureDate">Closure Date</InputLabel>
              <TextField
                required={true}
                name="closureDate"
                type="date"
                value={editFormData.closureDate}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    closureDate: e.target.value,
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

export default Risk;
