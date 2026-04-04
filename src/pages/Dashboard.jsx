import React from 'react';
import { 
  Package, 
  Users, 
  Truck, 
  DollarSign, 
  TrendingUp,
  MoreVertical,
  AlertCircle,
  FileCheck,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import './Dashboard.css';
import StatusBadge from '../components/StatusBadge';

const StatCard = ({ icon: Icon, label, value, trend, isPositive = true, iconBg, iconColor }) => (
  <div className="stat-card premium-card">
    <div className="stat-header">
      <div className="icon-badge" style={{ backgroundColor: iconBg }}>
        <Icon size={20} style={{ color: iconColor }} />
      </div>
      {trend && (
        <div className={`stat-trend ${isPositive ? 'positive' : 'negative'}`}>
          <TrendingUp size={14} />
          <span>{trend}</span>
        </div>
      )}
    </div>
    <div className="stat-info">
      <h3 className="value">{value}</h3>
      <p className="label">{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const recentLoads = [
    { route: 'Dallas → Denver', id: 'LD-001 | Dry Van', status: 'In transit', price: '$2,075' },
    { route: 'Houston → Phoenix', id: 'LD-002 | Flatbed', status: 'assigned', price: '$3,250' },
    { route: 'Los Angeles → Salt Lake City', id: 'LD-003 | Reefer', status: 'available', price: '$2,890' },
    { route: 'Chicago → Nashville', id: 'LD-004 | Dry Van', status: 'available', price: '$1,450' },
    { route: 'Atlanta → Miami', id: 'LD-005 | Flatbed', status: 'available', price: '$1,680' },
  ];

  const driverStatuses = [
    { name: 'Marcus Johnson', location: 'Lubbock, TX', status: 'On Route' },
    { name: 'David Kim', location: 'Houston, TX', status: 'On Route' },
    { name: 'Carlos Rivera', location: 'Oklahoma City, OK', status: 'Available' },
    { name: 'James Wilson', location: 'Dallas, TX', status: 'Resting' },
    { name: 'Alex Thompson', location: 'Austin, TX', status: 'Offline' },
  ];

  const loadStatusStats = [
    { label: 'In Transit', count: 1, color: '#10B981' },
    { label: 'Assigned', count: 1, color: '#3B82F6' },
    { label: 'Available', count: 3, color: '#C5973E' },
    { label: 'Delivered', count: 2, color: '#64748B' },
    { label: 'Pending', count: 1, color: '#F59E0B' },
  ];

  const pieData = [
    { label: 'Assigned', count: 1, color: '#3B82F6' },
    { label: 'In Transit', count: 1, color: '#10B981' },
    { label: 'Pending', count: 1, color: '#F59E0B' },
    { label: 'Delivered', count: 2, color: '#64748B' },
    { label: 'Available', count: 3, color: '#C5973E' },
  ];

  const revenueData = [
    { name: 'Mon', revenue: 2500 },
    { name: 'Tue', revenue: 3500 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 3200 },
    { name: 'Fri', revenue: 4000 },
    { name: 'Sat', revenue: 1300 },
    { name: 'Sun', revenue: 900 },
  ];

  return (
    <div className="dashboard-page fade-in">
      <div className="page-header">
        <h2 className="dashboard-title">Admin Dashboard</h2>
        <p className="dashboard-subtitle">Fleet overview and dispatch management</p>
      </div>

      <div className="stats-grid">
        <StatCard 
          icon={Package} 
          label="Total Loads" 
          value="8" 
          iconBg="#EFF6FF" 
          iconColor="#3B82F6"
        />
        <StatCard 
          icon={Users} 
          label="Active Drivers" 
          value="4" 
          iconBg="#ECFDF5" 
          iconColor="#10B981"
        />
        <StatCard 
          icon={Truck} 
          label="In Transit" 
          value="1" 
          iconBg="#FFF7ED" 
          iconColor="#F97316"
        />
        <StatCard 
          icon={DollarSign} 
          label="Revenue (Week)" 
          value="$15,700" 
          iconBg="#F5F3FF" 
          iconColor="#8B5CF6"
          trend="+24.2%"
        />
      </div>

      <div className="dashboard-content main-grid">
        <div className="content-left">
          <div className="main-chart premium-card">
            <div className="section-header">
              <h3>Weekly Revenue</h3>
            </div>
            <div className="chart-container" style={{ height: '300px', width: '100%', marginTop: '1rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  barCategoryGap="15%"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94A3B8', fontSize: 13, fontWeight: 600 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    domain={[0, 4000]}
                    ticks={[0, 1000, 2000, 3000, 4000]}
                  />
                  <RechartsTooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontWeight: 600 }}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#C5973E" 
                    radius={[0, 0, 0, 0]} 
                    animationDuration={1500}
                    barSize={55}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="recent-loads premium-card">
            <div className="section-header">
              <h3>Recent Loads</h3>
              <button className="view-all-btn">View All <ChevronRight size={14} /></button>
            </div>
            <div className="load-list">
              {recentLoads.map((load, i) => (
                <div key={i} className="load-item">
                  <div className="load-info">
                    <p className="load-route">{load.route}</p>
                    <p className="load-id">{load.id}</p>
                  </div>
                  <div className="load-meta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <p className="load-price" style={{ marginBottom: 0 }}>{load.price}</p>
                    <StatusBadge status={load.status}>{load.status}</StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="load-status premium-card">
            <div className="section-header">
              <h3>Load Status</h3>
            </div>
            <div className="donut-chart-wrapper" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div className="donut-visual" style={{ width: '100%', height: '220px', marginBottom: '2rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      startAngle={90}
                      endAngle={-270}
                      innerRadius="50%"
                      outerRadius="85%"
                      paddingAngle={4}
                      dataKey="count"
                      stroke="none"
                      animationDuration={1500}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      itemStyle={{ color: '#0F1B2D', fontWeight: 600 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="donut-legend">
                {loadStatusStats.map((stat, i) => (
                  <div key={i} className="legend-item">
                    <div className="legend-left">
                      <span className="dot" style={{ backgroundColor: stat.color }}></span>
                      <span className="legend-label">{stat.label}</span>
                    </div>
                    <span className="legend-value">{stat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="driver-status premium-card">
            <div className="section-header">
              <h3>Driver Status</h3>
              <button className="view-all-btn">View All <ChevronRight size={14} /></button>
            </div>
            <div className="driver-list">
              {driverStatuses.map((driver, i) => (
                <div key={i} className="driver-item">
                  <div className="driver-avatar-circle">
                    {driver.name.split(' ').map(n => n[0]).join('')}
                    <span className="status-dot online"></span>
                  </div>
                  <div className="driver-info">
                    <p className="driver-name">{driver.name}</p>
                    <p className="driver-location">{driver.location}</p>
                  </div>
                  <StatusBadge status={driver.status}>{driver.status}</StatusBadge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="alerts-section">
        <div className="section-header">
          <h3>Alerts & Compliance</h3>
          <button className="view-all-btn">View All <ChevronRight size={14} /></button>
        </div>
        <div className="alerts-grid">
          <div className="alert-card danger">
            <div className="alert-icon-wrapper">
              <ShieldAlert size={20} />
            </div>
            <div className="alert-info">
              <h4>Insurance Expiring</h4>
              <p>Marcus Johnson - 5 days</p>
            </div>
          </div>
          <div className="alert-card warning">
            <div className="alert-icon-wrapper">
              <AlertCircle size={20} />
            </div>
            <div className="alert-info">
              <h4>CDL Renewal Due</h4>
              <p>David Kim - 30 days</p>
            </div>
          </div>
          <div className="alert-card success">
            <div className="alert-icon-wrapper">
              <FileCheck size={20} />
            </div>
            <div className="alert-info">
              <h4>All Trucks Inspected</h4>
              <p>Last check: Feb 15, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
