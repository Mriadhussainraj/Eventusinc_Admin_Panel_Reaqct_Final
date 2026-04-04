import React from 'react';
import { 
  Download, 
  TrendingUp, 
  BarChart2, 
  Clock, 
  FileText,
  ChevronRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import './Reports.css';

const revenueData = [
  { name: 'Sep', revenue: 11200 },
  { name: 'Oct', revenue: 13800 },
  { name: 'Nov', revenue: 12400 },
  { name: 'Dec', revenue: 14600 },
  { name: 'Jan', revenue: 15200 },
  { name: 'Feb', revenue: 12350 },
];

const loadCompletionData = [
  { name: 'Sep', completed: 42, cancelled: 3 },
  { name: 'Oct', completed: 51, cancelled: 2 },
  { name: 'Nov', completed: 38, cancelled: 5 },
  { name: 'Dec', completed: 55, cancelled: 1 },
  { name: 'Jan', completed: 47, cancelled: 4 },
  { name: 'Feb', completed: 32, cancelled: 2 },
];

const summaryData = [
  { month: 'Sep 2026', revenue: '$11,200', loads: 42, cancelled: 3, rate: '93.3%' },
  { month: 'Oct 2026', revenue: '$13,800', loads: 51, cancelled: 2, rate: '96.2%' },
  { month: 'Nov 2026', revenue: '$12,400', loads: 38, cancelled: 5, rate: '88.4%' },
  { month: 'Dec 2026', revenue: '$14,600', loads: 55, cancelled: 1, rate: '98.2%' },
  { month: 'Jan 2026', revenue: '$15,200', loads: 47, cancelled: 4, rate: '92.2%' },
  { month: 'Feb 2026', revenue: '$12,350', loads: 32, cancelled: 2, rate: '94.1%' },
];

const Reports = () => {
  const handleExport = () => {
    const headers = ['Month', 'Revenue', 'Loads', 'Cancelled', 'Completion Rate'];
    const csvContent = [
      headers.join(','),
      ...summaryData.map(row => [
        row.month,
        row.revenue.replace(/,/g, ''),
        row.loads,
        row.cancelled,
        row.rate
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'reports_summary.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-page fade-in">
      <div className="reports-header">
        <div className="reports-title-group">
          <h2 className="reports-title">Reports</h2>
          <p className="reports-subtitle">Analytics and performance insights</p>
        </div>
        <button className="btn-export-all" onClick={handleExport}>
          <Download size={16} /> Export All
        </button>
      </div>

      <div className="reports-stats-grid">
        <div className="report-stat-card">
          <div className="report-stat-icon-box icon-gold">
            <TrendingUp size={20} />
          </div>
          <div className="report-stat-info">
            <h4 className="report-stat-name">Revenue Report</h4>
            <p className="report-stat-desc">Monthly revenue breakdown</p>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon-box icon-orange">
            <BarChart2 size={20} />
          </div>
          <div className="report-stat-info">
            <h4 className="report-stat-name">Load Analytics</h4>
            <p className="report-stat-desc">Load completion metrics</p>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon-box icon-brown">
            <Clock size={20} />
          </div>
          <div className="report-stat-info">
            <h4 className="report-stat-name">Fleet Report</h4>
            <p className="report-stat-desc">Vehicle utilization</p>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon-box icon-gold-alt">
            <FileText size={20} />
          </div>
          <div className="report-stat-info">
            <h4 className="report-stat-name">Driver Performance</h4>
            <p className="report-stat-desc">Individual driver stats</p>
          </div>
        </div>
      </div>

      <div className="reports-charts-row">
        <div className="chart-container revenue-chart">
          <h3 className="chart-title">Revenue Trend</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5973E" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#C5973E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 500}}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 500}}
                  tickFormatter={(value) => `$${value/1000}k`}
                  domain={[0, 16000]}
                  ticks={[0, 4000, 8000, 12000, 16000]}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                  itemStyle={{ fontWeight: 600, color: '#1E293B' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#C5973E" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-container completion-chart">
          <h3 className="chart-title">Load Completion</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loadCompletionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 500}}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 500}}
                  domain={[0, 60]}
                  ticks={[0, 15, 30, 45, 60]}
                />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}}
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    padding: '12px'
                  }}
                />
                <Bar dataKey="completed" fill="#22C55E" radius={[4, 4, 0, 0]} barSize={32} animationDuration={1500} />
                <Bar dataKey="cancelled" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={8} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="reports-table-section">
        <h3 className="table-section-title">Monthly Summary</h3>
        <div className="reports-table-wrapper">
          <table className="reports-summary-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Revenue</th>
                <th>Loads</th>
                <th>Cancelled</th>
                <th>Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              {summaryData.map((row, index) => (
                <tr key={index}>
                  <td>{row.month}</td>
                  <td className="font-bold">{row.revenue}</td>
                  <td>{row.loads}</td>
                  <td className="text-red">{row.cancelled}</td>
                  <td className="text-green font-bold">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
