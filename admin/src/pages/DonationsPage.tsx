import React from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { mockDonations } from '../services/api';
import { Plus, Download } from 'lucide-react';

export const DonationsPage: React.FC = () => {
  return (
    <AdminLayout title="Donation Records Management">
      <div className="data-card">
        <div className="data-card-header">
          <h3>All Donation Transactions</h3>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-primary" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
              <Download size={16} /> Export CSV
            </button>
            <button className="btn-primary">
              <Plus size={16} /> Record Donation
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Receipt No</th>
                <th>Donor Name</th>
                <th>Category / Purpose</th>
                <th>Date</th>
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
                  <td>{item.date}</td>
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
    </AdminLayout>
  );
};
