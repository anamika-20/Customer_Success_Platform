import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  getAllVersionHistory,
  createVersionHistory,
  updateVersionHistory,
  deleteVersionHistory,
  getVersionHistoryById,
} from "../api/versionHistoryAPI";
import Layout from "../Layout";
import { getRole } from "../api/profileApi";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const VersionHistory = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  // State for version history data
  const [versionHistory, setVersionHistory] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    versionNumber: "",
    type: "",
    change: "",
    changeReason: "",
    createdBy: "",
    revisionDate: "",
    approvalDate: "",
    approvedBy: "",
    project_id: "",
  });
  const [editFormData, setEditFormData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Fetch version history data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyData = await getAllVersionHistory();
        setVersionHistory(historyData);
      } catch (error) {
        console.error("Error fetching version history:", error);
      }
    };
    const getProjectNames = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/project`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
    getProjectNames();
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

  // Handle functions for CRUD operations
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newHistory = await createVersionHistory(formData);
      setVersionHistory([...versionHistory, newHistory]);
      setFormData({});
    } catch (error) {
      console.error("Error creating version history:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const history = await getVersionHistoryById(id);
      setEditFormData(history);
      setEditDialogOpen(true);
    } catch (error) {
      console.error("Error fetching version history for editing:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateVersionHistory(editFormData._id, editFormData);
      setEditDialogOpen(false);
      const updatedHistory = await getAllVersionHistory();
      setVersionHistory(updatedHistory);
    } catch (error) {
      console.error("Error updating version history:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteVersionHistory(id);
      setVersionHistory(versionHistory.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting version history:", error);
    }
  };

  return (
    !isLoading && (
      <Layout>
        <Grid container justifyContent="center" spacing={4}>
          {(role === "audit" ||
            role === "admin" ||
            role === "projectmanager") && (
            <Grid item xs={8}>
              <h2>Add Version</h2>
              <Paper sx={{ p: 2 }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="versionNumber"
                    label="Version Number"
                    value={formData.versionNumber}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="type"
                    label="Type"
                    value={formData.type}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="change"
                    label="Change"
                    value={formData.change}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="changeReason"
                    label="Change Reason"
                    value={formData.changeReason}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="createdBy"
                    label="Created By"
                    value={formData.createdBy}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="revisionDate"
                    label="Revision Date"
                    type="date"
                    value={formData.revisionDate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="approvalDate"
                    label="Approval Date"
                    type="date"
                    value={formData.approvalDate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="approvedBy"
                    label="Approved By"
                    value={formData.approvedBy}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="project-id-label">Project ID</InputLabel>
                    <Select
                      labelId="project-id-label"
                      id="project-id-select"
                      value={formData.project_id}
                      onChange={handleChange}
                      name="project_id"
                    >
                      {projects.map((project) => (
                        <MenuItem key={project._id} value={project.projectName}>
                          {project.projectName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                    <TableCell>Version Number</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Change</TableCell>
                    <TableCell>Change Reason</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Revision Date</TableCell>
                    <TableCell>Approval Date</TableCell>
                    <TableCell>Approved By</TableCell>
                    <TableCell>Project ID</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {versionHistory.map((history) => (
                    <TableRow key={history._id}>
                      <TableCell>{history.versionNumber}</TableCell>
                      <TableCell>{history.type}</TableCell>
                      <TableCell>{history.change}</TableCell>
                      <TableCell>{history.changeReason}</TableCell>
                      <TableCell>{history.createdBy}</TableCell>
                      <TableCell>
                        {history.revisionDate.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        {history.approvalDate.split("T")[0]}
                      </TableCell>
                      <TableCell>{history.approvedBy}</TableCell>
                      <TableCell>{history.project_id}</TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            role !== "audit" &&
                            role !== "admin" &&
                            role !== "projectmanager"
                          }
                          color="primary"
                          onClick={() => handleEdit(history._id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            role !== "audit" &&
                            role !== "admin" &&
                            role !== "projectmanager"
                          }
                          color="error"
                          onClick={() => handleDelete(history._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog
              open={editDialogOpen}
              onClose={handleCloseEditDialog}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>Edit Version History</DialogTitle>
              <DialogContent>
                <form onSubmit={handleSaveEdit}>
                  <TextField
                    name="versionNumber"
                    label="Version Number"
                    value={editFormData.versionNumber}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        versionNumber: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="type"
                    label="Type"
                    value={editFormData.type}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, type: e.target.value })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="change"
                    label="Change"
                    value={editFormData.change}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        change: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="changeReason"
                    label="Change Reason"
                    value={editFormData.changeReason}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        changeReason: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="createdBy"
                    label="Created By"
                    value={editFormData.createdBy}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        createdBy: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="revisionDate"
                    label="Revision Date"
                    type="date"
                    value={editFormData.revisionDate}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        revisionDate: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="approvalDate"
                    label="Approval Date"
                    type="date"
                    value={editFormData.approvalDate}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        approvalDate: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="approvedBy"
                    label="Approved By"
                    value={editFormData.approvedBy}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        approvedBy: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="edit-project-id-label">
                      Project ID
                    </InputLabel>
                    <Select
                      labelId="edit-project-id-label"
                      id="edit-project-id-select"
                      value={editFormData.project_id}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          project_id: e.target.value,
                        })
                      }
                      name="project_id"
                    >
                      {projects.map((project) => (
                        <MenuItem key={project._id} value={project.projectName}>
                          {project.projectName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEditDialog}>Cancel</Button>
                <Button onClick={handleSaveEdit}>Save</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Layout>
    )
  );
};

export default VersionHistory;
