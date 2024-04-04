import React, { useEffect, useState } from "react";
import Layout from "./Layout";
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
import { useAuth0 } from "@auth0/auth0-react";
import {
  fetchMoms,
  submitMom,
  editMom,
  deleteMom,
  fetchUserRole,
} from "../api/momsAPI";

const Moms = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  const [moms, setMoms] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    duration: "",
    momLink: "",
    comments: "",
  });
  const [editFormData, setEditFormData] = useState({
    _id: null,
    date: "",
    duration: "",
    momLink: "",
    comments: "",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (mom) => {
    setEditFormData(mom);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitMom(formData);
      setMoms([...moms, response]);
      console.log("MoM submitted:", response);
      setFormData({
        date: "",
        duration: "",
        momLink: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error submitting MoM:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await editMom(editFormData._id, editFormData);
      console.log("MoM edited:", editFormData);
      setEditDialogOpen(false);
      setMoms(
        moms.map((item) =>
          item._id === editFormData._id ? editFormData : item
        )
      );
    } catch (error) {
      console.error("Error editing MoM:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await deleteMom(_id);
      console.log("MoM deleted with _id:", _id);
      setMoms(moms.filter((mom) => mom._id !== _id));
    } catch (error) {
      console.error("Error deleting MoM:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMoms();
        setMoms(data);
      } catch (error) {
        console.error("Error fetching moms:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const role = await fetchUserRole(user?.email);
        if (role === "Does not Exists") setRole(null);
        else setRole(role);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    if (!isLoading) getUserRole();
  }, [isLoading, user]);

  return (
    <Layout>
      <h2>Minutes of Meeting</h2>
      {(role === "projectmanager" || role === "admin") && (
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
              <InputLabel htmlFor="date">Date</InputLabel>
              <TextField
                required={true}
                id="date"
                name="date"
                type="date"
                value={formData.date.split("T")[0]}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="duration">Duration</InputLabel>
              <TextField
                required={true}
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="momLink">MoM Link</InputLabel>
              <TextField
                required={true}
                id="momLink"
                name="momLink"
                value={formData.momLink}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <InputLabel htmlFor="comments">Comment</InputLabel>
              <TextField
              required={true}
                id="comments"
                name="comments"
                multiline
                rows={4}
                value={formData.comments}
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
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>MoM Link</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {moms.map((mom, index) => (
                <TableRow key={index}>
                  <TableCell>{mom.date.split("T")[0]}</TableCell>
                  <TableCell>{mom.duration}</TableCell>
                  <TableCell>{mom.momLink}</TableCell>
                  <TableCell>{mom.comments}</TableCell>
                  <TableCell>
                    <Button
                      disabled={role !== "admin"}
                      color="primary"
                      onClick={() => handleEdit(mom)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={role !== "admin"}
                      color="error"
                      onClick={() => handleDelete(mom._id)}
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
        <DialogTitle>Edit MoM</DialogTitle>
        <DialogContent>
          <InputLabel htmlFor="date">Date</InputLabel>
          <TextField
           required={true}
            id="date"
            name="date"
            type="date"
            value={editFormData.date.split("T")[0]}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                date: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <InputLabel htmlFor="duration">Duration</InputLabel>
          <TextField
           required={true}
            id="duration"
            name="duration"
            value={editFormData.duration}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                duration: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <InputLabel htmlFor="momLink">MoM Link</InputLabel>
          <TextField
           required={true}
            id="momLink"
            name="momLink"
            value={editFormData.momLink}
            onChange={(e) =>
              setEditFormData({
                ...editFormData,
                momLink: e.target.value,
              })
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          <InputLabel htmlFor="comments">Comment</InputLabel>
          <TextField
           required={true}
            id="comments"
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Moms;
