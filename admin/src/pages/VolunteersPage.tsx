import React from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { mockVolunteers } from '../services/api';
import { UserPlus } from 'lucide-react';

export const VolunteersPage: React.FC = () => {
  return (
    <AdminLayout title="Volunteer Roster">
      <div className="data-card">
        <div className="data-card-header">
          <h3>Active & Registered Volunteers</h3>
          <button className="btn-primary">
            <UserPlus size={16} /> Add Volunteer
          </button>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Assigned Role</th>
                <th>Joined Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockVolunteers.map((vol) => (
                <tr key={vol.id}>
                  <td style={{ fontWeight: 600 }}>{vol.id}</td>
                  <td>{vol.name}</td>
                  <td>{vol.email}</td>
                  <td>{vol.phone}</td>
                  <td>{vol.role}</td>
                  <td>{vol.joinedDate}</td>
                  <td>
                    <span className={`badge ${vol.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                      {vol.status}
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
