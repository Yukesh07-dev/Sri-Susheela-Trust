import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Globe, Menu, X, PhoneCall } from 'lucide-react';
import { TRUST_INFO } from '../constants';

interface NavbarProps {
  onOpenDonate: () => void;
  onOpenLanguageModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDonate, onOpenLanguageModal }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    if (onOpenLanguageModal) {
      onOpenLanguageModal();
    } else {
      const nextLang = i18n.language === 'ta' ? 'en' : 'ta';
      i18n.changeLanguage(nextLang);
    }
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
      {/* Floating Sticky Glass Navbar */}
      <nav
        className={`sticky-top w-100 transition-all duration-300 ${
          isScrolled ? 'glass-nav-gold shadow-sm py-2' : 'bg-white py-2.5 border-bottom'
        }`}
        style={{ zIndex: 1040 }}
      >
        <div className="container-fluid px-3 px-lg-4 d-flex align-items-center justify-content-between">
          {/* Logo & Official Emblem */}
          <Link to="/" className="d-flex align-items-center text-decoration-none gap-2.5">
            <img
              src="/assets/images/logo.jpg"
              alt="Sri Susheela Trust Logo"
              className="rounded-circle shadow-sm p-0.5 bg-white border border-warning"
              style={{ width: '48px', height: '48px' }}
            />
            <div>
              <h5 className="fw-bold text-navy mb-0 font-heading leading-none fs-5">
                SRI SUSHEELA TRUST
              </h5>
              <span className="text-gradient-gold small fw-bold text-uppercase tracking-wider d-block" style={{ fontSize: '0.68rem', letterSpacing: '0.8px' }}>
                PEOPLE WELFARE GROUP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="d-none d-xl-flex align-items-center gap-1 bg-light rounded-pill px-3 py-1 border border-warning border-opacity-30">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `nav-link px-3 py-1.5 rounded-pill fw-bold transition-all ${
                    isActive
                      ? 'bg-warning text-dark shadow-sm'
                      : 'text-navy hover-text-warning'
                  }`
                }
                style={{ fontSize: '0.88rem' }}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Action Area (Donate + Language Toggle + Mobile Toggle) */}
          <div className="d-flex align-items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="btn btn-sm btn-outline-warning rounded-pill px-2.5 py-1.5 d-inline-flex align-items-center gap-1 fw-bold text-dark border-warning"
              style={{ fontSize: '0.82rem' }}
              title="Select Language"
            >
              <Globe size={15} className="text-warning" />
              <span>{i18n.language === 'ta' ? 'EN' : 'தமிழ்'}</span>
            </button>

            {/* Donate CTA */}
            <button
              onClick={onOpenDonate}
              className="btn btn-sst-gold rounded-pill px-3 py-2 d-inline-flex align-items-center gap-1.5 shadow-sm"
            >
              <Heart size={16} fill="#120D08" />
              <span className="d-none d-sm-inline">{t('nav.donate')}</span>
              <span className="d-inline d-sm-none">Donate</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-light rounded-circle p-2 d-xl-none border d-flex align-items-center justify-content-center ms-1"
              style={{ width: '42px', height: '42px' }}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} className="text-danger" /> : <Menu size={22} className="text-navy" />}
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
                <img src="/assets/images/logo.jpg" alt="Logo" className="rounded-circle" style={{ width: '36px', height: '36px' }} />
                <span className="fw-bold text-navy font-heading">Menu</span>
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
            <div className="pt-3 border-top mt-auto">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="btn btn-sst-gold w-100 py-2.5 justify-content-center mb-2"
              >
                <Heart size={18} fill="#120D08" />
                {t('nav.donate')}
              </button>

              <div className="text-center small text-muted mt-2">
                <a href={`tel:${TRUST_INFO.phonePrimary}`} className="text-decoration-none text-navy fw-semibold">
                  <PhoneCall size={14} className="me-1 text-warning" />
                  {TRUST_INFO.phonePrimary}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
