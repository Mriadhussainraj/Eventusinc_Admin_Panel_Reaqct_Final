import React, { useState } from 'react';
import { Search, ChevronDown, Check, Eye, UserPlus, ArrowRight } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import './Dispatch.css';

const Dispatch = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [searchQuery, setSearchQuery] = useState('');

  const statuses = [
    'All Status',
    'Available',
    'Assigned',
    'In Transit',
    'Delivered',
    'Pending'
  ];

  const loads = [
    { id: 'LD-001', origin: 'Dallas, TX', dest: 'Denver, CO', rate: '$2,075', distance: '847 mi', equip: 'Dry Van', driver: 'Marcus', status: 'In Transit', driverInitial: 'M' },
    { id: 'LD-002', origin: 'Houston, TX', dest: 'Phoenix, AZ', rate: '$3,250', distance: '1170 mi', equip: 'Flatbed', driver: 'David', status: 'Assigned', driverInitial: 'D' },
    { id: 'LD-003', origin: 'Los Angeles, CA', dest: 'Salt Lake City, UT', rate: '$2,890', distance: '1133 mi', equip: 'Reefer', driver: null, status: 'Available' },
    { id: 'LD-004', origin: 'Chicago, IL', dest: 'Nashville, TN', rate: '$1,450', distance: '491 mi', equip: 'Dry Van', driver: null, status: 'Available' },
    { id: 'LD-005', origin: 'Atlanta, GA', dest: 'Miami, FL', rate: '$1,680', distance: '667 mi', equip: 'Flatbed', driver: null, status: 'Available' },
    { id: 'LD-006', origin: 'Memphis, TN', dest: 'St. Louis, MO', rate: '$950', distance: '306 mi', equip: 'Dry Van', driver: 'Marcus', status: 'Delivered', driverInitial: 'M' },
    { id: 'LD-007', origin: 'San Antonio, TX', dest: 'Oklahoma City, OK', rate: '$1,200', distance: '448 mi', equip: 'Reefer', driver: 'Carlos', status: 'Delivered', driverInitial: 'C' },
    { id: 'LD-008', origin: 'Seattle, WA', dest: 'Portland, OR', rate: '$580', distance: '176 mi', equip: 'Dry Van', driver: null, status: 'Pending' }
  ];

  const filteredLoads = loads.filter(load => {
    // Filter by status
    const matchesStatus = selectedStatus === 'All Status' || load.status === selectedStatus;
    
    // Filter by search query
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      load.id.toLowerCase().includes(query) ||
      load.origin.toLowerCase().includes(query) ||
      load.dest.toLowerCase().includes(query) ||
      (load.driver && load.driver.toLowerCase().includes(query));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="dispatch-page fade-in">
      <div className="page-header">
        <h2 className="dashboard-title">Dispatch Management</h2>
        <p className="dashboard-subtitle">Manage and assign loads to drivers</p>
      </div>

      <div className="dispatch-actions">
        <div className="search-container">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search loads..." 
            className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="status-dropdown-wrapper">
          <button 
            className="status-btn" 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedStatus} <ChevronDown size={16} />
          </button>
          
          {isDropdownOpen && (
            <div className="status-menu fade-in">
              {statuses.map(status => (
                <button 
                  key={status}
                  className={`status-menu-btn ${selectedStatus === status ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedStatus(status);
                    setIsDropdownOpen(false);
                  }}
                >
                  <Check size={16} className="check-icon" />
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="dispatch-table-container">
        <div className="dispatch-grid dispatch-header">
          <div>Load ID</div>
          <div>Route</div>
          <div>Rate</div>
          <div>Distance</div>
          <div>Equipment</div>
          <div>Driver</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        <div className="dispatch-rows">
          {filteredLoads.map((load, i) => (
            <div key={i} className="dispatch-grid dispatch-row">
              <div className="load-id">{load.id}</div>
              <div className="route-cell">
                <span className="route-origin">{load.origin}</span>
                <span className="route-destination">
                  <ArrowRight size={12} /> {load.dest}
                </span>
              </div>
              <div className="rate-cell">{load.rate}</div>
              <div className="text-gray distance-cell">{load.distance}</div>
              <div className="text-gray equipment-cell">{load.equip}</div>
              
              <div className="driver-cell">
                {load.driver ? (
                  <>
                    <div className="driver-avatar">{load.driverInitial}</div>
                    <span className="driver-name">{load.driver}</span>
                  </>
                ) : (
                  <span className="unassigned">Unassigned</span>
                )}
              </div>
              
              <div className="status-cell">
                <StatusBadge status={load.status}>{load.status}</StatusBadge>
              </div>
              
              <div className="actions-cell">
                {!load.driver && (
                  <button className="action-btn assign" title="Assign Driver">
                    <UserPlus size={16} />
                  </button>
                )}
                <button className="action-btn view" title="View Details">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dispatch;
