import Dashboard from './pages/Dashboard';
import ApprovedTeams from './pages/ApprovedTeams';
import Resources from './pages/Resources';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientFeedback from './pages/ClientFeedback';
import Moms from './pages/Moms';
import ProjectUpdates from './pages/ProjectUpdates';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/approvedteams" element={<ApprovedTeams />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/clientfeedback" element={<ClientFeedback />} />
        <Route path="/moms" element={<Moms />} />
        <Route path="/projectupdates" element={<ProjectUpdates />} />
      </Routes>
    </Router>
  );
}

export default App;