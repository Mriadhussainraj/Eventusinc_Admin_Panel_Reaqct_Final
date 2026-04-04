import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, BadgeCheck, MessageSquare, Ban,
  Truck, Package, CheckCircle2, DollarSign,
  FileText, Download, MapPin
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import './OwnerDetails.css';

const mockOperatorDB = {
  mr: { 
    init: 'MR', name: 'Michael Rodriguez', company: 'Rodriguez Transport LLC', loc: 'Dallas, TX', join: '2023-08-15', rating: '4.9', status: 'Active',
    kpi: { drivers: 3, loads: 2, completed: 145, rev: '$187,450' },
    details: { mc: 'MC-789456', dot: 'DOT-3214567', ein: '45-7891234', email: 'michael.r@trucking.com', phone: '+1 (555) 234-5678' },
    compliance: { status: 'Compliant', ins: 'Active', exp: '2026-08-15', last: '2024-02-18 09:30 AM' },
    drivers: [
      { init: 'MJ', name: 'Marcus Johnson', status: 'On Route', completed: 45 },
      { init: 'DK', name: 'David Kim', status: 'Available', completed: 52 },
      { init: 'CR', name: 'Carlos Rivera', status: 'Resting', completed: 48 }
    ],
    earnings: [
      { m: 'Sep 2025', v: '$22,400' }, { m: 'Oct 2025', v: '$28,100' }, { m: 'Nov 2025', v: '$24,600' },
      { m: 'Dec 2025', v: '$31,200' }, { m: 'Jan 2026', v: '$35,800' }, { m: 'Feb 2026', v: '$45,350' }
    ]
  },
  sm: { 
    init: 'SM', name: 'Sarah Mitchell', company: 'FastHaul Logistics', loc: 'Atlanta, GA', join: '2022-11-04', rating: '4.8', status: 'Active',
    kpi: { drivers: 5, loads: 4, completed: 223, rev: '$298,320' },
    details: { mc: 'MC-123987', dot: 'DOT-8822910', ein: '21-3948572', email: 'sarah.m@fasthaul.com', phone: '+1 (555) 876-5432' },
    compliance: { status: 'Compliant', ins: 'Active', exp: '2025-12-01', last: '2024-02-18 10:15 AM' },
    drivers: [
      { init: 'AB', name: 'Alice Brown', status: 'On Route', completed: 80 }, 
      { init: 'TL', name: 'Tim Lee', status: 'Available', completed: 62 },
      { init: 'RB', name: 'Rick Barnes', status: 'Resting', completed: 81 }
    ],
    earnings: [
      { m: 'Nov 2025', v: '$41,200' }, { m: 'Dec 2025', v: '$46,100' }, { m: 'Jan 2026', v: '$42,500' }, { m: 'Feb 2026', v: '$48,320' }
    ]
  },
  dc: { 
    init: 'DC', name: 'David Chen', company: 'Prime Fleet Services', loc: 'Los Angeles, CA', join: '2021-02-28', rating: '4.7', status: 'Active',
    kpi: { drivers: 8, loads: 6, completed: 412, rev: '$534,890' },
    details: { mc: 'MC-554433', dot: 'DOT-1122334', ein: '11-2233445', email: 'david.chen@primefleet.com', phone: '+1 (555) 345-6789' },
    compliance: { status: 'Compliant', ins: 'Active', exp: '2026-01-10', last: '2024-02-18 08:45 AM' },
    drivers: [
      { init: 'KS', name: 'Kevin Smith', status: 'On Route', completed: 104 }, 
      { init: 'LW', name: 'Leo Wang', status: 'Available', completed: 92 }
    ],
    earnings: [
      { m: 'Nov 2025', v: '$75,200' }, { m: 'Dec 2025', v: '$82,400' }, { m: 'Jan 2026', v: '$85,600' }, { m: 'Feb 2026', v: '$90,100' }
    ]
  },
  jw: { 
    init: 'JW', name: 'Jennifer Williams', company: 'Swift Cargo Inc', loc: 'Phoenix, AZ', join: '2024-01-10', rating: '4.6', status: 'Pending Verification',
    kpi: { drivers: 2, loads: 1, completed: 88, rev: '$112,340' },
    details: { mc: 'MC-PENDING', dot: 'DOT-PENDING', ein: '33-4455667', email: 'jwilliams@swiftcargo.com', phone: '+1 (555) 654-3210' },
    compliance: { status: 'Pending Review', ins: 'Verifying', exp: 'N/A', last: '2024-02-17 04:20 PM' },
    drivers: [
      { init: 'OP', name: 'Oscar Perez', status: 'Pending', completed: 88 }
    ],
    earnings: [
      { m: 'Jan 2026', v: '$15,400' }, { m: 'Feb 2026', v: '$18,340' }
    ]
  },
  rt: { 
    init: 'RT', name: 'Robert Thompson', company: 'TruckPro Solutions', loc: 'Chicago, IL', join: '2023-05-20', rating: '4.9', status: 'Active',
    kpi: { drivers: 6, loads: 5, completed: 367, rev: '$445,670' },
    details: { mc: 'MC-998877', dot: 'DOT-7766554', ein: '55-6677889', email: 'robert@truckpro.com', phone: '+1 (555) 789-0123' },
    compliance: { status: 'Compliant', ins: 'Active', exp: '2025-05-20', last: '2024-02-18 11:00 AM' },
    drivers: [
      { init: 'JD', name: 'John Doe', status: 'On Route', completed: 156 },
      { init: 'MB', name: 'Mike Bell', status: 'Available', completed: 102 }
    ],
    earnings: [
      { m: 'Jan 2026', v: '$65,200' }, { m: 'Feb 2026', v: '$72,400' }
    ]
  },
  mg: { 
    init: 'MG', name: 'Maria Garcia', company: 'Reliable Haul Co', loc: 'Houston, TX', join: '2023-11-01', rating: '4.5', status: 'Suspended',
    kpi: { drivers: 1, loads: 0, completed: 34, rev: '$42,180' },
    details: { mc: 'MC-111222', dot: 'DOT-3334445', ein: '77-8899001', email: 'mgarcia@reliablehaul.com', phone: '+1 (555) 432-1098' },
    compliance: { status: 'Needs Action', ins: 'Expired', exp: '2024-01-15', last: '2024-02-15 02:30 PM' },
    drivers: [
      { init: 'MG', name: 'Maria Garcia', status: 'Offline', completed: 34 }
    ],
    earnings: [
      { m: 'Dec 2025', v: '$12,400' }, { m: 'Jan 2026', v: '$0' }
    ]
  }
};

const documents = [
  { name: 'W-9 Form', date: '2023-06-15', status: 'Verified' },
  { name: 'Certificate of Insurance', date: '2023-06-15', status: 'Verified' },
  { name: 'MC Authority Certificate', date: '2023-06-15', status: 'Verified' },
  { name: 'Operating Agreement', date: '2023-06-16', status: 'Verified' }
];

const OwnerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const owner = mockOperatorDB[id?.toLowerCase()];

  if (!owner) {
    return (
      <div className="fade-in" style={{ padding: '2rem' }}>
        <h2>Operator not found</h2>
        <button onClick={() => navigate('/owners')} className="btn-outline">Go Back</button>
      </div>
    );
  }

  return (
    <div className="owner-details-page fade-in">
      <button onClick={() => navigate('/owners')} className="back-link">
        <ArrowLeft size={16} /> Back to Owner Operators
      </button>

      {/* Hero Profile */}
      <div className="profile-card">
        <div className="profile-left">
          <div className="profile-avatar-large">{owner.init}</div>
          <div className="profile-info">
            <div className="profile-name-row">
              <span className="profile-name">{owner.name}</span>
              <BadgeCheck size={18} color="#10B981" />
            </div>
            <span className="profile-company">{owner.company}</span>
            <div className="profile-meta-row">
              <span className="profile-meta-item"><MapPin size={12} /> {owner.loc}</span>
              <span className="profile-meta-item">Joined {owner.join}</span>
              <span className="profile-rating">★ {owner.rating}</span>
            </div>
          </div>
        </div>
        <div className="profile-right">
          <StatusBadge status={owner.status}>{owner.status}</StatusBadge>
          <button className="btn-outline">
            <MessageSquare size={16} /> Message Owner
          </button>
          <button className="btn-danger">
            <Ban size={16} /> Suspend Account
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="od-stats-grid">
        <div className="od-stat-card">
          <div className="od-stat-header"><div className="icon-blue" style={{padding: '4px', borderRadius: '6px'}}><Truck size={14}/></div> Active Drivers</div>
          <div className="od-stat-val">{owner.kpi.drivers}</div>
        </div>
        <div className="od-stat-card">
          <div className="od-stat-header"><div className="icon-green" style={{padding: '4px', borderRadius: '6px'}}><Package size={14}/></div> Active Loads</div>
          <div className="od-stat-val">{owner.kpi.loads}</div>
        </div>
        <div className="od-stat-card">
          <div className="od-stat-header"><div className="icon-gold" style={{padding: '4px', borderRadius: '6px'}}><CheckCircle2 size={14}/></div> Completed</div>
          <div className="od-stat-val">{owner.kpi.completed}</div>
        </div>
        <div className="od-stat-card">
          <div className="od-stat-header"><div className="icon-purple" style={{padding: '4px', borderRadius: '6px'}}><DollarSign size={14}/></div> Total Revenue</div>
          <div className="od-stat-val">{owner.kpi.rev}</div>
        </div>
      </div>

      {/* 2-Column Info Data */}
      <div className="info-2col-grid">
        <div className="section-card">
          <div className="section-title">Company Information</div>
          <div className="data-row"><span className="data-label">Company Name</span><span className="data-val">{owner.company}</span></div>
          <div className="data-row"><span className="data-label">MC Number</span><span className="data-val">{owner.details.mc}</span></div>
          <div className="data-row"><span className="data-label">DOT Number</span><span className="data-val">{owner.details.dot}</span></div>
          <div className="data-row"><span className="data-label">EIN</span><span className="data-val">{owner.details.ein}</span></div>
          <div className="data-row"><span className="data-label">Email</span><span className="data-val">{owner.details.email}</span></div>
          <div className="data-row"><span className="data-label">Phone</span><span className="data-val">{owner.details.phone}</span></div>
        </div>
        
        <div className="section-card">
          <div className="section-title">Compliance & Insurance</div>
          <div className="data-row"><span className="data-label">Compliance Status</span><span className="data-val val-green">{owner.compliance.status}</span></div>
          <div className="data-row"><span className="data-label">Insurance Status</span><span className="data-val val-green">{owner.compliance.ins}</span></div>
          <div className="data-row"><span className="data-label">Insurance Expiry</span><span className="data-val">{owner.compliance.exp}</span></div>
          <div className="data-row"><span className="data-label">Last Active</span><span className="data-val">{owner.compliance.last}</span></div>
        </div>
      </div>

      {/* Active Drivers Table */}
      <div className="section-card" style={{ marginBottom: '2rem' }}>
        <div className="section-title">Active Drivers ({owner.drivers.length})</div>
        <div className="dr-table-header">
          <div>Driver</div>
          <div>Status</div>
          <div>Completed Loads</div>
        </div>
        <div>
          {owner.drivers.map((dr, i) => (
            <div key={i} className="dr-row">
              <div className="dr-identity">
                <div className="dr-avatar">{dr.init}</div>
                <span className="dr-name">{dr.name}</span>
              </div>
              <div><StatusBadge status={dr.status}>{dr.status}</StatusBadge></div>
              <div className="dr-num">{dr.completed}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="section-card" style={{ marginBottom: '2rem' }}>
        <div className="section-title">Earnings Overview</div>
        <div className="earn-block-flex">
          {owner.earnings.map((e, i) => (
            <div key={i} className="earn-box">
              <span className="earn-month">{e.m}</span>
              <span className="earn-val">{e.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Uploaded Documents */}
      <div className="section-card">
        <div className="section-title">Uploaded Documents</div>
        <div>
          {documents.map((doc, i) => (
            <div key={i} className="doc-row">
              <div className="doc-left">
                <div className="doc-icon-box"><FileText size={20} /></div>
                <div className="doc-info">
                  <span className="doc-title">{doc.name}</span>
                  <span className="doc-date">Uploaded: {doc.date}</span>
                </div>
              </div>
              <div className="doc-right">
                <span className="doc-status">{doc.status}</span>
                <button className="doc-dl-btn"><Download size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default OwnerDetails;
