import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, Sparkles } from 'lucide-react';

export const LanguagePage: React.FC = () => {
  const { i18n } = useTranslation();

  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="py-5 bg-sst-cream min-vh-75 d-flex align-items-center">
      <div className="container-fluid max-w-4xl px-3">
        <div className="text-center mb-5">
          <div className="rounded-circle bg-warning bg-opacity-10 text-warning p-3 d-inline-flex mb-3">
            <Globe size={40} />
          </div>
          <h2 className="display-6 font-heading fw-bold text-navy mb-2">Language Preferences</h2>
          <p className="lead text-muted fs-6">Select your preferred language for navigating the Sri Susheela Trust portal.</p>
        </div>

        <div className="row g-4 justify-content-center">
          {/* English Option */}
          <div className="col-12 col-md-6">
            <div
              onClick={() => setLanguage('en')}
              className={`card card-luxury p-4 cursor-pointer text-center position-relative transition-all ${
                i18n.language === 'en' ? 'border-danger bg-danger bg-opacity-10 shadow-lg' : ''
              }`}
            >
              {i18n.language === 'en' && (
                <span className="position-absolute top-0 end-0 m-3 badge bg-danger text-white rounded-circle p-2">
                  <Check size={18} />
                </span>
              )}
              <h3 className="fw-bold font-heading text-navy mb-2">English</h3>
              <p className="small text-muted mb-3">Primary International Language • Inter & Poppins Typography</p>
              <div className="badge badge-gold py-2 px-3">Active Selection</div>
            </div>
          </div>

          {/* Tamil Option */}
          <div className="col-12 col-md-6">
            <div
              onClick={() => setLanguage('ta')}
              className={`card card-luxury p-4 cursor-pointer text-center position-relative transition-all ${
                i18n.language === 'ta' ? 'border-danger bg-danger bg-opacity-10 shadow-lg' : ''
              }`}
            >
              {i18n.language === 'ta' && (
                <span className="position-absolute top-0 end-0 m-3 badge bg-danger text-white rounded-circle p-2">
                  <Check size={18} />
                </span>
              )}
              <h3 className="fw-bold font-tamil text-navy mb-2">தமிழ் (Tamil)</h3>
              <p className="small text-muted mb-3">தமிழ்நாடு மாநில மொழி • நோட்டோ சான்ஸ் தமிழ் வடிவம்</p>
              <div className="badge badge-gold py-2 px-3">செயலில் உள்ளது</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
