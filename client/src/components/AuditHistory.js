import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// Import API functions
import {
  getAllAuditHistory,
  getAuditHistoryById,
  createAuditHistory,
  updateAuditHistory,
  deleteAuditHistory,
} from "../api/auditHistoryAPI";
import Layout from "../Layout";

const AuditHistory = () => {
  const [auditHistory, setAuditHistory] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    reviewedBy: "",
    status: "",
    reviewedSection: "",
    comments: "",
    actionItem: "",
    project_id: "", 
  });
  const [editFormData, setEditFormData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/auditHistory`
      );
      setAuditHistory(response.data);
    } catch (error) {
      console.error("Error fetching audit history:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };


  // Fetch audit history data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const historyData = await getAllAuditHistory();
        setAuditHistory(historyData);
      } catch (error) {
        console.error("Error fetching audit history:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newHistory = await createAuditHistory(formData);
      setAuditHistory([...auditHistory, newHistory]);
      // Reset form data after successful submission
      setFormData({});
    } catch (error) {
      console.error("Error creating audit history:", error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const history = await getAuditHistoryById(id);
      setEditFormData(history);
      setEditDialogOpen(true);
    } catch (error) {
      console.error("Error fetching audit history for editing:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await updateAuditHistory(editFormData._id, editFormData);
      setEditDialogOpen(false);
      // Fetch updated audit history data
      const updatedHistory = await getAllAuditHistory();
      setAuditHistory(updatedHistory);
    } catch (error) {
      console.error("Error updating audit history:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuditHistory(id);
      setAuditHistory(auditHistory.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting audit history:", error);
    }
  };

  // Dummy data for project IDs
  const projectIds = ["Project A", "Project B", "Project C"];

  return (
    <Layout>
   <Grid container justifyContent="center" spacing={4}>
    <Grid item xs={8}>
      {/* <Typography variant="h4" sx={{ mb: 2 }}>Audit History</Typography> */}
      <h2>Add Audit</h2>
      <Paper sx={{ p: 2 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="date"
              //   label="Date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="reviewedBy"
              label="Reviewed By"
              value={formData.reviewedBy}
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
              name="reviewedSection"
              label="Reviewed Section"
              value={formData.reviewedSection}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="comments"
              label="Comments"
              multiline
              rows={4}
              value={formData.comments}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="actionItem"
              label="Action Item"
              value={formData.actionItem}
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
                {projectIds.map((projectId) => (
                  <MenuItem key={projectId} value={projectId}>
                    {projectId}
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

      <Grid item xs={12}>
      <h2>Audit History</h2>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Reviewed By</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reviewed Section</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Action Item</TableCell>
                <TableCell>Project ID</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            {console.log(auditHistory)}
            <TableBody>
              {auditHistory.map((history) => (
                <TableRow key={history._id}>
                  <TableCell>{history.date.split("T")[0]}</TableCell>
                  <TableCell>{history.reviewedBy}</TableCell>
                  <TableCell>{history.status}</TableCell>
                  <TableCell>{history.reviewedSection}</TableCell>
                  <TableCell>{history.comments}</TableCell>
                  <TableCell>{history.actionItem}</TableCell>
                  <TableCell>{history.project_id}</TableCell>
                  <TableCell>
                    <Button color="primary" onClick={() => handleEdit(history._id)}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
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
      </Grid>

      <Dialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Audit History</DialogTitle>
        <DialogContent>
          {/* Form fields for editing existing audit history entry */}
          <TextField
            name="date"
            label="Date"
            type="date"
            value={editFormData.date}
            onChange={(e) =>
              setEditFormData({ ...editFormData, date: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="reviewedBy"
            label="Reviewed By"
            value={editFormData.reviewedBy}
            onChange={(e) =>
              setEditFormData({ ...editFormData, reviewedBy: e.target.value })
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
            name="reviewedSection"
            label="Reviewed Section"
            value={editFormData.reviewedSection}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                reviewedSection: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="comments"
            label="Comments"
            multiline
            rows={4}
            value={editFormData.comments}
            onChange={(e) =>
              setEditFormData({ ...editFormData, comments: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            name="actionItem"
            label="Action Item"
            value={editFormData.actionItem}
            onChange={(e) =>
              setEditFormData({ ...editFormData, actionItem: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="edit-project-id-label">Project ID</InputLabel>
            <Select
              labelId="edit-project-id-label"
              id="edit-project-id-select"
              value={editFormData.project_id}
              onChange={(e) =>
                setEditFormData({ ...editFormData, project_id: e.target.value })
              }
              name="project_id"
            >
              {projectIds.map((projectId) => (
                <MenuItem key={projectId} value={projectId}>
                  {projectId}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default AuditHistory;