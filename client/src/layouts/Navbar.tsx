import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, Globe, Menu, X, PhoneCall } from 'lucide-react';
import { TRUST_INFO } from '../constants';

interface NavbarProps {
  onOpenDonate?: () => void;
  onOpenLanguageModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDonate, onOpenLanguageModal }) => {
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
    if (onOpenLanguageModal) {
      onOpenLanguageModal();
    } else {
      const nextLang = isTamil ? 'en' : 'ta';
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
      {/* Fixed-height Sticky Navbar */}
      <nav
        className={`sst-navbar sticky-top w-100 transition-all duration-300 ${
          isScrolled ? 'glass-nav-gold shadow-sm' : 'bg-white border-bottom'
        }`}
        style={{ zIndex: 1040 }}
      >
        <div className="sst-navbar__inner container-fluid px-3 px-lg-4 d-flex align-items-center justify-content-between">
          {/* Logo & Official Emblem */}
          <Link to="/" className="sst-navbar__logo d-flex align-items-center text-decoration-none gap-2">
            <img
              src="/assets/images/logo.jpg"
              alt="Sri Susheela Trust Logo"
              className="sst-navbar__logo-img rounded-circle shadow-sm bg-white border border-warning"
            />
            <div className="sst-navbar__logo-text">
              <h5 className="fw-bold text-navy mb-0 font-heading leading-none sst-navbar__brand-name">
                SRI SUSHEELA TRUST
              </h5>
              <span className="text-gradient-gold fw-bold text-uppercase d-block sst-navbar__tagline">
                PEOPLE WELFARE GROUP
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="sst-navbar__links d-none d-xl-flex align-items-center bg-light rounded-pill border border-warning border-opacity-30 px-1 py-1">
            {navLinks.map((link, index) => (
              <React.Fragment key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `sst-navbar__link nav-link rounded-pill fw-semibold transition-all ${
                      isActive
                        ? 'bg-warning text-dark shadow-sm'
                        : 'text-navy hover-text-warning'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
                {index < navLinks.length - 1 && (
                  <div
                    className="sst-navbar__divider bg-warning opacity-40 mx-1"
                    style={{ width: '1px', height: '16px', flexShrink: 0 }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Action Area (Language + Donate + Mobile Toggle) */}
          <div className="sst-navbar__actions d-flex align-items-center gap-2">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="sst-navbar__lang-btn btn btn-sm btn-outline-warning rounded-pill d-inline-flex align-items-center gap-1 fw-bold text-dark border-warning"
              title="Select Language"
            >
              <Globe size={15} className="text-warning" />
              <span>{isTamil ? 'EN' : 'தமிழ்'}</span>
            </button>

            <div className="d-none d-sm-block bg-warning opacity-40 mx-1" style={{ width: '1px', height: '20px' }} />

            {/* Donate CTA */}
            {onOpenDonate && (
              <>
                <button
                  onClick={onOpenDonate}
                  className="sst-navbar__donate-btn btn btn-sst-gold rounded-pill d-none d-sm-inline-flex align-items-center gap-1.5 shadow-sm"
                >
                  <Heart size={16} fill="#120D08" />
                  <span>{t('nav.donate')}</span>
                </button>

                <div className="d-none d-xl-block bg-warning opacity-40 mx-1" style={{ width: '1px', height: '20px' }} />
              </>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-light rounded-circle d-xl-none border d-flex align-items-center justify-content-center ms-1 sst-navbar__hamburger"
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
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-xl-none"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ zIndex: 1050 }}
        >
          <div
            className="position-absolute top-0 end-0 h-100 bg-white shadow-lg p-4 d-flex flex-column sst-navbar__drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="d-flex align-items-center justify-content-between pb-3 border-bottom mb-3">
              <div className="d-flex align-items-center gap-2">
                <img src="/assets/images/logo.jpg" alt="Logo" className="rounded-circle" style={{ width: '36px', height: '36px' }} />
                <span className="fw-bold text-navy font-heading">{isTamil ? 'பட்டி' : 'Menu'}</span>
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
                <React.Fragment key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `nav-link px-3 py-2.5 rounded-3 fw-bold text-start d-flex align-items-center justify-content-between ${
                        isActive ? 'bg-warning text-dark' : 'text-navy hover-bg-light'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                  </NavLink>
                  <div className="w-100 bg-warning opacity-20 my-1" style={{ height: '1px' }} />
                </React.Fragment>
              ))}
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-3 border-top mt-auto">
              {onOpenDonate && (
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
              )}

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
