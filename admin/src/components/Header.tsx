import React from 'react';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="admin-header">
      <div className="header-title">
        <h2>{title}</h2>
      </div>

      <div className="header-actions">
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search records..." 
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '0.5rem 1rem 0.5rem 2.2rem',
              color: 'var(--text-main)',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
        </div>

        <button style={{
          background: 'none',
          border: '1px solid var(--border-color)',
          borderRadius: '50%',
          width: '38px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          cursor: 'pointer'
        }}>
          <Bell size={18} />
        </button>

        <div className="admin-avatar" title="Administrator">
          AD
        </div>
      </div>
    </header>
  );
};
