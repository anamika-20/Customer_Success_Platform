import * as React from "react";
import { useState, useContext } from "react";
import { Breadcrumbs, Card, Grid } from "@mui/material";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HomeIcon from "@mui/icons-material/Home";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import UpdateIcon from "@mui/icons-material/Update";
import SourceIcon from "@mui/icons-material/Source";
import FeedbackIcon from "@mui/icons-material/Feedback";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import HistoryIcon from "@mui/icons-material/History";
import SpeedIcon from "@mui/icons-material/Speed";
import ReportIcon from "@mui/icons-material/Report";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import TimelineIcon from "@mui/icons-material/Timeline";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../DataContext";

const HorizontalList = () => {
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects, loading, error } = useContext(DataContext);

  const items = [
    {
      name: "Audits",
      icon: <VerifiedUserIcon />,
      route: `/project/${id}/audithistory`,
    },
    {
      name: "Approved teams",
      icon: <HomeIcon />,
      route: `/project/${id}/approvedteams`,
    },
    {
      name: "Tech Stack",
      icon: <ListAltIcon />,
      route: `/project/${id}/techstack`,
    },
    {
      name: "Project Updates",
      icon: <UpdateIcon />,
      route: `/project/${id}/projectupdates`,
    },
    {
      name: "Resources",
      icon: <SourceIcon />,
      route: `/project/${id}/resources`,
    },
    {
      name: "Client Feedback",
      icon: <FeedbackIcon />,
      route: `/project/${id}/clientfeedback`,
    },
    {
      name: "Minutes of Meetings",
      icon: <MeetingRoomIcon />,
      route: `/project/${id}/moms`,
    },
    {
      name: "Versions",
      icon: <HistoryIcon />,
      route: `/project/${id}/versionhistory`,
    },
    {
      name: "Sprint Details",
      icon: <SpeedIcon />,
      route: `/project/${id}/sprintdetail`,
    },
    {
      name: "Risk Profiles",
      icon: <ReportIcon />,
      route: `/project/${id}/risk`,
    },
    {
      name: "Escalation Matrices",
      icon: <SignalCellularAltIcon />,
      route: `/project/${id}/escalationmatrices`,
    },
    { name: "Phases", icon: <TimelineIcon />, route: `/project/${id}/phases` },
  ];

  const handleForward = () => {
    if (startIndex < items.length - 5) {
      setStartIndex((prevIndex) => prevIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const handleBackward = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    } else {
      setStartIndex(items.length - 5);
    }
  };

  const handleItemClick = (index) => {
    navigate(items[startIndex + index].route);
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Grid container justifyContent="center">
        <Card
          sx={{
            background: "white",
            p: 2.5,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <ArrowBackIcon onClick={handleBackward} />
            {items.slice(startIndex, startIndex + 5).map((item, index) => (
              <Link
                key={index}
                underline="none"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "#2c3e50", // Darker color
                  margin: "0 15px",
                  cursor: "pointer",
                }}
                onClick={() => handleItemClick(index)}
              >
                {item.icon}
                &nbsp;{item.name}&nbsp;
              </Link>
            ))}
            <ArrowForwardIcon onClick={handleForward} />
          </Breadcrumbs>
        </Card>
      </Grid>
    </div>
  );
};

export default HorizontalList;
