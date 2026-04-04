import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  Shield, 
  Users, 
  FileText, 
  CreditCard, 
  ClipboardCheck, 
  UserCog, 
  BarChart2, 
  Settings, 
  ChevronsUp,
  LogOut
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Package, label: 'Dispatch / Loads', path: '/dispatch' },
    { icon: Truck, label: 'Fleet Overview', path: '/fleet' },
    { icon: Shield, label: 'Owner Operators', path: '/owners' },
    { icon: Users, label: 'Drivers List', path: '/drivers' },
    { icon: FileText, label: 'Applications', path: '/applications' },
    { icon: CreditCard, label: 'Payment Monitoring', path: '/payments' },
    { icon: ClipboardCheck, label: 'Compliance Monitoring', path: '/compliance' },
    { icon: UserCog, label: 'User Role Management', path: '/roles' },
    { icon: BarChart2, label: 'Reports & Analytics', path: '/reports' },
    { icon: Settings, label: 'System Settings', path: '/settings' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <ChevronsUp size={32} color="#C5973E" strokeWidth={2.5} />
          <div className="brand-titles">
            <span className="brand-text">EVENTUS</span>
            <span className="brand-inc">INC.</span>
          </div>
        </div>
        <div className="portal-label">Admin Portal</div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={18} className="icon" />
            <span className="label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
