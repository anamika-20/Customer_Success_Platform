import React, { useState } from "react";
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

const ApprovedTeams = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tables, setTables] = useState([]);

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

  const handleAddRow = (index) => {
    const newRow = {
      numberOfResources: "",
      role: "",
      availability: "",
      duration: "",
    };
    const updatedTables = [...tables];
    updatedTables[index].data.push(newRow);
    setTables(updatedTables);
  };

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
              <IconButton onClick={() => handleAddRow(index)}>
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ApprovedTeams;
