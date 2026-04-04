import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Download, ExternalLink, DollarSign,
  CheckCircle2, Clock, AlertTriangle, TrendingUp,
  Calendar, Eye, CreditCard, Activity, X,
  MapPin, Truck, User, Hash, ArrowRight, Timer
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine
} from 'recharts';
import './Payments.css';

/* ─── Chart datasets per period ─── */
const chartDatasets = {
  'Last 30 Days': [
    { name: 'Week 1', payout: 38000 },
    { name: 'Week 2', payout: 42000 },
    { name: 'Week 3', payout: 35000 },
    { name: 'Week 4', payout: 48000 },
    { name: 'Week 5', payout: 50000 },
    { name: 'Week 6', payout: 58000 },
  ],
  'Last 60 Days': [
    { name: 'Week 1', payout: 28000 },
    { name: 'Week 2', payout: 32000 },
    { name: 'Week 3', payout: 30000 },
    { name: 'Week 4', payout: 36000 },
    { name: 'Week 5', payout: 38000 },
    { name: 'Week 6', payout: 42000 },
    { name: 'Week 7', payout: 45000 },
    { name: 'Week 8', payout: 50000 },
    { name: 'Week 9', payout: 48000 },
    { name: 'Week 10', payout: 58000 },
  ],
  'Last 90 Days': [
    { name: 'Wk 1', payout: 18000 },
    { name: 'Wk 2', payout: 22000 },
    { name: 'Wk 3', payout: 25000 },
    { name: 'Wk 4', payout: 20000 },
    { name: 'Wk 5', payout: 28000 },
    { name: 'Wk 6', payout: 33000 },
    { name: 'Wk 7', payout: 30000 },
    { name: 'Wk 8', payout: 36000 },
    { name: 'Wk 9', payout: 38000 },
    { name: 'Wk 10', payout: 42000 },
    { name: 'Wk 11', payout: 45000 },
    { name: 'Wk 12', payout: 58000 },
  ],
};

const initialPayouts = [
  {
    id: 'PAY-1001', sub: 'po_3OxxxxxxxxxxA',
    operator: 'Michael Rodriguez', init: 'MR', color: '#C5973E',
    period: 'Feb 8-14, 2024', loads: 3, amount: 4850.00,
    status: 'Completed', date: '2024-02-15',
    eta: 'Delivered', etaDate: '2024-02-15',
    route: 'Los Angeles → Phoenix', truckId: 'TRK-042',
  },
  {
    id: 'PAY-1002', sub: 'po_3OxxxxxxxxxxB',
    operator: 'Sarah Mitchell', init: 'SM', color: '#10B981',
    period: 'Feb 8-14, 2024', loads: 5, amount: 6420.00,
    status: 'Completed', date: '2024-02-15',
    eta: 'Delivered', etaDate: '2024-02-15',
    route: 'Houston → Dallas', truckId: 'TRK-017',
  },
  {
    id: 'PAY-1003', sub: 'po_3OxxxxxxxxxxC',
    operator: 'David Chen', init: 'DC', color: '#6366F1',
    period: 'Feb 9-15, 2024', loads: 7, amount: 8910.00,
    status: 'Pending', date: '2024-02-16',
    eta: 'Feb 18, 6:00 PM', etaDate: '2024-02-18',
    route: 'Chicago → Detroit', truckId: 'TRK-088',
  },
  {
    id: 'PAY-1004', sub: 'po_3OxxxxxxxxxxD',
    operator: 'Jennifer Williams', init: 'JW', color: '#8B5CF6',
    period: 'Feb 9-15, 2024', loads: 2, amount: 2340.00,
    status: 'Pending', date: '2024-02-16',
    eta: 'Feb 19, 2:00 PM', etaDate: '2024-02-19',
    route: 'Seattle → Portland', truckId: 'TRK-031',
  },
  {
    id: 'PAY-1005', sub: 'po_3OxxxxxxxxxxE',
    operator: 'Robert Thompson', init: 'RT', color: '#F59E0B',
    period: 'Feb 10-16, 2024', loads: 6, amount: 7230.00,
    status: 'Processing', date: '2024-02-17',
    eta: 'Feb 17, 10:00 PM', etaDate: '2024-02-17',
    route: 'New York → Boston', truckId: 'TRK-065',
  },
  {
    id: 'PAY-1006', sub: 'po_3OxxxxxxxxxxF',
    operator: 'Maria Garcia', init: 'MG', color: '#EF4444',
    period: 'Feb 6-12, 2024', loads: 1, amount: 1580.00,
    status: 'Failed', failNote: 'Invalid bank account information', date: '2024-02-13',
    eta: 'N/A', etaDate: null,
    route: 'Miami → Orlando', truckId: 'TRK-009',
  },
];

/* ─── Animated counter hook ─── */
function useCountUp(target, duration = 1200, prefix = '', decimals = 0) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(+(target * ease).toFixed(decimals));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, decimals]);
  return prefix + val.toLocaleString('en-US', decimals ? { minimumFractionDigits: decimals } : {});
}

/* ─── Stat card ─── */
function StatCard({ label, icon, iconClass, valueRaw, valueSuffix = '', sub, isChange }) {
  const displayVal = useCountUp(
    typeof valueRaw === 'number' ? valueRaw : 0,
    1300,
    typeof valueRaw === 'number' && valueSuffix === '$' ? '$' : '',
    typeof valueRaw === 'number' && valueSuffix === '$' ? 2 : 0
  );

  return (
    <div className="pay-stat-card">
      <div className="pay-stat-top">
        <span className="pay-stat-label">{label}</span>
        <div className={`pay-stat-icon ${iconClass}`}>{icon}</div>
      </div>
      <div className="pay-stat-val">
        {typeof valueRaw === 'number' ? displayVal : valueRaw}
      </div>
      {isChange
        ? <div className="pay-stat-change"><TrendingUp size={14} /> {isChange}</div>
        : <div className="pay-stat-sub">{sub}</div>
      }
    </div>
  );
}

/* ─── Custom Tooltip ─── */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="pay-tooltip">
        <p className="pay-tooltip-label">{label}</p>
        <p className="pay-tooltip-val">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

/* ─── Status helpers ─── */
const getStatusIcon = (status) => {
  switch (status) {
    case 'Completed': return <CheckCircle2 size={12} />;
    case 'Pending': return <Clock size={12} />;
    case 'Processing': return <Activity size={12} />;
    case 'Failed': return <AlertTriangle size={12} />;
    default: return null;
  }
};

const getEtaClass = (status, eta) => {
  if (status === 'Completed') return 'eta-delivered';
  if (status === 'Failed') return 'eta-na';
  if (status === 'Processing') return 'eta-soon';
  return 'eta-pending';
};

/* ─── Detail Modal ─── */
function DetailModal({ payout, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Payout Details</h3>
            <p className="modal-sub">{payout.id} · {payout.sub}</p>
          </div>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Status Banner */}
        <div className={`modal-status-banner modal-banner-${payout.status.toLowerCase()}`}>
          {getStatusIcon(payout.status)}
          <span>{payout.status}</span>
          {payout.failNote && <span className="modal-fail-note">— {payout.failNote}</span>}
        </div>

        {/* Details Grid */}
        <div className="modal-details-grid">
          <div className="modal-detail-item">
            <User size={14} className="modal-detail-icon" />
            <div>
              <p className="modal-detail-label">Owner Operator</p>
              <p className="modal-detail-val">{payout.operator}</p>
            </div>
          </div>
          <div className="modal-detail-item">
            <Hash size={14} className="modal-detail-icon" />
            <div>
              <p className="modal-detail-label">Truck ID</p>
              <p className="modal-detail-val">{payout.truckId}</p>
            </div>
          </div>
          <div className="modal-detail-item">
            <MapPin size={14} className="modal-detail-icon" />
            <div>
              <p className="modal-detail-label">Route</p>
              <p className="modal-detail-val">{payout.route}</p>
            </div>
          </div>
          <div className="modal-detail-item">
            <Calendar size={14} className="modal-detail-icon" />
            <div>
              <p className="modal-detail-label">Period</p>
              <p className="modal-detail-val">{payout.period}</p>
            </div>
          </div>
          <div className="modal-detail-item">
            <Truck size={14} className="modal-detail-icon" />
            <div>
              <p className="modal-detail-label">Loads</p>
              <p className="modal-detail-val">{payout.loads} loads</p>
            </div>
          </div>
          <div className="modal-detail-item">
            <DollarSign size={14} className="modal-detail-icon" />
            <div>
              <p className="modal-detail-label">Amount</p>
              <p className="modal-detail-val modal-amount">${payout.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
          <div className="modal-detail-item">
            <Timer size={14} className="modal-detail-icon" />
            <div>
              <p className="modal-detail-label">ETA</p>
              <p className={`modal-detail-val modal-eta-val ${getEtaClass(payout.status, payout.eta)}`}>{payout.eta}</p>
            </div>
          </div>
          <div className="modal-detail-item">
            <Calendar size={14} className="modal-detail-icon" />
            <div>
              <p className="modal-detail-label">Payment Date</p>
              <p className="modal-detail-val">{payout.date}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-actions">
          <button className="modal-btn-secondary" onClick={onClose}>Close</button>
          <button className="modal-btn-primary" onClick={() => window.open('https://dashboard.stripe.com', '_blank')}>
            <CreditCard size={14} /> View in Stripe <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [chartPeriod, setChartPeriod] = useState('Last 30 Days');
  const [chartKey, setChartKey] = useState(0);   // force re-mount → re-animate
  const [selectedPayout, setSelectedPayout] = useState(null);

  const chartData = chartDatasets[chartPeriod];

  const handlePeriodChange = (e) => {
    setChartPeriod(e.target.value);
    setChartKey(k => k + 1);  // re-trigger animation
  };

  const filteredPayouts = initialPayouts.filter(p => {
    const matchSearch = p.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All Status' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="payments-page fade-in">

      {/* Header */}
      <div className="payments-header">
        <div className="payments-title-group">
          <h2 className="payments-title">Payments &amp; Payouts</h2>
          <p className="payments-subtitle">Monitor Stripe payouts and payment status</p>
        </div>
        <div className="payments-header-actions">
          <button className="btn-export-pay">
            <Download size={16} /> Export Report
          </button>
          <button className="btn-stripe" onClick={() => window.open('https://dashboard.stripe.com', '_blank')}>
            <CreditCard size={16} /> View in Stripe
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="pay-stats-grid">
        <StatCard
          label="Total Payouts" iconClass="icon-blue-pay"
          icon={<DollarSign size={16} />}
          valueRaw={31330} valueSuffix="$"
          isChange="+12.5% vs last week"
        />
        <StatCard
          label="Completed" iconClass="icon-green-pay"
          icon={<CheckCircle2 size={16} />}
          valueRaw={11270} valueSuffix="$"
          sub="2 transactions"
        />
        <StatCard
          label="Pending" iconClass="icon-orange-pay"
          icon={<Clock size={16} />}
          valueRaw={18480} valueSuffix="$"
          sub="3 transactions"
        />
        <StatCard
          label="Failed" iconClass="icon-red-pay"
          icon={<AlertTriangle size={16} />}
          valueRaw={1}
          sub="Requires attention"
        />
      </div>

      {/* Payout Trends Chart */}
      <div className="pay-chart-section">
        <div className="pay-chart-header">
          <h3 className="pay-chart-title">Payout Trends</h3>
          <select className="pay-period-select" value={chartPeriod} onChange={handlePeriodChange}>
            <option>Last 30 Days</option>
            <option>Last 60 Days</option>
            <option>Last 90 Days</option>
          </select>
        </div>

        {/* Animated chart – key forces full re-mount when period changes */}
        <div className="pay-chart-animate-wrapper" key={chartKey}>
          <ResponsiveContainer width="100%" height={290}>
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <defs>
                <linearGradient id="payoutGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C5973E" stopOpacity={0.20} />
                  <stop offset="95%" stopColor="#C5973E" stopOpacity={0} />
                </linearGradient>
                {/* Glow filter */}
                <filter id="lineGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94A3B8', fontSize: 12 }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#C5973E', strokeWidth: 1, strokeDasharray: '4 2' }} />
              <Area
                type="monotone"
                dataKey="payout"
                stroke="#C5973E"
                strokeWidth={2.5}
                fill="url(#payoutGradient)"
                dot={{ fill: '#C5973E', stroke: '#FFFFFF', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, stroke: '#C5973E', strokeWidth: 2, fill: '#FFFFFF' }}
                animationDuration={1800}
                animationEasing="ease-out"
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="pay-filters">
        <div className="pay-search-box">
          <Search size={18} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search by operator name or payout ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="pay-filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All Status</option>
          <option>Completed</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Failed</option>
        </select>
      </div>

      {/* Payouts Table */}
      <div className="pay-table-wrapper">
        <div className="pay-grid pay-table-header">
          <div>PAYOUT ID</div>
          <div>OWNER OPERATOR</div>
          <div>PERIOD</div>
          <div>LOADS</div>
          <div>AMOUNT</div>
          <div>STATUS</div>
          <div>ETA</div>
          <div>DATE</div>
          <div>ACTIONS</div>
        </div>
        {filteredPayouts.length === 0 && (
          <div className="pay-empty-row">No payouts match your filters.</div>
        )}
        {filteredPayouts.map((payout) => (
          <div key={payout.id} className="pay-grid pay-row">
            <div className="pay-id-cell">
              <span className="pay-id-main">{payout.id}</span>
              <span className="pay-id-sub">{payout.sub}</span>
            </div>
            <div className="pay-operator-cell">
              <div className="pay-avatar" style={{ backgroundColor: payout.color }}>{payout.init}</div>
              <span className="pay-operator-name">{payout.operator}</span>
            </div>
            <div className="pay-period-cell">
              <Calendar size={14} /> {payout.period}
            </div>
            <div className="pay-loads-cell">{payout.loads} loads</div>
            <div className="pay-amount-cell">${payout.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            <div>
              <span className={`pay-status-pill pay-status-${payout.status.toLowerCase()}`}>
                {getStatusIcon(payout.status)} {payout.status}
              </span>
              {payout.failNote && <div className="pay-failed-note">{payout.failNote}</div>}
            </div>
            {/* ETA Column */}
            <div>
              <span className={`pay-eta-badge ${getEtaClass(payout.status, payout.eta)}`}>
                <Timer size={11} /> {payout.eta}
              </span>
            </div>
            <div className="pay-date-cell">{payout.date}</div>
            <div>
              <button className="pay-view-link" onClick={() => setSelectedPayout(payout)}>
                <Eye size={14} /> View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stripe Integration Banner */}
      <div className="stripe-banner">
        <div className="stripe-icon-box"><CreditCard size={22} /></div>
        <div className="stripe-info">
          <h4>Stripe Integration Active</h4>
          <p>All payouts are processed through Stripe Connect. Owner operators receive automatic payouts to their connected bank accounts. View detailed transaction history and manage payment settings in your <a href="https://dashboard.stripe.com" target="_blank" rel="noreferrer">Stripe Dashboard</a>.</p>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedPayout && (
        <DetailModal payout={selectedPayout} onClose={() => setSelectedPayout(null)} />
      )}
    </div>
  );
};

export default Payments;
