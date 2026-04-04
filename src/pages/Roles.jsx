import React, { useState, useMemo } from 'react';
import { 
  Search, UserPlus, Shield, Truck, 
  User, Edit2, Trash2, X, 
  CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import './Roles.css';

const initialUsers = [
  { id: 1, name: 'Numan Zafar', email: 'numan@eventus.com', role: 'Owner Operator', status: 'Active', lastLogin: '2 min ago', init: 'NZ', color: '#B5934A' },
  { id: 2, name: 'Marcus Johnson', email: 'marcus.j@eventus.com', role: 'Driver', status: 'Active', lastLogin: '15 min ago', init: 'MJ', color: '#3B82F6' },
  { id: 3, name: 'David Kim', email: 'david.k@eventus.com', role: 'Driver', status: 'Active', lastLogin: '1 hour ago', init: 'DK', color: '#3B82F6' },
  { id: 4, name: 'Carlos Rivera', email: 'carlos.r@eventus.com', role: 'Driver', status: 'Active', lastLogin: '3 hours ago', init: 'CR', color: '#3B82F6' },
  { id: 5, name: 'James Wilson', email: 'james.w@eventus.com', role: 'Driver', status: 'Suspended', lastLogin: '2 days ago', init: 'JW', color: '#3B82F6' },
  { id: 6, name: 'Admin User', email: 'admin@eventus.com', role: 'Admin', status: 'Active', lastLogin: 'Just now', init: 'AU', color: '#8B5CF6' },
  { id: 7, name: 'Alex Thompson', email: 'alex.t@eventus.com', role: 'Driver', status: 'Inactive', lastLogin: '1 week ago', init: 'AT', color: '#3B82F6' }
];

const Roles = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const stats = useMemo(() => {
    return {
      admins: users.filter(u => u.role === 'Admin').length,
      owners: users.filter(u => u.role === 'Owner Operator').length,
      drivers: users.filter(u => u.role === 'Driver').length
    };
  }, [users]);

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All Roles' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleEdit = (user) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setShowEditModal(false);
  };

  return (
    <>
      <div className="roles-page fade-in">
        <div className="roles-header">
          <div className="roles-title-group">
            <h2 className="roles-title">User Role Management</h2>
            <p className="roles-subtitle">Manage user accounts, roles, and permissions</p>
          </div>
          <button className="btn-add-user" onClick={() => alert('Add User functionality coming soon!')}>
            <UserPlus size={18} /> Add User
          </button>
        </div>

        <div className="roles-stats-grid">
          <div className="role-stat-card">
            <div className="role-stat-icon-box icon-purple-role"><Shield size={22} /></div>
            <div className="role-stat-text-box">
              <span className="role-stat-val">{stats.admins}</span>
              <span className="role-stat-label">Admins</span>
            </div>
          </div>
          <div className="role-stat-card">
            <div className="role-stat-icon-box icon-gold-role"><Truck size={22} /></div>
            <div className="role-stat-text-box">
              <span className="role-stat-val">{stats.owners}</span>
              <span className="role-stat-label">Owner Operators</span>
            </div>
          </div>
          <div className="role-stat-card">
            <div className="role-stat-icon-box icon-blue-role"><User size={22} /></div>
            <div className="role-stat-text-box">
              <span className="role-stat-val">{stats.drivers}</span>
              <span className="role-stat-label">Drivers</span>
            </div>
          </div>
        </div>

        <div className="roles-filters">
          <div className="role-search-box">
            <Search size={18} color="#94A3B8" />
            <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <select className="role-filter-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option>All Roles</option>
            <option>Admin</option>
            <option>Dispatcher</option>
            <option>Driver</option>
            <option>Owner Operator</option>
          </select>
        </div>

        <div className="roles-table-wrapper">
          <div className="role-grid role-table-header">
            <div>User</div>
            <div>Role</div>
            <div>Status</div>
            <div>Last Login</div>
            <div style={{ textAlign: 'right' }}>Actions</div>
          </div>
          <div className="role-rows">
            {filteredUsers.map((user) => (
              <div key={user.id} className="role-grid role-row">
                <div className="user-cell">
                  <div className="user-avatar" style={{ backgroundColor: user.color }}>{user.init}</div>
                  <div className="user-info-box">
                    <span className="user-name">{user.name}</span>
                    <span className="user-email">{user.email}</span>
                  </div>
                </div>
                <div>
                  <span className={`role-pill pill-${user.role.toLowerCase().replace(' ', '-')}`}>
                    {user.role === 'Admin' && <Shield size={12} />}
                    {user.role === 'Driver' && <Clock size={12} />}
                    {user.role}
                  </span>
                </div>
                <div>
                  <span className={`status-pill-role status-${user.status.toLowerCase()}-r`}>{user.status}</span>
                </div>
                <div className="last-login-cell">{user.lastLogin}</div>
                <div className="actions-cell">
                  <button className="action-btn edit" onClick={() => handleEdit(user)}><Edit2 size={16} /></button>
                  <button className="action-btn delete" onClick={() => handleDelete(user.id)}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit User Modal - OUTSIDE fade-in so position:fixed works */}
      {showEditModal && editingUser && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit User</h2>
            </div>
            <form className="modal-form" onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={editingUser.name} onChange={(e) => setEditingUser({...editingUser, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={editingUser.email} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} required />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={editingUser.role} onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}>
                  <option>Admin</option>
                  <option>Dispatcher</option>
                  <option>Driver</option>
                  <option>Owner Operator</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={editingUser.status} onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}>
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="btn-modal-save">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Roles;
