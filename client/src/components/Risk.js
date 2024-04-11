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
  Typography,
  Select,
  MenuItem,
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

  const { projects, loading, error, role, refreshData } =
    useContext(DataContext);
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

      await refreshData();
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

  const handleEdit = (profile) => {
    setEditFormData(profile);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const { _id, ...data } = editFormData;
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.put(
        `http://localhost:8080/riskprofiling/${id}/${_id}/edit`,
        data
      );

      if (response.status === 200) {
        const updatedRiskProfiles = riskProfiles.map((profile) =>
          profile._id === _id ? response.data : profile
        );
        setRiskProfiles(updatedRiskProfiles);
        await refreshData();
        setEditDialogOpen(false);
        console.log("Resource updated with _id:", _id);
      } else {
        console.error("Error updating resource:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating risk profile:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      await axiosInstance.delete(`/riskprofiling/${id}/${_id}/delete`);
      setRiskProfiles(riskProfiles.filter((resource) => resource._id !== _id));
      console.log("risk deleted with _id:", _id);
      await refreshData();
    } catch (error) {
      console.error("Error deleting risk :", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
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
          <Grid item xs={8}>
            <Paper sx={{ p: 2 }}>
              <h2>Add Risks</h2>
              <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="riskType">Risk Type</InputLabel>
                <Select
                  required
                  name="riskType"
                  value={formData.riskType}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="Financial">Financial</MenuItem>
                  <MenuItem value="Operational">Operational</MenuItem>
                  <MenuItem value="Technical">Technical</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="External">External</MenuItem>
                </Select>

                <InputLabel htmlFor="description">Description</InputLabel>
                <TextField
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />

                <InputLabel htmlFor="severity">Severity</InputLabel>
                <Select
                  required
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>

                <InputLabel htmlFor="impact">Impact</InputLabel>
                <Select
                  required
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>

                <InputLabel htmlFor="remedialSteps">Remedial Steps</InputLabel>
                <TextField
                  required
                  name="remedialSteps"
                  value={formData.remedialSteps}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />

                <InputLabel htmlFor="status">Status</InputLabel>
                <TextField
                  required
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />

                <InputLabel htmlFor="closureDate">Closure Date</InputLabel>
                <TextField
                  required
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

        <Grid item xs={12}>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <h2>Risks</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Risk Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Description
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Severity
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Impact
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Remedial Steps
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Status
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
                          onClick={() => handleEdit(profile)}
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
              <Select
                required
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
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>

              <InputLabel htmlFor="impact">Impact</InputLabel>
              <Select
                required
                name="impact"
                value={editFormData.impact}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    impact: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>

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
                  setEditFormData({
                    ...editFormData,
                    status: e.target.value,
                  })
                }
                fullWidth
                sx={{ mb: 2 }}
              />

              <InputLabel htmlFor="closureDate">Closure Date</InputLabel>
              <TextField
                required={true}
                name="closureDate"
                type="date"
                value={editFormData.closureDate?.split("T")[0]}
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
