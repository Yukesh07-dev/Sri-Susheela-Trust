import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, Globe } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'ta' : 'en';
    i18n.changeLanguage(nextLang);
  };

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
            background: 'linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 100%)',
            color: '#38BDF8',
            border: '1.5px solid #38BDF8',
            borderRadius: '20px',
            padding: '0.4rem 0.9rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.2s ease',
          }}
          title={currentLang === 'en' ? 'Switch to Tamil (தமிழ்)' : 'Switch to English'}
        >
          <Globe size={16} color="#38BDF8" />
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

        <div className="admin-avatar" title={t('administrator')}>
          AD
        </div>
      </div>
    </header>
  );
};
