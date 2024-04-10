import React, { useContext, useEffect, useState } from "react";
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
  Typography,
  DialogActions,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import axiosInstance, { setAuthHeader } from "../axiosConfig";
import HorizontalList from "./HorizontalList";

const Moms = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { id } = useParams();

  const { projects, loading, error, role } = useContext(DataContext);
  console.log(projects);
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

  useEffect(() => {
    if (id && projects) {
      const project = projects.find((project) => project._id === id);
      if (project) {
        setMoms(project.moms);
      }
    }
  }, [id, projects]);

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
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.post(
        `http://localhost:8080/moms/${id}/add`,
        {
          date: formData.date,
          duration: formData.duration,
          momLink: formData.momLink,
          comments: formData.comments,
        }
      );

      setMoms([...moms, response.data]);
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

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    const { _id, ...data } = editFormData;

    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      const response = await axiosInstance.put(
        `http://localhost:8080/moms/${id}/${_id}/edit`,
        data
      );

      if (response.status === 200) {
        const updatedMoms = moms.map((item) =>
          item._id === editFormData._id ? editFormData : item
        );
        setMoms(updatedMoms);
        setEditDialogOpen(false);
        console.log("MOMS updated with _id:", _id);
      } else {
        console.error("Error updating MOMS:", response.data.message);
      }
    } catch (error) {
      console.error("Error editing MoM:", error);
    }
  };

  const handleDelete = async (_id) => {
    try {
      const token = await getAccessTokenSilently();
      setAuthHeader(token);

      await axiosInstance.delete(
        `http://localhost:8080/moms/${id}/${_id}/delete`
      );
      setMoms(moms.filter((mom) => mom._id !== _id));
      console.log("MOMs deleted with _id:", _id);
    } catch (error) {
      console.error("Error deleting MoM:", error);
    }
  };

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          <HorizontalList />
        </Grid>
        <Grid container item justifyContent="center" spacing={4}>
          {(role === "projectmanager" || role === "admin") && (
            <Grid item xs={8}>
              <Paper sx={{ p: 2, mt: 4 }}>
                <h2>Add Minutes of Meeting</h2>
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
              <h2>Minutes of Meeting</h2>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Duration
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        MoM Link
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Comment
                      </Typography>
                    </TableCell>
                    {role === "admin" && (
                      <>
                        <TableCell>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Edit
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Delete
                          </Typography>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {moms.map((mom, index) => (
                    <TableRow key={index}>
                      <TableCell>{mom?.date?.split("T")[0]}</TableCell>
                      <TableCell>{mom?.duration}</TableCell>
                      <TableCell>{mom?.momLink}</TableCell>
                      <TableCell>{mom?.comments}</TableCell>
                      {role === "admin" && (
                        <TableCell>
                          <Button
                            color="primary"
                            onClick={() => handleEdit(mom)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      )}
                      {role === "admin" && (
                        <TableCell>
                          <Button
                            color="error"
                            onClick={() => handleDelete(mom._id)}
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
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Moms;
