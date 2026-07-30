import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Globe, Menu, X, PhoneCall } from 'lucide-react';
import { TRUST_INFO } from '../constants';

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isTamil = i18n.language === 'ta';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ta' ? 'en' : 'ta';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('i18nextLng', nextLang);
    localStorage.setItem('sst_lang_selected', 'true');
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/programs', label: t('nav.programs') },
    { path: '/impact', label: t('nav.impact') },
    { path: '/events', label: t('nav.events') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/news', label: t('nav.news') },
    { path: '/contact', label: t('nav.contact') },
    { path: '/volunteer', label: t('nav.volunteer') },
  ];

  return (
    <>
      {/* Fixed Top Glass Navbar with Blurry Backdrop Effect & Gold Top Accent */}
      <nav
        className="fixed-top w-100 py-2 transition-all duration-300 shadow-sm"
        style={{
          zIndex: 1050,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          background: isScrolled
            ? 'rgba(255, 253, 240, 0.95)'
            : 'rgba(255, 253, 240, 0.88)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          borderTop: '2.5px solid #D4AF37',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          boxShadow: isScrolled ? '0 10px 28px rgba(18, 13, 8, 0.08)' : '0 2px 10px rgba(0, 0, 0, 0.03)',
        }}
      >
        <div className="container-fluid px-3 px-lg-4 d-flex align-items-center justify-content-between">
          {/* Logo & Official Emblem */}
          <Link to="/" className="d-flex align-items-center text-decoration-none gap-2.5">
            <img
              src="/assets/images/logo.jpg"
              alt="Sri Susheela Trust Logo"
              className="rounded-circle p-0.5 bg-white border border-warning"
              style={{
                width: '44px',
                height: '44px',
                border: '1.5px solid #FFD700',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.25)',
              }}
            />
            <div>
              <h5
                className={`fw-bold text-navy mb-0 leading-none ${
                  isTamil ? 'font-tamil fs-6' : 'font-heading fs-6'
                }`}
                style={{ letterSpacing: isTamil ? '0.3px' : '0.8px' }}
              >
                {isTamil ? 'ஸ்ரீ சுசீலா அறக்கட்டளை' : 'SRI SUSHEELA TRUST'}
              </h5>
              <span
                className={`text-gradient-gold small fw-bold text-uppercase d-block mt-0.5 ${
                  isTamil ? 'font-tamil' : ''
                }`}
                style={{ fontSize: '0.65rem', letterSpacing: isTamil ? '0.3px' : '0.8px' }}
              >
                {isTamil ? 'மக்கள் நலக் குழு' : 'PEOPLE WELFARE GROUP'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Vertical Dividers */}
          <div className="d-none d-xl-flex align-items-center gap-1">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link px-3 py-1.5 rounded-3 fw-bold transition-all ${
                      isTamil ? 'font-tamil' : ''
                    } ${
                      isActive
                        ? 'bg-warning text-dark shadow-xs'
                        : 'text-navy hover-text-warning'
                    }`
                  }
                  style={{ fontSize: isTamil ? '0.88rem' : '0.9rem', whiteSpace: 'nowrap' }}
                >
                  {link.label}
                </NavLink>

                {/* Subtle Vertical Divider Line between items */}
                {idx < navLinks.length - 1 && (
                  <span
                    className="mx-1 opacity-40 select-none pointer-events-none"
                    style={{ fontSize: '0.82rem', fontWeight: 300, color: '#D4AF37' }}
                  >
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Action Area (Language Toggle + Mobile Toggle) */}
          <div className="d-flex align-items-center gap-2">
            {/* Styled Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              className="btn rounded-3 px-3 py-1.5 d-inline-flex align-items-center gap-1.5 fw-bold text-navy shadow-xs transition-all hover-scale"
              style={{
                background: 'linear-gradient(135deg, #FFFDF5 0%, #FEF08A 100%)',
                border: '1.5px solid #D4AF37',
                fontSize: '0.84rem',
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.22)',
              }}
              title="Select Language / மொழியை மாற்றுக"
            >
              <Globe size={15} className="text-warning fill-warning" />
              <span className={isTamil ? 'font-tamil' : ''}>
                {i18n.language === 'ta' ? 'EN' : 'தமிழ்'}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-light rounded-circle p-1.5 d-xl-none border d-flex align-items-center justify-content-center ms-1 shadow-xs"
              style={{ width: '38px', height: '38px' }}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={20} className="text-danger" /> : <Menu size={20} className="text-navy" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 z-5 d-xl-none"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ zIndex: 1050 }}
        >
          <div
            className="position-absolute top-0 end-0 h-100 bg-white shadow-lg p-4 d-flex flex-column"
            style={{ width: '310px', maxWidth: '85vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-3">
              <div className="d-flex align-items-center gap-2">
                <img src="/assets/images/logo.jpg" alt="Logo" className="rounded-circle border border-warning" style={{ width: '36px', height: '36px' }} />
                <span className={`fw-bold text-navy ${isTamil ? 'font-tamil' : 'font-heading'}`}>
                  {isTamil ? 'பட்டி (Menu)' : 'Menu'}
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn btn-light rounded-circle p-1.5 border"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="overflow-y-auto flex-grow-1 nav flex-column gap-1 pe-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link px-3 py-2.5 rounded-3 fw-bold text-start d-flex align-items-center justify-content-between ${
                      isActive ? 'bg-warning text-dark' : 'text-navy hover-bg-light'
                    }`
                  }
                >
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-3 border-top mt-auto text-center small text-muted">
              <a href={`tel:${TRUST_INFO.phonePrimary}`} className="text-decoration-none text-navy fw-semibold">
                <PhoneCall size={14} className="me-1 text-warning" />
                {TRUST_INFO.phonePrimary}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
