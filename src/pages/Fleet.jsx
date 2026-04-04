import React from 'react';
import { Truck, CheckCircle2, Fuel, AlertTriangle, MapPin, Wrench } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import './Fleet.css';

const Fleet = () => {
  const summaryCards = [
    { icon: <Truck size={24} color="#3B82F6" strokeWidth={2} />, value: '5', label: 'Total Trucks' },
    { icon: <CheckCircle2 size={24} color="#10B981" strokeWidth={2} />, value: '2', label: 'Active' },
    { icon: <Fuel size={24} color="#C5973E" strokeWidth={2} />, value: '58%', label: 'Avg Fuel' },
    { icon: <AlertTriangle size={24} color="#F59E0B" strokeWidth={2} />, value: '3', label: 'Needs Attention' }
  ];

  const vehicles = [
    { id: 'TRK-1001', driver: 'Marcus Johnson', status: 'Active', location: 'Lubbock, TX', mileage: '117,378 mi', fuel: 48, serviceDist: '1267', healthy: false },
    { id: 'TRK-1002', driver: 'David Kim', status: 'Active', location: 'Houston, TX', mileage: '88,723 mi', fuel: 53, serviceDist: '3278', healthy: true },
    { id: 'TRK-1003', driver: 'Carlos Rivera', status: 'Idle', location: 'Oklahoma City, OK', mileage: '109,663 mi', fuel: 61, serviceDist: '2151', healthy: false },
    { id: 'TRK-1004', driver: 'James Wilson', status: 'Parked', location: 'Dallas, TX', mileage: '192,953 mi', fuel: 49, serviceDist: '2858', healthy: true },
    { id: 'TRK-1005', driver: 'Alex Thompson', status: 'Parked', location: 'Austin, TX', mileage: '180,415 mi', fuel: 77, serviceDist: '3069', healthy: false },
  ];

  return (
    <div className="fleet-page fade-in">
      <h2 className="fleet-title">Fleet Overview</h2>
      <p className="fleet-subtitle">5 vehicles in fleet</p>

      {/* Summary KPI Grid */}
      <div className="summary-grid">
        {summaryCards.map((card, i) => (
          <div key={i} className="summary-card">
            <div className="sum-icon-wrapper">
              {card.icon}
            </div>
            <div className="sum-value">{card.value}</div>
            <div className="sum-label">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Vehicles Fleet Grid */}
      <div className="vehicles-grid">
        {vehicles.map((v, i) => (
          <div key={i} className="vehicle-card">
            
            {/* Header block */}
            <div className="v-header">
              <div className="v-identity">
                <div className="v-truck-circle">
                  <Truck size={20} strokeWidth={2} />
                </div>
                <div className="v-title-block">
                  <span className="v-truck-id">{v.id}</span>
                  <span className="v-driver-name">{v.driver}</span>
                </div>
              </div>
              <StatusBadge status={v.status}>{v.status}</StatusBadge>
            </div>

            {/* Location row */}
            <div className="v-location">
              <MapPin size={14} /> {v.location}
            </div>

            {/* Mileage stat */}
            <div className="v-stat-row">
              <span className="v-stat-label">Mileage</span>
              <span className="v-stat-value">{v.mileage}</span>
            </div>

            {/* Fuel level stat */}
            <div className="v-stat-row">
              <span className="v-stat-label">Fuel Level</span>
              <span className="v-stat-value">{v.fuel}%</span>
            </div>

            {/* Progress/Fuel Bar */}
            <div className="v-progress-container">
              <div 
                className="v-progress-fill" 
                style={{ 
                  width: `${v.fuel}%`, 
                  backgroundColor: v.fuel < 50 ? '#F59E0B' : '#10B981' 
                }}
              ></div>
            </div>

            {/* Divider */}
            <hr className="v-divider" />

            {/* Service & Diagnostic Row */}
            <div className="v-service-row">
              <div className="v-service-due">
                <Wrench size={14} /> Service in {v.serviceDist} mi
              </div>
              <div className={`v-service-status ${v.healthy ? 'healthy' : 'check'}`}>
                {v.healthy ? (
                  <><CheckCircle2 size={14} /> Healthy</>
                ) : (
                  <><AlertTriangle size={14} /> Check</>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Fleet;
