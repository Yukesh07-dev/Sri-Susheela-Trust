import React from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { mockEvents } from '../services/api';
import { Plus } from 'lucide-react';

export const EventsPage: React.FC = () => {
  return (
    <AdminLayout title="Trust Events & Programs">
      <div className="data-card">
        <div className="data-card-header">
          <h3>Scheduled Events</h3>
          <button className="btn-primary">
            <Plus size={16} /> Create New Event
          </button>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Event Code</th>
                <th>Title</th>
                <th>Date</th>
                <th>Location</th>
                <th>Attendees</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockEvents.map((evt) => (
                <tr key={evt.id}>
                  <td style={{ fontWeight: 600 }}>{evt.id}</td>
                  <td style={{ fontWeight: 500 }}>{evt.title}</td>
                  <td>{evt.date}</td>
                  <td>{evt.location}</td>
                  <td>{evt.attendees} registered</td>
                  <td>
                    <span className={`badge ${evt.status === 'Upcoming' ? 'badge-info' : 'badge-success'}`}>
                      {evt.status}
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
