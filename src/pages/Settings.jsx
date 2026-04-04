import React, { useState } from 'react';
import { 
  CheckCircle2, AlertCircle, Shield, 
  ChevronRight, Lock, Bell, UserCheck, 
  Settings, CreditCard, Layout, Activity,
  Users, Layers, Globe, LogOut, Sun, Moon, Save
} from 'lucide-react';
import './Settings.css';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loadAlerts, setLoadAlerts] = useState(true);
  const [paymentNotif, setPaymentNotif] = useState(true);
  const [complianceNotif, setComplianceNotif] = useState(true);
  const [onboardingNotif, setOnboardingNotif] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const Toggle = ({ checked, onChange }) => (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider"></span>
    </label>
  );

  const ClickableRow = ({ label, desc, onClick }) => (
    <div className="setting-row clickable-row" onClick={onClick}>
      <div className="setting-info">
        <span className="setting-label">{label}</span>
        {desc && <span className="setting-desc">{desc}</span>}
      </div>
      <ChevronRight size={18} className="chevron-icon" />
    </div>
  );

  return (
    <>
      <div className="settings-page fade-in">
        <div className="settings-header">
          <h2 className="settings-title">System Settings</h2>
          <p className="settings-subtitle">Manage system preferences and configurations</p>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Sun size={20} className="section-icon" />
            <h3 className="section-title">Appearance</h3>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Dark Mode</span>
              <span className="setting-desc">Switch between light and dark theme</span>
            </div>
            <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </div>
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Bell size={20} className="section-icon" />
            <h3 className="section-title">Notification Preferences</h3>
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Load Alerts</span>
              <span className="setting-desc">New loads, status changes, issues</span>
            </div>
            <Toggle checked={loadAlerts} onChange={() => setLoadAlerts(!loadAlerts)} />
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Payment Notifications</span>
              <span className="setting-desc">Payouts, invoices, disputes</span>
            </div>
            <Toggle checked={paymentNotif} onChange={() => setPaymentNotif(!paymentNotif)} />
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Compliance Alerts</span>
              <span className="setting-desc">Expirations, violations, renewals</span>
            </div>
            <Toggle checked={complianceNotif} onChange={() => setComplianceNotif(!complianceNotif)} />
          </div>
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Onboarding Applications</span>
              <span className="setting-desc">New applications, status changes</span>
            </div>
            <Toggle checked={onboardingNotif} onChange={() => setOnboardingNotif(!onboardingNotif)} />
          </div>
        </div>
         // Securit
        <div className="settings-section">
          <div className="section-header">
            <Shield size={20} className="section-icon" />
            <h3 className="section-title">Security Settings</h3>
          </div>
          <ClickableRow label="Change Password" desc="Last changed 15 days ago" onClick={() => setShowPasswordModal(true)} />
          <div className="setting-row">
            <div className="setting-info">
              <span className="setting-label">Two-Factor Authentication</span>
              <span className="setting-desc">Extra security for admin accounts</span>
            </div>
            <Toggle checked={twoFactorAuth} onChange={() => setTwoFactorAuth(!twoFactorAuth)} />
          </div>
          <ClickableRow label="Session Management" desc="3 active sessions" onClick={() => alert('Session Management logic!')} />
        </div>

        <div className="settings-section">
          <div className="section-header">
            <Users size={20} className="section-icon" />
            <h3 className="section-title">Role Permissions</h3>
          </div>
          <ClickableRow label="Manage User Roles" desc="Assign and modify user permissions" onClick={() => alert('Manage User Roles logic!')} />
        </div>

        <h4 className="business-group-label">Business</h4>
        <div className="settings-section">
          <ClickableRow label="Payment Settings" desc="Manage Stripe and payouts" onClick={() => alert('Payment Settings logic!')} />
          <ClickableRow label="Fleet Configuration" desc="Truck and equipment settings" onClick={() => alert('Fleet Configuration logic!')} />
          <ClickableRow label="Integrations" desc="Load board and API connections" onClick={() => alert('Integrations logic!')} />
          <ClickableRow label="Compliance Rules" desc="Set compliance requirements" onClick={() => alert('Compliance Rules logic!')} />
        </div>

        <button className="btn-signout-large" onClick={() => alert('Sign out initiated!')}>
          <LogOut size={20} /> Sign Out
        </button>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="edit-modal password-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Change Password</h2>
            </div>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); setShowPasswordModal(false); alert('Password Updated!'); }}>
              <div className="form-group">
                <label>Current Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" placeholder="••••••••" required />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-modal-cancel" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button type="submit" className="btn-modal-save btn-modal-update">
                  <Save size={18} /> Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPage;
