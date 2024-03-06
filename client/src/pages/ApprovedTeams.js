import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import {
  TextField,
  Button,
  FormControl,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

const ApprovedTeams = () => {
  const [teams, setTeams] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openRowData,setOpenRowData]=useState(false);
  const [tableName, setTableName] = useState("");
  const [tables, setTables] = useState([]);
  const [rowData, setRowData] = useState({
    numberOfResources: "",
    role: "",
    availability: "",
    duration: ""
  });
  const [selectedTableIndex, setSelectedTableIndex] = useState(null);


  const handleChange = (event) => {
    setTableName(event.target.value);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCreateTable = () => {
    if (tableName.trim() !== "") {
      setTables([...tables, { name: tableName, data: [] }]);
      setTableName(""); // Reset table name input field
      setOpenModal(false);
    }
  };
  
  const handleChangeRow = (event, field) => {
    const { value } = event.target;
    setRowData(prevRowData => ({
      ...prevRowData,
      [field]: value
    }));
  };
  
  const handleRowOpenModal = (index) => {
    setSelectedTableIndex(index); // Update selectedTableIndex
    setOpenRowData(true);
  };

  const handleRowCloseModal = () => {
    setOpenRowData(false);
  };
  const handleSelectTable = (index) => {
    setSelectedTableIndex(index);
  };

  const handleCreateRow = () => {
    if (
      rowData.numberOfResources.trim() !== "" &&
      rowData.role.trim() !== "" &&
      rowData.availability.trim() !== "" &&
      rowData.duration.trim() !== ""
    ) {
      // Check if selectedTableIndex is valid
      if (
        selectedTableIndex !== null &&
        selectedTableIndex !== undefined &&
        selectedTableIndex >= 0 &&
        selectedTableIndex < tables.length
      ) {
        const updatedTables = [...tables];
        updatedTables[selectedTableIndex].data.push(rowData);
        setTables(updatedTables);
        setRowData({
          numberOfResources: "",
          role: "",
          availability: "",
          duration: ""
        });
        setOpenRowData(false);
      } else {
        console.error("Invalid selectedTableIndex:", selectedTableIndex);
      }
    }
  };
  
  
  // Function to fetch all moms
  const fetchTeams = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/approvedteams"); // Make a GET request to fetch all moms
      setTeams(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching moms:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);



  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={10} sx={{marginLeft : 5}} >
          
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
              {tables.length === 0 ? (
                <h1>No teams</h1>
              ) : (
                <h1>Teams</h1>
              )}
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleOpenModal}>
              Add Team
            </Button>
          </Grid>
        </Grid>

          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Create Table</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <TextField
                  label="Table Name"
                  value={tableName}
                  onChange={handleChange}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button
                onClick={handleCreateTable}
                color="primary"
                variant="contained"
              >
                Create Table
              </Button>
            </DialogActions>
          </Dialog>

          {tables.map((table, index) => (
            <div key={index}>
              <h3>{table.name}</h3>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No. Of Resources</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Availability %</TableCell>
                    <TableCell>Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.data.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      <TableCell>{row.numberOfResources}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell>{row.availability}</TableCell>
                      <TableCell>{row.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <IconButton onClick={() => handleRowOpenModal(index)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
              <Dialog open={openRowData} onClose={handleRowCloseModal}>
                <DialogTitle>Enter Data</DialogTitle>
                <DialogContent>
                  <FormControl fullWidth>
                    <TextField
                      label="Number of Resources"
                      value={rowData.numberOfResources}
                      onChange={(event) => handleChangeRow(event, "numberOfResources")}
                    />
                    <TextField
                      label="Role"
                      value={rowData.role}
                      onChange={(event) => handleChangeRow(event, "role")}
                    />
                    <TextField
                      label="Availability %"
                      value={rowData.availability}
                      onChange={(event) => handleChangeRow(event, "availability")}
                    />
                    <TextField
                      label="Duration"
                      value={rowData.duration}
                      onChange={(event) => handleChangeRow(event, "duration")}
                    />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleRowCloseModal}>Cancel</Button>
                  <Button
                    onClick={handleCreateRow}
                    color="primary"
                    variant="contained"
                  >
                    Create Table
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ))}
        </Grid>
        <Grid item xs={10} sx={{marginLeft : 5}} >
          <div style={{ borderTop: "1px solid #ccc", paddingTop: "20px" }}>
            {teams.map((team, index) => (
              <div key={index}>
                <h2>Phase Number: {team.PhaseNumber}</h2>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No. Of Resources</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Availability %</TableCell>
                      <TableCell>Duration</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {team.teamResources.map((resource, resourceIndex) => (
                      <TableRow key={resourceIndex}>
                        <TableCell>{resource.numberOfResources}</TableCell>
                        <TableCell>{resource.role}</TableCell>
                        <TableCell>{resource.availability}</TableCell>
                        <TableCell>{resource.duration}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
};


export default ApprovedTeams;
