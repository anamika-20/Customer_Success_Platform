import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PeopleIcon from '@mui/icons-material/People';
import SystemSecurityUpdateGoodIcon from '@mui/icons-material/SystemSecurityUpdateGood';
import LayersIcon from '@mui/icons-material/Layers';
import { useNavigate } from "react-router-dom";;

const Lists = () => {

    const navigate = useNavigate();


  return(
  <>
    <ListItemButton onClick={() => navigate('/')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton onClick={() => navigate('/projectupdates')}>
      <ListItemIcon>
        <SystemSecurityUpdateGoodIcon />
      </ListItemIcon>
      <ListItemText primary="Project Updates" />
    </ListItemButton>

    <ListItemButton onClick={() => navigate('/approvedteams')}>
      <ListItemIcon>
        <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Approved Teams" />
    </ListItemButton>

    <ListItemButton onClick={() => navigate('/resources')}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Resources" />
    </ListItemButton>

    <ListItemButton onClick={() => navigate('/clientfeedback')}>
      <ListItemIcon>
        <FeedbackIcon />
      </ListItemIcon>
      <ListItemText primary="Client Feedback" />
    </ListItemButton>

    <ListItemButton onClick={() => navigate('/moms')}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Minutes of Meetings" />
    </ListItemButton>
  </>
);
}
export default Lists;
