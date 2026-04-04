import React, { useState } from 'react';
import { 
  CheckCircle, AlertCircle, AlertTriangle, 
  Search, Download, Filter, 
  User, ShieldCheck, Clock, FileWarning
} from 'lucide-react';
import './Compliance.css';

const initialComplianceData = [
  { id: 'DRV-001', init: 'MJ', name: 'Marcus Johnson', cdl: 'Success', ins: 'Warning', med: 'Success', drug: 'Success', overall: 'Warning' },
  { id: 'DRV-002', init: 'DK', name: 'David Kim', cdl: 'Success', ins: 'Success', med: 'Success', drug: 'Success', overall: 'Compliant' },
  { id: 'DRV-003', init: 'CR', name: 'Carlos Rivera', cdl: 'Success', ins: 'Success', med: 'Warning', drug: 'Success', overall: 'Warning' },
  { id: 'DRV-004', init: 'JW', name: 'James Wilson', cdl: 'Danger', ins: 'Success', med: 'Success', drug: 'Danger', overall: 'Non-Compliant' },
  { id: 'DRV-005', init: 'AT', name: 'Alex Thompson', cdl: 'Success', ins: 'Success', med: 'Success', drug: 'Success', overall: 'Compliant' }
];

const Compliance = () => {
  const [data, setData] = useState(initialComplianceData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || item.overall === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getDotClass = (status) => {
    if (status === 'Success') return 'dot-success';
    if (status === 'Warning') return 'dot-warning';
    return 'dot-danger';
  };

  const getPillClass = (status) => {
    if (status === 'Compliant') return 'pill-compliant';
    if (status === 'Warning') return 'pill-warning';
    return 'pill-danger';
  };

  return (
    <div className="compliance-page fade-in">
      <div className="compliance-header">
        <div className="compliance-title-group">
          <h2 className="compliance-title">Compliance Monitoring</h2>
          <p className="compliance-subtitle">Track driver and fleet compliance status</p>
        </div>
        <button className="btn-export">
          <Download size={18} /> Export Report
        </button>
      </div>

      <div className="compliance-stats-grid">
        <div className="comp-stat-card">
          <div className="comp-stat-icon-box comp-icon-success">
            <ShieldCheck size={24} />
          </div>
          <div className="comp-stat-text-box">
            <span className="comp-stat-val">2</span>
            <span className="comp-stat-label">Fully Compliant</span>
          </div>
        </div>
        <div className="comp-stat-card">
          <div className="comp-stat-icon-box comp-icon-warning">
            <Clock size={24} />
          </div>
          <div className="comp-stat-text-box">
            <span className="comp-stat-val">2</span>
            <span className="comp-stat-label">Warnings</span>
          </div>
        </div>
        <div className="comp-stat-card">
          <div className="comp-stat-icon-box comp-icon-danger">
            <FileWarning size={24} />
          </div>
          <div className="comp-stat-text-box">
            <span className="comp-stat-val">1</span>
            <span className="comp-stat-label">Non-Compliant</span>
          </div>
        </div>
      </div>

      <div className="compliance-filters">
        <div className="comp-search-box">
          <Search size={18} color="#94A3B8" />
          <input 
            type="text" 
            placeholder="Search drivers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="comp-filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Status</option>
          <option>Compliant</option>
          <option>Warning</option>
          <option>Non-Compliant</option>
        </select>
      </div>

      <div className="compliance-table-wrapper">
        <div className="comp-grid comp-header">
          <div>Driver</div>
          <div style={{ textAlign: 'center' }}>CDL</div>
          <div style={{ textAlign: 'center' }}>Insurance</div>
          <div style={{ textAlign: 'center' }}>Medical</div>
          <div style={{ textAlign: 'center' }}>Drug Test</div>
          <div style={{ textAlign: 'center' }}>Overall</div>
        </div>
        
        <div className="comp-rows">
          {filteredData.map((row, i) => (
            <div key={i} className="comp-grid comp-row">
              <div className="comp-driver-info">
                <div className="comp-avatar">{row.init}</div>
                <div className="comp-name-box">
                  <span className="comp-name">{row.name}</span>
                  <span className="comp-id">{row.id}</span>
                </div>
              </div>
              
              <div className="status-dot-cell">
                <div className={`compliance-dot ${getDotClass(row.cdl)}`}></div>
              </div>
              <div className="status-dot-cell">
                <div className={`compliance-dot ${getDotClass(row.ins)}`}></div>
              </div>
              <div className="status-dot-cell">
                <div className={`compliance-dot ${getDotClass(row.med)}`}></div>
              </div>
              <div className="status-dot-cell">
                <div className={`compliance-dot ${getDotClass(row.drug)}`}></div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={`status-pill ${getPillClass(row.overall)}`}>
                  {row.overall}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compliance;
