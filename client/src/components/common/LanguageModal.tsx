import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Globe, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { RangoliMotif } from './RangoliMotif';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState<'en' | 'ta'>('ta');

  if (!isOpen) return null;

  const handleConfirm = () => {
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('i18nextLng', selectedLang);
    localStorage.setItem('sst_lang_selected', 'true');
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
        style={{
          zIndex: 99998,
          backgroundColor: 'rgba(12, 9, 5, 0.78)',
          backdropFilter: 'blur(6px)', // Lightweight blur for 60fps performance
          willChange: 'opacity',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="position-relative w-100 overflow-hidden"
          style={{ maxWidth: '500px', willChange: 'transform, opacity' }}
        >
          {/* Main Floating Medallion Box */}
          <div
            className="rounded-4 shadow-lg overflow-hidden position-relative p-4 p-md-4.5"
            style={{
              background: 'linear-gradient(145deg, #FFFDF8 0%, #FAF0D7 100%)',
              border: '2.5px solid #D4AF37',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            }}
          >
            {/* Rangoli Corner Accents */}
            <div className="position-absolute top-0 start-0 z-3 pointer-events-none">
              <RangoliMotif size={75} position="top-left" />
            </div>
            <div className="position-absolute top-0 end-0 z-3 pointer-events-none">
              <RangoliMotif size={75} position="top-right" />
            </div>
            <div className="position-absolute bottom-0 start-0 z-3 pointer-events-none">
              <RangoliMotif size={75} position="bottom-left" />
            </div>
            <div className="position-absolute bottom-0 end-0 z-3 pointer-events-none">
              <RangoliMotif size={75} position="bottom-right" />
            </div>

            {/* Lotus Pedestal & Emblem Header */}
            <div className="text-center position-relative mb-3.5 z-2">
              {/* Soft Golden Halo Glow */}
              <div
                className="position-absolute top-50 start-50 translate-middle rounded-circle pointer-events-none"
                style={{
                  width: '130px',
                  height: '130px',
                  background: 'radial-gradient(circle, rgba(255, 215, 0, 0.35) 0%, rgba(212, 175, 55, 0.12) 50%, rgba(0,0,0,0) 75%)',
                  filter: 'blur(15px)',
                  zIndex: 0,
                }}
              />

              {/* Emblem Logo */}
              <div className="d-inline-block position-relative z-2 mb-2.5">
                <div
                  className="rounded-circle p-1 bg-gradient-gold-metallic shadow-md d-flex align-items-center justify-content-center"
                  style={{ width: '105px', height: '105px' }}
                >
                  <img
                    src="/assets/images/logo.jpg"
                    alt="Sri Susheela Trust Emblem"
                    className="rounded-circle w-100 h-100 object-fit-cover bg-white"
                    style={{ border: '2px solid #FFFFFF' }}
                  />
                </div>
              </div>

              {/* Trust Name Header - Rich Crimson Red */}
              <h3
                className={`fw-extrabold mb-1 text-danger font-heading text-uppercase tracking-wider ${
                  selectedLang === 'ta' ? 'font-tamil fs-3' : 'fs-4'
                }`}
                style={{ letterSpacing: '1.2px' }}
              >
                {selectedLang === 'ta' ? 'ஸ்ரீ சுசீலா அறக்கட்டளை' : 'SRI SUSHEELA TRUST'}
              </h3>

              <div className="d-inline-flex align-items-center gap-1.5 badge badge-gold px-3.5 py-1.5 shadow-sm text-uppercase tracking-wider">
                <ShieldCheck size={14} className="text-warning fill-warning" />
                <span className={selectedLang === 'ta' ? 'font-tamil' : ''}>
                  {selectedLang === 'ta' ? 'மக்கள் நலக் குழு' : 'PEOPLE WELFARE GROUP'}
                </span>
              </div>
            </div>

            {/* Instruction Subtitle */}
            <div className="text-center mb-3.5 z-2 position-relative">
              <p className={`small fw-bold text-navy mb-0 ${selectedLang === 'ta' ? 'font-tamil' : ''}`}>
                {selectedLang === 'ta'
                  ? 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்'
                  : 'Select Language / மொழியைத் தேர்ந்தெடுக்கவும்'}
              </p>
            </div>

            {/* Interactive Dual Arched Cards */}
            <div className="row g-3 mb-4 z-2 position-relative">
              {/* English Choice Card */}
              <div className="col-6">
                <div
                  onClick={() => setSelectedLang('en')}
                  className={`card p-3 text-center cursor-pointer rounded-4 position-relative transition-all ${
                    selectedLang === 'en'
                      ? 'shadow-md border-2'
                      : 'shadow-sm border'
                  }`}
                  style={{
                    background: selectedLang === 'en' ? 'linear-gradient(135deg, #FFFDF5 0%, #FEF08A 100%)' : '#FFFFFF',
                    borderColor: selectedLang === 'en' ? '#D4AF37' : '#E2E8F0',
                  }}
                >
                  {selectedLang === 'en' && (
                    <span
                      className="position-absolute top-0 end-0 m-2 rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center fw-bold shadow-sm"
                      style={{ width: '22px', height: '22px' }}
                    >
                      <Check size={14} />
                    </span>
                  )}
                  <div
                    className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center shadow-sm"
                    style={{
                      width: '44px',
                      height: '44px',
                      background: selectedLang === 'en' ? '#D4AF37' : '#F8FAFC',
                      color: selectedLang === 'en' ? '#120D08' : '#64748B',
                    }}
                  >
                    <Globe size={22} />
                  </div>
                  <h5 className="fw-bold text-navy font-heading mb-0 fs-6">English</h5>
                  <span className="small text-muted d-block" style={{ fontSize: '0.72rem' }}>
                    Official Web Portal
                  </span>
                </div>
              </div>

              {/* Tamil Choice Card */}
              <div className="col-6">
                <div
                  onClick={() => setSelectedLang('ta')}
                  className={`card p-3 text-center cursor-pointer rounded-4 position-relative transition-all ${
                    selectedLang === 'ta'
                      ? 'shadow-md border-2'
                      : 'shadow-sm border'
                  }`}
                  style={{
                    background: selectedLang === 'ta' ? 'linear-gradient(135deg, #FFFDF5 0%, #FEF08A 100%)' : '#FFFFFF',
                    borderColor: selectedLang === 'ta' ? '#D4AF37' : '#E2E8F0',
                  }}
                >
                  {selectedLang === 'ta' && (
                    <span
                      className="position-absolute top-0 end-0 m-2 rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center fw-bold shadow-sm"
                      style={{ width: '22px', height: '22px' }}
                    >
                      <Check size={14} />
                    </span>
                  )}
                  <div
                    className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center shadow-sm"
                    style={{
                      width: '44px',
                      height: '44px',
                      background: selectedLang === 'ta' ? '#D4AF37' : '#F8FAFC',
                      color: selectedLang === 'ta' ? '#120D08' : '#64748B',
                    }}
                  >
                    <Sparkles size={22} />
                  </div>
                  <h5 className="fw-bold font-tamil text-navy mb-0 fs-6">தமிழ்</h5>
                  <span className="small text-muted d-block font-tamil" style={{ fontSize: '0.72rem' }}>
                    தமிழ் தளம்
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Action Button */}
            <button
              onClick={handleConfirm}
              className={`btn btn-sst-gold w-100 py-3 rounded-pill justify-content-center shadow-md fs-6 z-2 position-relative ${
                selectedLang === 'ta' ? 'font-tamil' : ''
              }`}
            >
              <span>{selectedLang === 'ta' ? 'தளத்திற்குச் செல்க (Continue)' : 'Continue to Official Website'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
