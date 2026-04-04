import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, ChevronDown, Check, Shield, CheckCircle2, Truck, Package, 
  UserPlus, Mail, Phone, BadgeCheck, MapPin, DollarSign, Star, ChevronRight, Box
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import './Owners.css';

const Owners = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const statuses = [
    'All Status',
    'Active',
    'Pending Verification',
    'Suspended',
    'Inactive'
  ];

  const summary = [
    { label: 'Total Operators', value: '6', icon: <Shield size={22} />, styleClass: 'icon-blue' },
    { label: 'Active Now', value: '4', icon: <CheckCircle2 size={22} />, styleClass: 'icon-green' },
    { label: 'Total Drivers', value: '25', icon: <Truck size={22} />, styleClass: 'icon-gold' },
    { label: 'Active Loads', value: '18', icon: <Package size={22} />, styleClass: 'icon-purple' }
  ];

  const operators = [
    { init: 'MR', name: 'Michael Rodriguez', company: 'Rodriguez Transport LLC', loc: 'Dallas, TX', email: 'michael.r@trucking.com', phone: '+1 (555) 234-5678', drivers: 3, completed: 145, loads: 2, rev: '$187,450', rating: 4.9, status: 'Active', last: '2024-02-18 09:30 AM', payout: 'Current' },
    { init: 'SM', name: 'Sarah Mitchell', company: 'FastHaul Logistics', loc: 'Atlanta, GA', email: 'sarah.m@fasthaul.com', phone: '+1 (555) 876-5432', drivers: 5, completed: 223, loads: 4, rev: '$298,320', rating: 4.8, status: 'Active', last: '2024-02-18 10:15 AM', payout: 'Current' },
    { init: 'DC', name: 'David Chen', company: 'Prime Fleet Services', loc: 'Los Angeles, CA', email: 'david.chen@primefleet.com', phone: '+1 (555) 345-6789', drivers: 8, completed: 412, loads: 6, rev: '$534,890', rating: 4.7, status: 'Active', last: '2024-02-18 08:45 AM', payout: 'Current' },
    { init: 'JW', name: 'Jennifer Williams', company: 'Swift Cargo Inc', loc: 'Phoenix, AZ', email: 'jwilliams@swiftcargo.com', phone: '+1 (555) 654-3210', drivers: 2, completed: 88, loads: 1, rev: '$112,340', rating: 4.6, status: 'Pending Verification', last: '2024-02-17 04:20 PM', payout: 'Pending Setup' },
    { init: 'RT', name: 'Robert Thompson', company: 'TruckPro Solutions', loc: 'Chicago, IL', email: 'robert@truckpro.com', phone: '+1 (555) 789-0123', drivers: 6, completed: 367, loads: 5, rev: '$445,670', rating: 4.9, status: 'Active', last: '2024-02-18 11:00 AM', payout: 'Current' },
    { init: 'MG', name: 'Maria Garcia', company: 'Reliable Haul Co', loc: 'Houston, TX', email: 'mgarcia@reliablehaul.com', phone: '+1 (555) 432-1098', drivers: 1, completed: 34, loads: 0, rev: '$42,180', rating: 4.5, status: 'Suspended', last: '2024-02-15 02:30 PM', payout: 'On Hold' }
  ];

  const getPayoutStyle = (payout) => {
    if (payout === 'Current') return 'payout-current';
    if (payout === 'Pending Setup') return 'payout-pending';
    return 'payout-hold';
  };

  const filteredOperators = operators.filter(op => {
    const matchesStatus = selectedStatus === 'All Status' || op.status === selectedStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      op.name.toLowerCase().includes(q) || 
      op.company.toLowerCase().includes(q) || 
      op.email.toLowerCase().includes(q);
      
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="owners-page fade-in">
      <div className="owners-header-row">
        <div>
          <h2 className="owners-title">Owner Operators</h2>
          <p className="owners-subtitle">Manage all owner operator accounts and permissions</p>
        </div>
        <button className="btn-primary-gold">
          <UserPlus size={18} />
          View Applications
        </button>
      </div>

      <div className="owners-summary-bar">
        {summary.map((stat, i) => (
          <div key={i} className="owners-sum-card">
            <div className="owners-sum-data">
              <span className="sum-label">{stat.label}</span>
              <span className="sum-metric">{stat.value}</span>
            </div>
            <div className={`owners-sum-icon-box ${stat.styleClass}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="owners-actions">
        <div className="search-container" style={{ flex: 1, backgroundColor: '#fff', borderRadius: '12px', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <Search size={18} color="#94A3B8" style={{ marginRight: '0.75rem' }} />
          <input 
            type="text" 
            placeholder="Search by name, company, or location..." 
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.95rem', fontWeight: 500, color: '#0F1B2D' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ position: 'relative' }}>
          <button 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '0.85rem 1.25rem', borderRadius: '12px', fontWeight: 600, fontSize: '0.95rem', color: '#0F1B2D', cursor: 'pointer', minWidth: '130px', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedStatus} <ChevronDown size={16} />
          </button>
          
          {isDropdownOpen && (
            <div style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, backgroundColor: '#4B5563', borderRadius: '12px', minWidth: '200px', padding: '0.5rem', zIndex: 50, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }} className="fade-in">
              {statuses.map(status => (
                <button 
                  key={status}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', padding: '0.6rem 0.75rem', background: 'none', border: 'none', color: selectedStatus === status ? '#FFFFFF' : '#F3F4F6', fontWeight: selectedStatus === status ? 600 : 500, fontSize: '0.95rem', cursor: 'pointer', borderRadius: '8px', textAlign: 'left' }}
                  onClick={() => {
                    setSelectedStatus(status);
                    setIsDropdownOpen(false);
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Check size={16} style={{ marginRight: '8px', visibility: selectedStatus === status ? 'visible' : 'hidden' }} />
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="owners-table-container">
        <div className="owners-grid owners-header">
          <div>Operator</div>
          <div>Contact</div>
          <div>Drivers</div>
          <div>Active Loads</div>
          <div>Revenue</div>
          <div>Status</div>
          <div>Payout</div>
          <div>Actions</div>
        </div>

        <div className="owners-rows">
          {filteredOperators.map((op, i) => (
            <div key={i} className="owners-grid owners-row">
              <div className="op-cell">
                <div className="op-avatar">{op.init}</div>
                <div className="op-info">
                  <div className="op-name-row">
                    <span className="op-name">{op.name}</span>
                    <BadgeCheck size={14} color="#10B981" />
                  </div>
                  <span className="op-company">{op.company}</span>
                  <div className="op-location">
                    <MapPin size={10} /> {op.loc}
                  </div>
                </div>
              </div>
              
              <div className="contact-cell">
                <div className="contact-row">
                  <Mail size={14} /> {op.email}
                </div>
                <div className="contact-row">
                  <Phone size={14} /> {op.phone}
                </div>
              </div>
              
              <div className="metric-cell">
                <div className="metric-row">
                  <Truck size={14} color="#C5973E" /> {op.drivers}
                </div>
                <span className="metric-sub">{op.completed} completed</span>
              </div>
              
              <div className="metric-cell">
                <div className="metric-row">
                  <Box size={14} color="#3B82F6" /> {op.loads}
                </div>
              </div>
              
              <div className="metric-cell">
                <div className="rev-val">
                  <DollarSign size={14} color="#10B981" /> {op.rev}
                </div>
                <div className="rev-star">
                  <Star size={12} color="#F59E0B" fill="#F59E0B" /> {op.rating}
                </div>
              </div>
              
              <div className="status-cell">
                <StatusBadge status={op.status}>{op.status}</StatusBadge>
                <span className="status-last">Last: {op.last}</span>
              </div>
              
              <div>
                <span className={`payout-pill ${getPayoutStyle(op.payout)}`}>
                  {op.payout}
                </span>
              </div>
              
              <div>
                <button className="text-gold-action" onClick={() => navigate(`/owners/${op.init.toLowerCase()}`)}>
                  View Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Owners;
