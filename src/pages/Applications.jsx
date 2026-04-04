import React, { useState, useMemo } from 'react';
import { 
  Search, CheckCircle2, AlertCircle, AlertTriangle,
  MapPin, Mail, Phone, Calendar, User, 
  Briefcase, Truck, FileCheck, RotateCcw,
  UserCheck, FileText, Download
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import './Applications.css';

const initialApplications = [
  {
    id: 1, init: 'JP', cls: 'jp', name: 'James Patterson', status: 'Pending Review', type: 'Owner Operator', company: 'Patterson Freight Solutions', 
    date: '2024-02-15', loc: 'Denver, CO', email: 'james.p@newfleet.com', phone: '+1 (555) 123-4567',
    exp: '8 years', drivers: 4, trucks: 4, cdl: 'CDL-CO-8765432',
    docs: [
      { name: 'Cdl', verified: true },
      { name: 'Insurance', verified: true },
      { name: 'Business License', verified: true },
      { name: 'Vehicle Registration', verified: true },
      { name: 'W9', verified: true }
    ],
    notes: 'Highly experienced operator with clean record.'
  },
  {
    id: 2, init: 'LA', cls: 'la', name: 'Lisa Anderson', status: 'Pending Documents', type: 'Owner Operator', company: 'QuickHaul Express', 
    date: '2024-02-14', loc: 'Miami, FL', email: 'landerson@quickhaul.net', phone: '+1 (555) 234-5678',
    exp: '5 years', drivers: 2, trucks: 2, cdl: 'CDL-FL-5432109',
    docs: [
      { name: 'Cdl', verified: true },
      { name: 'Insurance', verified: true },
      { name: 'Business License', verified: false },
      { name: 'Vehicle Registration', verified: true },
      { name: 'W9', verified: false }
    ],
    notes: 'Missing business license and W9 form.'
  },
  {
    id: 3, init: 'MJ', cls: 'mj', name: 'Marcus Johnson', status: 'Pending Review', type: 'Driver', company: 'Reliable Roads Inc', 
    date: '2024-02-16', loc: 'Seattle, WA', email: 'mjohnson@reliableroads.com', phone: '+1 (555) 345-6789',
    exp: '12 years', drivers: null, trucks: null, cdl: 'CDL-WA-3456789',
    docs: [
      { name: 'Cdl', verified: true },
      { name: 'Insurance', verified: false },
      { name: 'Business License', verified: false },
      { name: 'Vehicle Registration', verified: false },
      { name: 'W9', verified: true }
    ],
    notes: 'Experienced driver looking for owner operator partnership.'
  },
  {
    id: 4, init: 'RF', cls: 'rf', name: 'Rachel Foster', status: 'Approved', type: 'Owner Operator', company: 'Prime Logistics Group', 
    date: '2024-02-12', loc: 'Nashville, TN', email: 'rfoster@primelogistics.com', phone: '+1 (555) 456-7890',
    exp: '10 years', drivers: 6, trucks: 6, cdl: 'CDL-TN-6789012',
    docs: [
      { name: 'Cdl', verified: true },
      { name: 'Insurance', verified: true },
      { name: 'Business License', verified: true },
      { name: 'Vehicle Registration', verified: true },
      { name: 'W9', verified: true }
    ],
    notes: 'Approved - excellent credentials and references.'
  },
  {
    id: 5, init: 'KM', cls: 'km', name: 'Kevin Martinez', status: 'Rejected', type: 'Owner Operator', company: 'Star Transport LLC', 
    date: '2024-02-08', loc: 'San Antonio, TX', email: 'kmartinez@startransport.com', phone: '+1 (555) 567-8901',
    exp: '4 years', drivers: 3, trucks: 3, cdl: 'CDL-TX-7890123',
    docs: [
      { name: 'Cdl', verified: true },
      { name: 'Insurance', verified: false },
      { name: 'Business License', verified: true },
      { name: 'Vehicle Registration', verified: true },
      { name: 'W9', verified: true }
    ],
    notes: 'Insurance documentation did not meet requirements.',
    rejectionReason: 'Incomplete Insurance documentation'
  }
];

const Applications = () => {
  const [apps, setApps] = useState(initialApplications);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');

  const updateStatus = (id, newStatus) => {
    setApps(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus, rejectionReason: newStatus === 'Rejected' ? 'Manually Rejected' : undefined } : app
    ));
  };

  const stats = useMemo(() => ({
    total: apps.length,
    pendingReview: apps.filter(a => a.status === 'Pending Review').length,
    pendingDocs: apps.filter(a => a.status === 'Pending Documents').length,
    approved: apps.filter(a => a.status === 'Approved').length
  }), [apps]);

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || app.status === statusFilter;
    const matchesType = typeFilter === 'All Types' || app.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="applications-page fade-in">
      <div className="applications-header">
        <h2 className="applications-title">Onboarding Applications</h2>
        <p className="applications-subtitle">Review and approve new owner operator and driver applications</p>
      </div>

      {/* Alert Banner */}
      <div className="alert-banner">
        <div className="alert-icon-box"><AlertTriangle size={22} /></div>
        <div className="alert-content">
          <span className="alert-title">{stats.pendingReview} applications pending review</span>
          <span className="alert-text">Please review and take action on pending applications to keep the onboarding process moving.</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="applications-stats-grid">
        <div className="app-stat-card">
          <div className="app-stat-info">
            <span className="app-stat-label">Total Applications</span>
            <span className="app-stat-val">{stats.total}</span>
          </div>
          <div className="app-stat-icon-box icon-blue-app"><FileText size={22} /></div>
        </div>
        <div className="app-stat-card">
          <div className="app-stat-info">
            <span className="app-stat-label">Pending Review</span>
            <span className="app-stat-val">{stats.pendingReview}</span>
          </div>
          <div className="app-stat-icon-box icon-orange-app"><AlertCircle size={22} /></div>
        </div>
        <div className="app-stat-card">
          <div className="app-stat-info">
            <span className="app-stat-label">Pending Docs</span>
            <span className="app-stat-val">{stats.pendingDocs}</span>
          </div>
          <div className="app-stat-icon-box icon-cyan-app"><Download size={22} /></div>
        </div>
        <div className="app-stat-card">
          <div className="app-stat-info">
            <span className="app-stat-label">Approved</span>
            <span className="app-stat-val">{stats.approved}</span>
          </div>
          <div className="app-stat-icon-box icon-green-app"><UserCheck size={22} /></div>
        </div>
      </div>

      {/* Filters */}
      <div className="applications-filters">
        <div className="app-search-box">
          <Search size={18} color="#94A3B8" />
          <input type="text" placeholder="Search by name, company, or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="app-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
          <option>Pending Review</option>
          <option>Pending Documents</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>
        <select className="app-filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option>All Types</option>
          <option>Owner Operator</option>
          <option>Driver</option>
        </select>
      </div>

      {/* Application Cards */}
      <div className="applications-list">
        {filteredApps.map(app => (
          <div className="application-card" key={app.id}>
            {/* Header */}
            <div className="app-card-header">
              <div className="app-profile-box">
                <div className={`app-avatar ${app.cls}`}>{app.init}</div>
                <div className="app-details-col">
                  <div className="app-name-row">
                    <span className="app-name">{app.name}</span>
                    <StatusBadge status={app.status}>{app.status}</StatusBadge>
                  </div>
                  <div className="app-meta-row">
                    <span className="app-meta-item"><Briefcase size={13} /> {app.type}</span>
                    <span className="app-meta-item"><Truck size={13} /> {app.company}</span>
                    <span className="app-meta-item"><Calendar size={13} /> Applied {app.date}</span>
                  </div>
                  <div className="app-meta-row">
                    <span className="app-meta-item"><MapPin size={13} /> {app.loc}</span>
                    <span className="app-meta-item"><Mail size={13} /> {app.email}</span>
                    <span className="app-meta-item"><Phone size={13} /> {app.phone}</span>
                  </div>
                </div>
              </div>
              <div className="app-actions">
                {app.status === 'Pending Review' && (
                  <>
                    <button className="btn-approve" onClick={() => updateStatus(app.id, 'Approved')}>Approve</button>
                    <button className="btn-reject" onClick={() => updateStatus(app.id, 'Rejected')}>Reject</button>
                  </>
                )}
                {app.status === 'Pending Documents' && (
                  <button className="btn-request"><FileText size={14} /> Request Documents</button>
                )}
                {(app.status === 'Approved' || app.status === 'Rejected') && (
                  <button className="btn-outline" onClick={() => updateStatus(app.id, 'Pending Review')}>
                    <RotateCcw size={14} /> Re-evaluate
                  </button>
                )}
              </div>
            </div>

            {/* Metrics */}
            <div className="app-metrics-grid">
              <div className="app-metric-item">
                <span className="app-metric-label">Experience</span>
                <span className="app-metric-val">{app.exp}</span>
              </div>
              {app.drivers !== null && (
                <div className="app-metric-item">
                  <span className="app-metric-label">Drivers</span>
                  <span className="app-metric-val"><User size={14} color="#3B82F6" /> {app.drivers}</span>
                </div>
              )}
              {app.trucks !== null && (
                <div className="app-metric-item">
                  <span className="app-metric-label">Trucks</span>
                  <span className="app-metric-val"><Truck size={14} color="#F97316" /> {app.trucks}</span>
                </div>
              )}
              <div className="app-metric-item">
                <span className="app-metric-label">CDL Number</span>
                <span className="app-metric-val">{app.cdl}</span>
              </div>
            </div>

            {/* Documents */}
            <div className="app-docs-section">
              <span className="app-section-label">Required Documents</span>
              <div className="app-docs-list">
                {app.docs.map((doc, idx) => (
                  <div key={idx} className={`doc-pill ${doc.verified ? 'doc-verified' : 'doc-missing'}`}>
                    {doc.verified ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    {doc.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="app-text-block">
              <span className="app-section-label">Notes</span>
              <div className="text-block-content">{app.notes}</div>
            </div>

            {/* Rejection */}
            {app.rejectionReason && (
              <div className="rejection-reason">
                <div className="rejection-title">Rejection Reason</div>
                <div className="rejection-text">{app.rejectionReason}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
