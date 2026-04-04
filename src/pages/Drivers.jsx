import React, { useState } from 'react';
import { 
  Search, Plus, MapPin, Star, Box, 
  X, UserPlus
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import './Drivers.css';

const initialDrivers = [
  { init: 'MJ', name: 'Marcus Johnson', phone: '(555) 111-2222', loc: 'Lubbock, TX', truck: 'TRK-1001', rating: '4.9', loads: 234, status: 'On Route' },
  { init: 'DK', name: 'David Kim', phone: '(555) 222-3333', loc: 'Houston, TX', truck: 'TRK-1002', rating: '4.7', loads: 189, status: 'On Route' },
  { init: 'CR', name: 'Carlos Rivera', phone: '(555) 333-4444', loc: 'Oklahoma City, OK', truck: 'TRK-1003', rating: '4.8', loads: 312, status: 'Available' },
  { init: 'JW', name: 'James Wilson', phone: '(555) 444-5555', loc: 'Dallas, TX', truck: 'TRK-1004', rating: '4.5', loads: 156, status: 'Resting' },
  { init: 'AT', name: 'Alex Thompson', phone: '(555) 555-6666', loc: 'Austin, TX', truck: 'TRK-1005', rating: '4.6', loads: 98, status: 'Offline' }
];

const Drivers = () => {
  const [drivers, setDrivers] = useState(initialDrivers);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cdl: '',
    operator: '',
    equipment: '',
    accountStatus: 'Active',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDriver = (e) => {
    e.preventDefault();
    if (!formData.name) return;
    
    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2) || 'NA';
    
    const newDriver = {
      init: initials,
      name: formData.name,
      phone: formData.phone || '(000) 000-0000',
      loc: 'Pending Assignment',
      truck: 'Unassigned',
      rating: '0.0',
      loads: 0,
      status: formData.accountStatus === 'Active' ? 'Available' : 'Offline'
    };
    
    setDrivers([...drivers, newDriver]);
    
    setFormData({
      name: '', email: '', phone: '', cdl: '', operator: '', equipment: '', accountStatus: 'Active', notes: ''
    });
    setIsModalOpen(false);
  };

  const filteredDrivers = drivers.filter(dr => 
    dr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dr.phone.includes(searchQuery) ||
    dr.truck.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="drivers-page fade-in">
        <div className="drivers-header-row">
          <div>
            <h2 className="drivers-title">Drivers</h2>
            <p className="drivers-subtitle">{drivers.length} drivers in fleet</p>
          </div>
          
          <div className="drivers-top-actions">
            <div className="search-input-box">
              <Search size={18} color="#94A3B8" />
              <input 
                type="text" 
                placeholder="Search drivers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn-primary-gold" onClick={() => setIsModalOpen(true)}>
              <Plus size={18} /> Add Driver
            </button>
          </div>
        </div>

        <div className="drivers-table-wrapper">
          <div className="dr-grid dr-header">
            <div>Driver</div>
            <div>Location</div>
            <div>Truck</div>
            <div>Rating</div>
            <div>Loads</div>
            <div>Status</div>
          </div>
          
          <div className="drivers-rows">
            {filteredDrivers.map((dr, i) => (
              <div key={i} className="dr-grid dr-row">
                <div className="dr-ident">
                  <div className="dr-avatar-md">{dr.init}</div>
                  <div className="dr-info-col">
                    <span className="dr-main-name">{dr.name}</span>
                    <span className="dr-sub-text">{dr.phone}</span>
                  </div>
                </div>
                <div className="dr-loc-cell">
                  <MapPin size={14} /> {dr.loc}
                </div>
                <div className="dr-text-val">{dr.truck}</div>
                <div className="dr-rating-cell">
                  <Star size={14} color="#F59E0B" fill="#F59E0B" /> {dr.rating}
                </div>
                <div className="dr-loads-cell">
                  <Box size={14} /> {dr.loads}
                </div>
                <div>
                  <StatusBadge status={dr.status}>{dr.status}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Driver Modal - OUTSIDE fade-in so position:fixed works */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="add-modal-container">
            <div className="modal-header">
              <div className="modal-title-row">
                <div className="title-icon-box"><UserPlus size={20} /></div>
                <div>
                  <div className="modal-title">Add New Driver</div>
                  <div className="modal-subtitle">Fill in all required fields to create a driver account</div>
                </div>
              </div>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div>
                <div className="form-section-title">Personal Information</div>
                <div className="form-grid">
                  <div className="form-group form-full">
                    <label className="form-label">Full Name *</label>
                    <input type="text" name="name" className="form-input" placeholder="e.g. John Smith" value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input type="email" name="email" className="form-input" placeholder="driver@example.com" value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input type="text" name="phone" className="form-input" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="form-group form-full">
                    <label className="form-label">CDL Number *</label>
                    <input type="text" name="cdl" className="form-input" placeholder="e.g. CDL-A-123456" value={formData.cdl} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="form-section-title">Assignment & Equipment</div>
                <div className="form-grid">
                  <div className="form-group form-full">
                    <label className="form-label">Assigned Owner Operator *</label>
                    <select name="operator" className="form-input" value={formData.operator} onChange={handleInputChange}>
                      <option value="">Select owner operator...</option>
                      <option value="rodriguez">Rodriguez Transport LLC</option>
                      <option value="fasthaul">FastHaul Logistics</option>
                      <option value="prime">Prime Fleet Services</option>
                      <option value="swift">Swift Cargo Inc</option>
                      <option value="truckpro">TruckPro Solutions</option>
                      <option value="reliable">Reliable Haul Co</option>
                    </select>
                  </div>
                  <div className="form-group form-full">
                    <label className="form-label">Equipment Type *</label>
                    <select name="equipment" className="form-input" value={formData.equipment} onChange={handleInputChange}>
                      <option value="">Select equipment type...</option>
                      <option value="dry">Dry Van</option>
                      <option value="reefer">Reefer</option>
                      <option value="flatbed">Flatbed</option>
                      <option value="stepdeck">Step Deck</option>
                      <option value="lowboy">Lowboy</option>
                      <option value="tanker">Tanker</option>
                      <option value="auto">Auto Carrier</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="form-section-title">Status & Notes</div>
                <div className="form-grid">
                  <div className="form-group form-full">
                    <label className="form-label">Account Status</label>
                    <div className="status-toggle-row">
                      <button 
                        className={`status-btn ${formData.accountStatus === 'Active' ? 'status-btn-active-selected' : 'status-btn-active'}`}
                        onClick={(e) => { e.preventDefault(); setFormData(p => ({...p, accountStatus: 'Active'}))}}
                      >
                        Active
                      </button>
                      <button 
                        className={`status-btn ${formData.accountStatus === 'Suspended' ? 'status-btn-suspended-selected' : 'status-btn-active'}`}
                        onClick={(e) => { e.preventDefault(); setFormData(p => ({...p, accountStatus: 'Suspended'}))}}
                      >
                        Suspended
                      </button>
                    </div>
                  </div>
                  <div className="form-group form-full">
                    <label className="form-label">Notes <span style={{color: '#94A3B8', fontWeight: 400}}>(optional)</span></label>
                    <textarea 
                      name="notes" 
                      className="form-input" 
                      placeholder="Any additional notes about this driver..." 
                      rows="3"
                      value={formData.notes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-primary-gold" onClick={handleAddDriver}>
                <UserPlus size={16} /> Save Driver
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Drivers;
