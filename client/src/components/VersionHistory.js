import React, { useState, useEffect, useContext } from "react";
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

import Layout from "./Layout";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const VersionHistory = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role } = useContext(DataContext);
  console.log(projects);
  const [versionHistory, setVersionHistory] = useState([]);
  const [pmList, setPmList] = useState([]);
  const [auditorList, setAuditorList] = useState([]);

  const [formData, setFormData] = useState({
    type: "",
    change: "",
    changeReason: "",
    createdBy: "",
    revisionDate: "",
    approvalDate: "",
    approvedBy: "",
  });
  const [editFormData, setEditFormData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setVersionHistory(project.versionHistory);
        setPmList(project.stakeholders.PM);
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

  // Handle functions for CRUD operations
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.post(
        `http://localhost:8080/versionhistory/${id}/add`,
        {
          type: formData.type,
          change: formData.change,
          changeReason: formData.changeReason,
          createdBy: formData.createdBy,
          revisionDate: formData.revisionDate,
          approvalDate: formData.approvalDate,
          approvedBy: formData.approvedBy,
        }
      );

      setVersionHistory([...versionHistory, response.data]);
      setFormData({
        type: "",
        change: "",
        changeReason: "",
        createdBy: "",
        revisionDate: "",
        approvalDate: "",
        approvedBy: "",
      });
    } catch (error) {
      console.error("Error creating version history:", error);
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

      const response = await axiosInstance.put(
        `http://localhost:8080/versionhistory/${id}/${_id}/edit`,
        data
      );

      if (response.status === 200) {
        const updatedVersionHistory = versionHistory.map((history) =>
          history._id === _id ? response.data : history
        );
        setVersionHistory(updatedVersionHistory);
        setEditDialogOpen(false);
        console.log("Version updated with _id:", _id);
      } else {
        console.error("Error updating Version:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating version history:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      await axiosInstance.delete(
        `http://localhost:8080/versionhistory/${id}/${_id}/delete`
      );
      setVersionHistory(
        versionHistory.filter((resource) => resource._id !== _id)
      );
      console.log("version deleted with _id:", _id);
    } catch (error) {
      console.error("Error deleting version history:", error);
    }
  };

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>
        <Grid container item justifyContent="center" spacing={4}>
          {(role === "audit" ||
            role === "admin" ||
            role === "projectmanager") && (
            <Grid item xs={8}>
              <h2>Add Version</h2>
              <Paper sx={{ p: 2 }}>
                <form onSubmit={handleSubmit}>
                  <InputLabel id="createdBy-label">Created By</InputLabel>
                  <Select
                    labelId="createdBy-label"
                    id="createdBy"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    {pmList.length > 0 ? (
                      pmList.map((pm) => (
                        <MenuItem key={pm._id} value={pm._id}>
                          {pm.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No PMs available</MenuItem>
                    )}
                  </Select>
                  <InputLabel id="type">Type</InputLabel>
                  <TextField
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel id="change">Change</InputLabel>
                  <TextField
                    name="change"
                    value={formData.change}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel id="changeReason">Change Reason</InputLabel>
                  <TextField
                    name="changeReason"
                    value={formData.changeReason}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel id="revisionDate">Revision Date </InputLabel>
                  <TextField
                    name="revisionDate"
                    type="date"
                    value={formData.revisionDate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel id="approvalDate">Approval Date </InputLabel>
                  <TextField
                    name="approvalDate"
                    type="date"
                    value={formData.approvalDate}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel id="approvedBy-label">Approved By</InputLabel>
                  <Select
                    id="approvedBy-label"
                    name="approvedBy"
                    value={formData.approvedBy}
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
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </form>
              </Paper>
            </Grid>
          )}

          <Grid item xs={12}>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <h2>Version History</h2>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Type
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Change
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Change Reason
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Created By
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Revision Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Approval Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Approved By
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
                  {versionHistory.map((history) => (
                    <TableRow key={history._id}>
                      <TableCell>{history.version?.type}</TableCell>
                      <TableCell>{history.version?.change}</TableCell>
                      <TableCell>{history.version?.changeReason}</TableCell>
                      <TableCell>{history.version?.createdBy?.name}</TableCell>
                      <TableCell>
                        {history.version?.revisionDate?.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        {history.version?.approvalDate?.split("T")[0]}
                      </TableCell>
                      <TableCell>{history.version?.approvedBy?.name}</TableCell>
                      {(role === "auditor" ||
                        role === "admin" ||
                        role === "projectmanager") && (
                        <TableCell>
                          <Button
                            color="primary"
                            onClick={() => handleEdit(history.version)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      )}
                      {(role === "auditor" ||
                        role === "admin" ||
                        role === "projectmanager") && (
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

            <Dialog
              open={editDialogOpen}
              onClose={handleCloseEditDialog}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>Edit Version History</DialogTitle>
              <DialogContent>
                <form onSubmit={handleSaveEdit}>
                  <InputLabel id="type">Type</InputLabel>
                  <TextField
                    name="type"
                    value={editFormData.type}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, type: e.target.value })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <InputLabel id="change">Change</InputLabel>
                  <TextField
                    name="change"
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
                  <InputLabel id="changeReason">Change Reason</InputLabel>
                  <TextField
                    name="changeReason"
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

                  <InputLabel id="createdBy-label">Created By</InputLabel>
                  <Select
                    labelId="createdBy-label"
                    id="createdBy"
                    name="createdBy"
                    value={editFormData.createdBy}
                    // onChange={handleChange}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        createdBy: e.target.value,
                      })
                    }
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    {pmList.length > 0 ? (
                      pmList.map((pm) => (
                        <MenuItem key={pm._id} value={pm._id}>
                          {pm.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No PMs available</MenuItem>
                    )}
                  </Select>

                  <InputLabel id="revisionDate">Revision Date </InputLabel>
                  <TextField
                    name="revisionDate"
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
                  <InputLabel id="approvalDate">Approval Date </InputLabel>
                  <TextField
                    name="approvalDate"
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
                  <InputLabel id="approvedBy-label">Approved By</InputLabel>
                  <Select
                    labelId="approvedBy-label"
                    id="approvedBy"
                    name="approvedBy"
                    value={editFormData.approvedBy}
                    // onChange={handleChange}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        approvedBy: e.target.value,
                      })
                    }
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
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEditDialog}>Cancel</Button>
                <Button onClick={handleSaveEdit}>Save</Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default VersionHistory;
