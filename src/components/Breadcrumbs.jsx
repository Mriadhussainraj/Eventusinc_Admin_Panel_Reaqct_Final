import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const routeNameMap = {
    'dispatch': 'Admin Portal / Dispatch / Loads',
    'fleet': 'Admin Portal / Fleet Overview',
    'owners': 'Admin Portal / Owner Operators',
    'hub': 'Admin Portal / Driver Hub',
    'recruiting': 'Admin Portal / Recruiting',
    'applications': 'Admin Portal / Applications',
    'compliance': 'Admin Portal / Compliance',
    'accounting': 'Admin Portal / Accounting',
    'payments': 'Admin Portal / Payment Monitoring',
    'users': 'Admin Portal / Drivers List',
    'status': 'Admin Portal / System Status',
    'settings': 'Admin Portal / System Settings',
  };

  return (
    <nav className="breadcrumbs">
      <div className="breadcrumb-item">
        <Link to="/">Admin Portal</Link>
      </div>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const name = routeNameMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

        return (
          <React.Fragment key={to}>
            <ChevronRight size={14} className="separator" />
            <div className={`breadcrumb-item ${last ? 'active' : ''}`}>
              {last ? (
                <span>{name}</span>
              ) : (
                <Link to={to}>{name}</Link>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
