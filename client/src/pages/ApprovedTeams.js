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
      setTableName(response.data); // Update state with the fetched moms
      setRowData(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching moms:", error);
    }
  };

  // Fetch moms when the component mounts
  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <Layout>
      <div>
        <h1>Approved Teams</h1>
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add Approved Team
        </Button>

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
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddRow(index)}
            >
              Add Row
            </Button> */}
            {/* <AddCircleOutlineIcon
              color="primary"
              onClick={() => handleAddRow(index)}
            /> */}
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
      </div>
    </Layout>
  );
};

export default ApprovedTeams;
