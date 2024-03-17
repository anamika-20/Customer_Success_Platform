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
  Typography,
} from "@mui/material";
import {
  getAllRiskProfilings,
  createRiskProfiling,
  updateRiskProfiling,
  deleteRiskProfiling,
} from "../api/riskAPI";
import Layout from "../Layout";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Risk = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  const [riskProfiles, setRiskProfiles] = useState([]);
  const [formData, setFormData] = useState({
    project_id: "",
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
  const [editItemId, setEditItemId] = useState(null); // For tracking the item being edited

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRiskProfilings();
        setRiskProfiles(data);
      } catch (error) {
        console.error("Error fetching risk profiles:", error);
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
      const newRiskProfile = await createRiskProfiling(formData);
      setRiskProfiles([...riskProfiles, newRiskProfile]);
      setFormData({
        project_id: "",
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
      project_id: riskProfileToEdit.project_id,
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
      await updateRiskProfiling(editItemId, editFormData);
      const updatedRiskProfiles = riskProfiles.map((profile) => {
        if (profile._id === editItemId) {
          return {
            ...profile,
            project_id: editFormData.project_id,
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
      await deleteRiskProfiling(id);
      setRiskProfiles(riskProfiles.filter((item) => item._id !== id));
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
          {(role === "projectmanager" || role === "admin") && (
            <Grid item xs={12}>
              <h2>Add Risks</h2>
              <Paper sx={{ p: 2 }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="project_id"
                    label="Project ID"
                    value={formData.project_id}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="riskType"
                    label="Risk Type"
                    value={formData.riskType}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="severity"
                    label="Severity"
                    value={formData.severity}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="impact"
                    label="Impact"
                    value={formData.impact}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="remedialSteps"
                    label="Remedial Steps"
                    value={formData.remedialSteps}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="status"
                    label="Status"
                    value={formData.status}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="closureDate"
                    label="Closure Date"
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
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {riskProfiles.map((profile) => (
                    <TableRow key={profile._id}>
                      {/* <TableCell>{profile.project_id}</TableCell> */}
                      <TableCell>{profile.riskType}</TableCell>
                      <TableCell>{profile.description}</TableCell>
                      <TableCell>{profile.severity}</TableCell>
                      <TableCell>{profile.impact}</TableCell>
                      <TableCell>{profile.remedialSteps}</TableCell>
                      <TableCell>{profile.status}</TableCell>
                      <TableCell>{profile.closureDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            role !== "projectmanager" && role !== "admin"
                          }
                          color="primary"
                          onClick={() => handleEdit(profile._id)}
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
                          onClick={() => handleDelete(profile._id)}
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
            maxWidth="md"
          >
            <DialogTitle>Edit Risk Profile</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSaveEdit}>
                <TextField
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
                />
                <TextField
                  name="riskType"
                  label="Risk Type"
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
                <TextField
                  name="description"
                  label="Description"
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
                <TextField
                  name="severity"
                  label="Severity"
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
                <TextField
                  name="impact"
                  label="Impact"
                  value={editFormData.impact}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, impact: e.target.value })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="remedialSteps"
                  label="Remedial Steps"
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
                <TextField
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
                  name="closureDate"
                  label="Closure Date"
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
    )
  );
};

export default Risk;
