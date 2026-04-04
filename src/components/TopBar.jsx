import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import './TopBar.css';

const TopBar = () => {
  return (
    <header className="topbar">
      <div className="header-info">
        <h1 className="header-title">Admin Portal</h1>
        <p className="header-subtitle">Manage system operations</p>
      </div>

      <div className="user-actions">
        <button className="action-btn">
          <Bell size={20} />
          <span className="badge red">5</span>
        </button>
        
        <div className="user-profile">
          <div className="avatar-circle">A</div>
          <ChevronDown size={14} className="text-light" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
