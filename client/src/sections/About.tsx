import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartHandshake, Award, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRUST_INFO } from '../constants';

export const AboutSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="about" className="section-padding bg-white position-relative">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left Column Founders & Activities Collage */}
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="position-relative"
            >
              <div
                className="card border-0 overflow-hidden shadow-lg p-3 position-relative rounded-4 d-flex align-items-center justify-content-center"
                style={{
                  backgroundImage: "url('/assets/images/about-us.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  border: '3px solid #D4AF37',
                  boxShadow: '0 12px 35px rgba(122, 28, 28, 0.2)',
                  minHeight: '440px',
                }}
              >
                {/* Top-Left Trust Logo Header */}
                <div
                  className="position-absolute top-0 start-0 m-3 p-2 px-3 rounded-4 shadow-sm bg-white bg-opacity-95 border border-warning d-flex align-items-center gap-2.5"
                  style={{ zIndex: 3, backdropFilter: 'blur(8px)' }}
                >
                  <img
                    src="/assets/images/logo.jpg"
                    alt="Sri Susheela Trust Logo"
                    className="rounded-circle shadow-sm p-0.5 bg-white border border-warning"
                    style={{ width: '40px', height: '40px', boxShadow: '0 0 12px rgba(212, 175, 55, 0.4)' }}
                  />
                  <div className="text-start">
                    <h6
                      className={`fw-bold mb-0 tracking-wide ${i18n.language === 'ta' ? 'font-tamil' : 'font-heading'}`}
                      style={{ color: '#7A1C1C', letterSpacing: '0.6px', fontSize: '0.85rem' }}
                    >
                      {i18n.language === 'ta' ? 'ஸ்ரீ சுசீலா அறக்கட்டளை' : 'SRI SUSHEELA TRUST'}
                    </h6>
                    <div
                      className={`small fw-bold text-uppercase tracking-wider opacity-90 ${i18n.language === 'ta' ? 'font-tamil' : ''}`}
                      style={{ color: '#8C6826', fontSize: '0.66rem', letterSpacing: '0.8px' }}
                    >
                      {i18n.language === 'ta' ? '— மக்கள் நலக் குழு —' : '— PEOPLE WELFARE GROUP —'}
                    </div>
                    <div
                      className={`fw-bold text-uppercase ${i18n.language === 'ta' ? 'font-tamil' : ''}`}
                      style={{ color: '#523E18', fontSize: '0.6rem', letterSpacing: '0.7px' }}
                    >
                      {i18n.language === 'ta' ? 'மனிதநேயத்துடன் அன்புடன் சேவையாற்றுகிறோம்' : 'SERVING HUMANITY WITH COMPASSION'}
                    </div>
                  </div>
                </div>

                {/* Founders Image (Shifted Slightly Leftward to -110px) */}
                <div className="position-relative text-center d-flex align-items-center justify-content-center w-100 mt-4 pt-2" style={{ zIndex: 2 }}>
                  <img
                    src="/assets/images/founders.png"
                    alt="Sri Susheela Trust Founders"
                    className="img-fluid hover-scale transition-all"
                    style={{
                      maxHeight: '480px',
                      maxWidth: '540px',
                      objectFit: 'contain',
                      transform: 'translateX(-110px)',
                      filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.35)) drop-shadow(0 0 30px rgba(255, 215, 0, 0.55))',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column Content */}
          <div className="col-12 col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="badge badge-gold mb-2 text-uppercase tracking-wider">
                {t('aboutSection.badge')}
              </span>
              <h2 className="display-6 font-heading fw-bold text-navy mb-3">
                {t('aboutSection.title')}
              </h2>

              <p className="lead text-sst-teal fw-semibold fs-6 mb-3">
                {t('aboutSection.subtitle')}
              </p>

              <p className="text-muted mb-3">{t('aboutSection.p1')}</p>
              <p className="text-muted mb-4">{t('aboutSection.p2')}</p>

              {/* Founder Quote Card */}
              <div className="card border-0 bg-sst-cream border-start border-4 border-warning rounded-3 p-3 mb-4">
                <p className="fst-italic text-navy mb-1 small fw-medium">{t('aboutSection.founderQuote')}</p>
                <div className="d-flex align-items-center gap-2">
                  <HeartHandshake size={16} className="text-warning fill-warning" />
                  <span className="small fw-bold text-navy">
                    — {i18n.language === 'ta' ? TRUST_INFO.founderTa : TRUST_INFO.founder}, {t('aboutSection.founderTitle')}
                  </span>
                </div>
              </div>

              {/* Read More Button */}
              <Link to="/about" className="btn btn-sst-outline-teal py-2.5 px-4 rounded-pill">
                {t('aboutSection.readMore')}
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
