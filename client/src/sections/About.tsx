import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HeartHandshake, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TRUST_INFO } from '../constants';

export const AboutSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  return (
    <section id="about" className="section-padding bg-sst-cream position-relative overflow-hidden">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
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
                  border: '2.5px solid rgba(212, 175, 55, 0.75)',
                  boxShadow: '0 16px 40px rgba(122, 28, 28, 0.18), 0 0 35px rgba(255, 215, 0, 0.45)',
                  minHeight: '440px',
                }}
              >
                {/* Top-Left Trust Logo Header */}
                <div
                  className="position-absolute top-0 start-0 m-3 p-2 px-3 rounded-4 shadow-sm bg-white bg-opacity-95 border border-warning d-flex align-items-center gap-2.5"
                  style={{ zIndex: 3, backdropFilter: 'blur(10px)' }}
                >
                  <img
                    src="/assets/images/logo.jpg"
                    alt="Sri Susheela Trust Logo"
                    className="rounded-circle shadow-sm p-0.5 bg-white border border-warning"
                    style={{ width: '40px', height: '40px', boxShadow: '0 0 12px rgba(212, 175, 55, 0.5)' }}
                  />
                  <div className="text-start">
                    <h6
                      className={`fw-bold mb-0 tracking-wide ${isTamil ? 'font-tamil' : 'font-heading'}`}
                      style={{ color: '#7A1C1C', letterSpacing: '0.6px', fontSize: '0.85rem' }}
                    >
                      {isTamil ? 'ஸ்ரீ சுசீலா அறக்கட்டளை' : 'SRI SUSHEELA TRUST'}
                    </h6>
                    <div
                      className={`small fw-bold text-uppercase tracking-wider opacity-90 ${isTamil ? 'font-tamil' : ''}`}
                      style={{ color: '#8C6826', fontSize: '0.66rem', letterSpacing: '0.8px' }}
                    >
                      {isTamil ? '— மக்கள் நலக் குழு —' : '— PEOPLE WELFARE GROUP —'}
                    </div>
                    <div
                      className={`fw-bold text-uppercase ${isTamil ? 'font-tamil' : ''}`}
                      style={{ color: '#523E18', fontSize: '0.6rem', letterSpacing: '0.7px' }}
                    >
                      {isTamil ? 'மனிதநேயத்துடன் அன்புடன் சேவையாற்றுகிறோம்' : 'SERVING HUMANITY WITH COMPASSION'}
                    </div>
                  </div>
                </div>

                {/* Founders Image */}
                <div className="position-relative text-center d-flex align-items-end justify-content-center w-100" style={{ zIndex: 2, marginTop: 'auto' }}>
                  <img
                    src="/assets/images/hero_founders_hd.png"
                    alt="Sri Susheela Trust Founders"
                    className="img-fluid hover-scale transition-all"
                    style={{
                      maxHeight: '320px',
                      maxWidth: '360px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)',
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
              <span className="badge badge-gold mb-2 text-uppercase tracking-wider shadow-sm">
                {t('aboutSection.badge')}
              </span>
              <h2 className={`display-6 font-heading fw-bold mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                {t('aboutSection.title')}
              </h2>

              {/* Flourish Golden Heart Line */}
              <div className="d-flex align-items-center gap-2 mb-3 opacity-85">
                <div style={{ height: '1.5px', width: '60px', background: 'linear-gradient(90deg, #8C6826, transparent)' }} />
                <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                  <Heart size={14} fill="#8C6826" color="#8C6826" />
                </motion.div>
                <div style={{ height: '1.5px', width: '60px', background: 'linear-gradient(90deg, transparent, #8C6826)' }} />
              </div>

              <p className={`lead fw-semibold fs-6 mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                {t('aboutSection.subtitle')}
              </p>

              <p className={`text-muted mb-3 ${isTamil ? 'font-tamil' : ''}`}>{t('aboutSection.p1')}</p>
              <p className={`text-muted mb-4 ${isTamil ? 'font-tamil' : ''}`}>{t('aboutSection.p2')}</p>

              {/* Glossy Glassmorphism Founder Quote Card */}
              <div
                className="card border-0 rounded-4 mb-4 position-relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 253, 240, 0.96) 0%, rgba(254, 243, 199, 0.88) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderLeft: '4.5px solid #D4AF37',
                  border: '1.5px solid rgba(212, 175, 55, 0.5)',
                  boxShadow: '0 12px 30px rgba(122, 28, 28, 0.1), 0 0 20px rgba(255, 215, 0, 0.25)',
                  padding: '1.75rem 2.25rem',
                }}
              >
                <p className={`fst-italic mb-3 fw-medium ${isTamil ? 'font-tamil fs-6' : 'small'}`} style={{ color: '#521212', lineHeight: '1.75' }}>
                  "{t('aboutSection.founderQuote')}"
                </p>
                <div className="d-flex align-items-center gap-2 pt-1">
                  <HeartHandshake size={18} className="text-warning fill-warning" />
                  <span className={`small fw-bold ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                    — {isTamil ? TRUST_INFO.founderTa : TRUST_INFO.founder}, {t('aboutSection.founderTitle')}
                  </span>
                </div>
              </div>

              {/* Learn About Our Journey Button */}
              <Link
                to="/gallery"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn rounded-pill px-4.5 py-3 text-white fw-bold shadow-md d-inline-flex align-items-center gap-2.5 hover-scale transition-all"
                style={{
                  background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                  border: '1.5px solid #D4AF37',
                  letterSpacing: '0.8px',
                  fontSize: '0.95rem',
                  boxShadow: '0 8px 24px rgba(122, 28, 28, 0.35), 0 0 15px rgba(255, 215, 0, 0.4)',
                }}
              >
                <span>{t('aboutSection.readMore')}</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
