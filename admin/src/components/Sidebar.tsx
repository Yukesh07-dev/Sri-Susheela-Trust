import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, BookOpen, Calendar, Image as ImageIcon, Newspaper, MessageSquare, Users, Settings, LogOut, Mail } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('sst_admin_token');
    localStorage.removeItem('sst_admin_user');
    navigate('/login');
  };

  return (
    <aside className="admin-sidebar">
      <div className="brand-header">
        <img
          src="/logo.jpg"
          alt="Sri Susheela Trust Logo"
          style={{ width: '42px', height: '42px', borderRadius: '50%', border: '2px solid #D4AF37', boxShadow: '0 0 12px rgba(212, 175, 55, 0.45)', objectFit: 'cover' }}
        />
        <div className="brand-title">
          <h3>Sri Susheela</h3>
          <span>{t('adminPortal')}</span>
        </div>
      </div>

      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>{t('nav.dashboard')}</span>
        </NavLink>

        <NavLink to="/programs" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} />
          <span>{t('nav.programs')}</span>
        </NavLink>

        <NavLink to="/events" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Calendar size={20} />
          <span>{t('nav.events')}</span>
        </NavLink>

        <NavLink to="/gallery" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <ImageIcon size={20} />
          <span>{t('nav.gallery')}</span>
        </NavLink>

        <NavLink to="/news" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Newspaper size={20} />
          <span>{t('nav.news')}</span>
        </NavLink>

        <NavLink to="/testimonials" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <MessageSquare size={20} />
          <span>{t('nav.testimonials')}</span>
        </NavLink>

        <NavLink to="/volunteers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} />
          <span>{t('nav.volunteers')}</span>
        </NavLink>

        <NavLink to="/contacts" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Mail size={20} />
          <span>Contact Requests</span>
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={20} />
          <span>{t('nav.settings')}</span>
        </NavLink>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <button
          onClick={handleLogout}
          className="nav-item"
          style={{ width: '100%', background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', textAlign: 'left' }}
        >
          <LogOut size={20} />
          <span>{t('signOut')}</span>
        </button>
      </div>
    </aside>
  );
};
