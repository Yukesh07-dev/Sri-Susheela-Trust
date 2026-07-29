import React from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { mockDashboardStats, mockDonations, mockEvents } from '../services/api';
import { IndianRupee, Calendar, Users, Heart, Plus } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <AdminLayout title="Overview Dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Total Donations Raised</div>
            <div className="stat-value">₹{mockDashboardStats.totalDonations.toLocaleString()}</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <IndianRupee />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Active Events</div>
            <div className="stat-value">{mockDashboardStats.activeEvents}</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
            <Calendar />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Registered Volunteers</div>
            <div className="stat-value">{mockDashboardStats.registeredVolunteers}</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
            <Users />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <div className="stat-label">Lives Impacted</div>
            <div className="stat-value">{mockDashboardStats.beneficiariesHelped.toLocaleString()}+</div>
          </div>
          <div className="stat-icon" style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
            <Heart />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div className="data-card">
          <div className="data-card-header">
            <h3>Recent Donations</h3>
            <button className="btn-primary">
              <Plus size={16} /> Add Record
            </button>
          </div>
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Donor Name</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockDonations.map((item) => (
                  <tr key={item.id}>
                    <td style={{ fontWeight: 600 }}>{item.id}</td>
                    <td>{item.donorName}</td>
                    <td>{item.category}</td>
                    <td style={{ color: '#34d399', fontWeight: 600 }}>₹{item.amount.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${item.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="data-card">
          <div className="data-card-header">
            <h3>Upcoming Events</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mockEvents.map((evt) => (
              <div key={evt.id} style={{ 
                padding: '1rem', 
                backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                borderRadius: '12px',
                border: '1px solid var(--border-color)'
              }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.35rem' }}>{evt.title}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 {evt.location}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)', marginTop: '0.5rem', fontWeight: 500 }}>📅 {evt.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
