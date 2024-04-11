import * as React from "react";
import { useContext } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";

const Lists = () => {
  const navigate = useNavigate();
  const { role } = useContext(DataContext);

  return (
    <>
      <ListItemButton onClick={() => navigate("/")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("/project")}>
        <ListItemIcon>
          <FileOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
      </ListItemButton>

      {role === "admin" && (
        <ListItemButton onClick={() => navigate("/adduser")}>
          <ListItemIcon>
            <PersonAddAltIcon />
          </ListItemIcon>
          <ListItemText primary="Add User" />
        </ListItemButton>
      )}
    </>
  );
};
export default Lists;
