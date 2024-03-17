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
} from "@mui/material";
import {
  getAllStakeholders,
  createStakeholder,
  updateStakeholder,
  deleteStakeholder,
} from "../api/stakeHoldersAPI";
import Layout from "../Layout";

const StakeholdersComponent = () => {
  // State variables
  const [stakeholders, setStakeholders] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    contact: "",
  });
  const [editFormData, setEditFormData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Fetch stakeholders data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStakeholders();
        setStakeholders(data);
      } catch (error) {
        console.error("Error fetching stakeholders:", error);
      }
    };
    fetchData();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle edit button click
  const handleEdit = (id) => {
    const selectedStakeholder = stakeholders.find(
      (stakeholder) => stakeholder._id === id
    );
    setEditFormData(selectedStakeholder);
    setEditDialogOpen(true);
  };

  // Handle form submission for adding a new stakeholder
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newStakeholder = await createStakeholder(formData);
      setStakeholders([...stakeholders, newStakeholder]);
      setFormData({ title: "", name: "", contact: "" });
    } catch (error) {
      console.error("Error creating stakeholder:", error);
    }
  };

  // Handle form submission for updating an existing stakeholder
  const handleSaveEdit = async () => {
    try {
      await updateStakeholder(editFormData._id, editFormData);
      setEditDialogOpen(false);
      const updatedStakeholders = await getAllStakeholders();
      setStakeholders(updatedStakeholders);
    } catch (error) {
      console.error("Error updating stakeholder:", error);
    }
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await deleteStakeholder(id);
      setStakeholders(
        stakeholders.filter((stakeholder) => stakeholder._id !== id)
      );
    } catch (error) {
      console.error("Error deleting stakeholder:", error);
    }
  };

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2>Add StakeHolders</h2>
          <Paper sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                name="contact"
                label="Contact"
                value={formData.contact}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" type="submit">
                Add Stakeholder
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <h2>List of StakeHolders</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stakeholders.map((stakeholder) => (
                  <TableRow key={stakeholder._id}>
                    <TableCell>{stakeholder.title}</TableCell>
                    <TableCell>{stakeholder.name}</TableCell>
                    <TableCell>{stakeholder.contact}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(stakeholder._id)}>
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(stakeholder._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Stakeholder</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSaveEdit}>
            <TextField
              name="title"
              label="Title"
              value={editFormData.title}
              onChange={(e) =>
                setEditFormData({ ...editFormData, title: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="name"
              label="Name"
              value={editFormData.name}
              onChange={(e) =>
                setEditFormData({ ...editFormData, name: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              name="contact"
              label="Contact"
              value={editFormData.contact}
              onChange={(e) =>
                setEditFormData({ ...editFormData, contact: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
            />
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default StakeholdersComponent;
