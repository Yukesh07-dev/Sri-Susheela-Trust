import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, Search, Globe, ChevronDown, Settings, Mail, LogOut, ShieldCheck, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = i18n.language || 'en';

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get user info from localStorage
  const storedUser = localStorage.getItem('sst_admin_user');
  const user = storedUser ? JSON.parse(storedUser) : { name: 'Sri Susheela Admin', email: 'admin@srisusheelatrust.org' };

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'ta' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const handleLogout = () => {
    localStorage.removeItem('sst_admin_token');
    localStorage.removeItem('sst_admin_user');
    navigate('/login');
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="admin-header">
      <div className="header-title">
        <h2>{title}</h2>
      </div>

      <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Language Switcher Button */}
        <button
          onClick={toggleLanguage}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
            color: '#FFD700',
            border: '1.5px solid #D4AF37',
            borderRadius: '20px',
            padding: '0.4rem 0.9rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(122, 28, 28, 0.4)',
            transition: 'all 0.2s ease',
          }}
          title={currentLang === 'en' ? 'Switch to Tamil (தமிழ்)' : 'Switch to English'}
        >
          <Globe size={16} color="#FFD700" />
          <span>{currentLang === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>

        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              padding: '0.5rem 1rem 0.5rem 2.2rem',
              color: 'var(--text-main)',
              fontSize: '0.875rem',
              outline: 'none',
            }}
          />
        </div>

        <button
          style={{
            background: 'none',
            border: '1px solid var(--border-color)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
        >
          <Bell size={18} />
        </button>

        {/* Interactive Admin Profile Dropdown Container */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.35rem 0.75rem 0.35rem 0.4rem',
              background: isDropdownOpen ? 'rgba(34, 25, 16, 0.95)' : 'rgba(26, 18, 12, 0.85)',
              border: '1.5px solid rgba(212, 175, 55, 0.45)',
              borderRadius: '30px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.35), 0 0 12px rgba(212, 175, 55, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
            }}
            title="Click to view Profile Menu"
          >
            <div style={{ position: 'relative', width: '38px', height: '38px' }}>
              <img
                src="/logo.jpg"
                alt="Admin Logo"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #D4AF37',
                  boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '1px',
                  right: '1px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: '#10B981',
                  borderRadius: '50%',
                  border: '2px solid #1A120C',
                  boxShadow: '0 0 8px #10B981',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ color: '#FFFDF5', fontSize: '0.85rem', fontWeight: 700 }}>
                {t('administrator') || 'Admin'}
              </span>
              <span style={{ color: '#10B981', fontSize: '0.72rem', fontWeight: 600 }}>
                ● Online
              </span>
            </div>
            <ChevronDown size={16} color="#D4AF37" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
          </div>

          {/* Floating Dropdown Card */}
          {isDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '260px',
                background: '#1A120C',
                border: '1.5px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.15)',
                padding: '1rem',
                zIndex: 999,
                animation: 'fadeIn 0.2s ease-in-out',
              }}
            >
              {/* Header Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.85rem', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                    border: '1.5px solid #D4AF37',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFD700',
                  }}
                >
                  <ShieldCheck size={22} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ color: '#FFFDF5', fontWeight: 700, fontSize: '0.92rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {user.name || 'Sri Susheela Admin'}
                  </div>
                  <div style={{ color: '#A89888', fontSize: '0.78rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {user.email}
                  </div>
                  <span style={{ display: 'inline-block', background: 'rgba(212, 175, 55, 0.15)', color: '#FFD700', fontSize: '0.68rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: '4px', marginTop: '0.2rem' }}>
                    Super Admin
                  </span>
                </div>
              </div>

              {/* Menu Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.75rem' }}>
                <Link
                  to="/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '8px',
                    color: '#E2E8F0',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Settings size={16} color="#D4AF37" />
                  <span>Account Settings</span>
                </Link>

                <Link
                  to="/contacts"
                  onClick={() => setIsDropdownOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '8px',
                    color: '#E8DFD5',
                    textDecoration: 'none',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.12)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Mail size={16} color="#D4AF37" />
                  <span>Contact Requests</span>
                </Link>

                <div style={{ height: '1px', background: 'rgba(212, 175, 55, 0.2)', margin: '0.25rem 0' }} />

                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '8px',
                    color: '#EF4444',
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background-color 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <LogOut size={16} color="#EF4444" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
