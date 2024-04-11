import React, { useState, useEffect, useContext } from "react";
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
  FormControl,
  InputLabel,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const AuditHistory = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, setLoading, error, role, refreshData } =
    useContext(DataContext);
  console.log(projects);
  const [auditHistory, setAuditHistory] = useState([]);
  // const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    dateOfAudit: "",
    reviewedBy: "",
    status: "",
    reviewedSection: "",
    commentQueries: "",
    actionItem: "",
  });
  const [editFormData, setEditFormData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [auditorList, setAuditorList] = useState([]);

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setAuditHistory(project.auditHistory);
        setAuditorList(project.stakeholders.Auditor);
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
      setLoading(true);
      const response = await axiosInstance.post(
        `http://localhost:8080/audithistory/${id}/add`,
        {
          dateOfAudit: formData.dateOfAudit,
          reviewedBy: formData.reviewedBy,
          status: formData.status,
          reviewedSection: formData.reviewedSection,
          commentQueries: formData.commentQueries,
          actionItem: formData.actionItem,
        }
      );

      setAuditHistory([...auditHistory, response.data]);
      setLoading(false);

      await refreshData();

      setFormData({
        dateOfAudit: "",
        reviewedBy: "",
        status: "",
        reviewedSection: "",
        commentQueries: "",
        actionItem: "",
      });
    } catch (error) {
      console.error("Error creating audit history:", error);
    }
  };

  const handleEdit = (history) => {
    setEditFormData(history);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const { _id, ...data } = editFormData;
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);
      setLoading(true);

      const response = await axiosInstance.put(
        `http://localhost:8080/audithistory/${id}/${_id}/edit`,
        data
      );
      if (response.status === 200) {
        const updatedHistory = auditHistory.map((history) =>
          history._id === _id ? response.data : history
        );
        setAuditHistory(updatedHistory);
        setLoading(false);

        await refreshData();

        setEditDialogOpen(false);
        console.log("Audits updated with _id:", _id);
      } else {
        console.error("Error updating Audits:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating audit history:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);
      setLoading(true);

      await axiosInstance.delete(`/audithistory/${id}/${_id}/delete`);
      setAuditHistory(auditHistory.filter((item) => item._id !== _id));
      setLoading(false);

      await refreshData();
    } catch (error) {
      console.error("Error deleting audit history:", error);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <Layout>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>
        {(role === "auditor" || role === "admin") && (
          <Grid item xs={8}>
            <h2>Add Audit</h2>
            <Paper sx={{ p: 2 }}>
              <form onSubmit={handleSubmit}>
                <InputLabel htmlFor="dateOfAudit">Date</InputLabel>
                <TextField
                  id="dateOfAudit"
                  required
                  name="dateOfAudit"
                  type="date"
                  value={formData.dateOfAudit}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="reviewedBy">Reviewed By</InputLabel>
                <Select
                  labelId="reviewedBy"
                  id="reviewedBy"
                  name="reviewedBy"
                  value={formData.reviewedBy}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  {auditorList.length > 0 ? (
                    auditorList.map((auditor) => (
                      <MenuItem key={auditor._id} value={auditor._id}>
                        {auditor.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">No Auditors available</MenuItem>
                  )}
                </Select>
                <InputLabel htmlFor="status">Status</InputLabel>
                <TextField
                  required
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="reviewedSection">
                  Reviewed Section
                </InputLabel>
                <TextField
                  required
                  name="reviewedSection"
                  value={formData.reviewedSection}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="commentQueries">Comments</InputLabel>
                <TextField
                  required
                  name="commentQueries"
                  multiline
                  rows={4}
                  value={formData.commentQueries}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <InputLabel htmlFor="actionItem">Action Items</InputLabel>
                <TextField
                  required
                  name="actionItem"
                  value={formData.actionItem}
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
          <h2>Audit History</h2>
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Reviewed By
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Reviewed Section
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Comments
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Action Item
                    </Typography>
                  </TableCell>
                  {(role === "auditor" || role === "admin") && (
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Edit
                      </Typography>
                    </TableCell>
                  )}
                  {(role === "auditor" || role === "admin") && (
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Delete
                      </Typography>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>

              {/* {console.log(auditHistory)} */}
              <TableBody>
                {auditHistory.map((history) => (
                  <TableRow key={history._id}>
                    <TableCell>{history.dateOfAudit?.split("T")[0]}</TableCell>
                    <TableCell>{history.reviewedBy?.name}</TableCell>
                    <TableCell>{history.status}</TableCell>
                    <TableCell>{history.reviewedSection}</TableCell>
                    <TableCell>{history.commentQueries}</TableCell>
                    <TableCell>{history.actionItem}</TableCell>

                    {(role === "auditor" || role === "admin") && (
                      <TableCell>
                        <Button
                          color="primary"
                          onClick={() => handleEdit(history)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    )}
                    {(role === "auditor" || role === "admin") && (
                      <TableCell>
                        <Button
                          color="error"
                          onClick={() => handleDelete(history._id)}
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
          <DialogTitle>Edit Audit History</DialogTitle>
          <DialogContent>
            <InputLabel htmlFor="dateOfAudit">Date</InputLabel>
            <TextField
              name="dateOfAudit"
              type="date"
              value={editFormData.dateOfAudit?.split("T")[0]}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  dateOfAudit: e.target.value,
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="reviewedBy">Reviewed By</InputLabel>
            <TextField
              name="reviewedBy"
              value={editFormData.reviewedBy?.name}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  reviewedBy: e.target.value,
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="status">Status</InputLabel>
            <TextField
              name="status"
              value={editFormData.status}
              onChange={(e) =>
                setEditFormData({ ...editFormData, status: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="reviewedSection">Reviewed Section</InputLabel>
            <TextField
              name="reviewedSection"
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
            <InputLabel htmlFor="commentQueries">Comments</InputLabel>
            <TextField
              name="commentQueries"
              multiline
              rows={4}
              value={editFormData.commentQueries}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  commentQueries: e.target.value,
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <InputLabel htmlFor="actionItem">Action Items</InputLabel>
            <TextField
              name="actionItem"
              label="Action Item"
              value={editFormData.actionItem}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  actionItem: e.target.value,
                })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handleSaveEdit}>Save</Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Layout>
  );
  // );
};

export default AuditHistory;
