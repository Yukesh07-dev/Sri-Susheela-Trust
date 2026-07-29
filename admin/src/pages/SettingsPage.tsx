import React from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { Save } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <AdminLayout title="Portal & Trust Configuration">
      <div className="data-card" style={{ maxWidth: '800px' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Trust Information</h3>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Trust Organization Name</label>
            <input type="text" defaultValue="Sri Susheela Trust" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Contact Email</label>
            <input type="email" defaultValue="contact@srisusheelatrust.org" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Helpline Phone</label>
            <input type="text" defaultValue="+91 98765 43210" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>Office Address</label>
            <textarea rows={3} defaultValue="123 Trust Bhavan, Main Road, City - 500001" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: '#fff' }} />
          </div>
          <div>
            <button className="btn-primary" type="submit">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
