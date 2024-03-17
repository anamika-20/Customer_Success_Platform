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
} from "@mui/material";
import {
  getAllProjectBudget,
  createProjectBudget,
  updateProjectBudget,
  deleteProjectBudget,
} from "../api/projectBudgetAPI";
import Layout from "../Layout";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const ProjectBudget = () => {
  const { user, isLoading } = useAuth0();
  const [role, setRole] = useState(null);
  const [projectBudget, setProjectBudget] = useState([]);
  const [formData, setFormData] = useState({
    projectType: "",
    duration: "",
    budgetedHours: "",
  });
  const [editFormData, setEditFormData] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null); // For tracking the item being edited

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProjectBudget();
        setProjectBudget(data);
      } catch (error) {
        console.error("Error fetching project budget:", error);
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
      const newBudget = await createProjectBudget(formData);
      setProjectBudget([...projectBudget, newBudget]);
      setFormData({
        projectType: "",
        duration: "",
        budgetedHours: "",
      });
    } catch (error) {
      console.error("Error creating project budget:", error);
    }
  };

  const handleEdit = (id) => {
    const budgetToEdit = projectBudget.find((budget) => budget._id === id);
    setEditItemId(id);
    setEditFormData({
      projectType: budgetToEdit.projectType,
      duration: budgetToEdit.duration,
      budgetedHours: budgetToEdit.budgetedHours,
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateProjectBudget(editItemId, editFormData);
      const updatedBudgets = projectBudget.map((budget) => {
        if (budget._id === editItemId) {
          return {
            ...budget,
            projectType: editFormData.projectType,
            duration: editFormData.duration,
            budgetedHours: editFormData.budgetedHours,
          };
        }
        return budget;
      });
      setProjectBudget(updatedBudgets);
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating project budget:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProjectBudget(id);
      setProjectBudget(projectBudget.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting version history:", error);
    }
  };

  // Add event handler for delete operation

  return (
    !isLoading && (
      <Layout>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          xs={10}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        >
          {(role === "projectmanager" || role === "admin") && (
            <Grid item xs={10}>
              <h2>Project Budget</h2>
              <Paper sx={{ p: 2 }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="projectType"
                    label="Project Type"
                    value={formData.projectType}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="duration"
                    label="Duration"
                    value={formData.duration}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="budgetedHours"
                    label="Budgeted Hours"
                    value={formData.budgetedHours}
                    onChange={handleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" type="submit">
                    Add Budget
                  </Button>
                </form>
              </Paper>
            </Grid>
          )}

          <Grid item xs={12}>
            <h2>Budgets</h2>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project Type</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Budgeted Hours</TableCell>
                    <TableCell>Project ID</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectBudget.map((budget) => (
                    <TableRow key={budget._id}>
                      <TableCell>{budget.projectType}</TableCell>
                      <TableCell>{budget.duration}</TableCell>
                      <TableCell>{budget.budgetedHours}</TableCell>
                      <TableCell>{budget.project_id}</TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            role !== "projectmanager" && role !== "admin"
                          }
                          color="primary"
                          onClick={() => handleEdit(budget._id)}
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
                          onClick={() => handleDelete(budget._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                      {/* Add other table cells as needed */}
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
            <DialogTitle>Edit Project Budget</DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  name="projectType"
                  label="Project Type"
                  value={editFormData.projectType}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      projectType: e.target.value,
                    })
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="duration"
                  label="Duration"
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
                <TextField
                  name="budgetedHours"
                  label="Budgeted Hours"
                  value={editFormData.budgetedHours}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      budgetedHours: e.target.value,
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

export default ProjectBudget;
