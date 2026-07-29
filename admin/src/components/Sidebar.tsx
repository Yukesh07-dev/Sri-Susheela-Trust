import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, HeartHandshake, Calendar, Users, Newspaper, Settings, LogOut } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="admin-sidebar">
      <div className="brand-header">
        <div className="brand-logo">SST</div>
        <div className="brand-title">
          <h3>Sri Susheela</h3>
          <span>Admin Portal</span>
        </div>
      </div>

      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/donations" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <HeartHandshake size={20} />
          <span>Donations</span>
        </NavLink>

        <NavLink to="/events" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Calendar size={20} />
          <span>Events</span>
        </NavLink>

        <NavLink to="/volunteers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} />
          <span>Volunteers</span>
        </NavLink>

        <NavLink to="/news" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Newspaper size={20} />
          <span>News & Media</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <a href="#logout" className="nav-item" style={{ color: 'var(--danger-color)' }}>
          <LogOut size={20} />
          <span>Sign Out</span>
        </a>
      </div>
    </aside>
  );
};
