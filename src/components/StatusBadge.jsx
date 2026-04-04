import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status, children }) => {
  const statusClass = status.toLowerCase().replace(/\s+/g, '-');
  return (
    <span className={`status-badge ${statusClass}`}>
      {children || status}
    </span>
  );
};

export default StatusBadge;
