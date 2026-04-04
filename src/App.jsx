import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Dispatch from './pages/Dispatch';
import Fleet from './pages/Fleet';
import Owners from './pages/Owners';
import OwnerDetails from './pages/OwnerDetails';
import Drivers from './pages/Drivers';
import Applications from './pages/Applications';
import Compliance from './pages/Compliance';
import Roles from './pages/Roles';
import Settings from './pages/Settings';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <TopBar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dispatch" element={<Dispatch />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/owners" element={<Owners />} />
              <Route path="/owners/:id" element={<OwnerDetails />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/events" element={<div className="fade-in"><h2>Events Page</h2><p>Coming soon...</p></div>} />
              <Route path="/users" element={<div className="fade-in"><h2>Users Page</h2><p>Coming soon...</p></div>} />
              <Route path="/analytics" element={<div className="fade-in"><h2>Analytics Page</h2><p>Coming soon...</p></div>} />
              <Route path="/settings" element={<div className="fade-in"><h2>Settings Page</h2><p>Coming soon...</p></div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
