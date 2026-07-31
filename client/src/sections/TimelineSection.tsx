import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_TIMELINE } from '../constants';
import { Heart, Check } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  return (
    <section id="timeline" className="section-padding bg-sst-cream position-relative overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div
        className="position-absolute top-50 start-50 translate-middle rounded-circle pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%)',
          filter: 'blur(65px)',
          zIndex: 0,
        }}
      />

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider shadow-sm">
            {t('timelineSection.badge')}
          </span>
          <h2 className={`display-6 font-heading fw-bold mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
            {t('timelineSection.title')}
          </h2>

          {/* Flourish Golden Heart Line */}
          <div className="d-flex align-items-center justify-content-center gap-2 mb-3 opacity-85">
            <div style={{ height: '1.5px', width: '60px', background: 'linear-gradient(90deg, transparent, #8C6826)' }} />
            <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <Heart size={14} fill="#8C6826" color="#8C6826" />
            </motion.div>
            <div style={{ height: '1.5px', width: '60px', background: 'linear-gradient(90deg, #8C6826, transparent)' }} />
          </div>

          <p className={`lead fs-6 mb-0 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18' }}>
            {t('timelineSection.subtitle')}
          </p>
        </div>

        {/* Timeline Content */}
        <div className="position-relative max-w-4xl mx-auto py-3">
          {/* Sleek Golden Ribbon Center Line */}
          <div
            className="position-absolute top-0 bottom-0 start-50 translate-middle-x d-none d-md-block rounded-pill"
            style={{
              width: '2px',
              background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.15) 0%, #D4AF37 50%, rgba(212, 175, 55, 0.15) 100%)',
              boxShadow: '0 0 8px rgba(212, 175, 55, 0.3)',
            }}
          />

          <div className="row g-4">
            {MOCK_TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="col-12">
                  <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="row align-items-center g-3"
                  >
                    {/* Left or Right Card Content */}
                    <div className={`col-12 col-md-5 ${isEven ? 'text-md-end' : 'order-md-2'}`}>
                      <motion.div
                        whileHover={{ y: -5, scale: 1.015 }}
                        className="card border-0 rounded-4 p-4 text-start transition-all"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: '1.5px solid rgba(212, 175, 55, 0.48)',
                          boxShadow: '0 12px 35px rgba(122, 28, 28, 0.08), 0 0 20px rgba(255, 215, 0, 0.2)',
                        }}
                      >
                        <div className={`d-flex align-items-center gap-2 mb-2 ${isEven ? 'justify-content-md-end' : 'justify-content-start'}`}>
                          <span
                            className="badge rounded-pill px-3 py-1.5 fw-bold font-mono shadow-sm"
                            style={{
                              background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                              color: '#FFD700',
                              border: '1px solid #D4AF37',
                              fontSize: '0.85rem',
                              letterSpacing: '0.8px',
                            }}
                          >
                            {item.year}
                          </span>
                          {item.badge && (
                            <span className="badge badge-gold shadow-sm">
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <h5 className={`fw-bold mb-2 ${isTamil ? 'font-tamil fs-6' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                          {isTamil ? item.titleTa : item.title}
                        </h5>

                        <p className={`small mb-0 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.6' }}>
                          {isTamil ? item.descriptionTa : item.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Sleek Maroon & Gold Glowing Node */}
                    <div className="col-12 col-md-2 text-center d-none d-md-block">
                      <div
                        className="rounded-circle mx-auto d-flex align-items-center justify-content-center transition-all"
                        style={{
                          width: '36px',
                          height: '36px',
                          background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                          border: '2.5px solid #D4AF37',
                          boxShadow: '0 0 14px rgba(212, 175, 55, 0.45), 0 4px 10px rgba(122, 28, 28, 0.3)',
                          zIndex: 2,
                        }}
                      >
                        <div
                          className="rounded-circle"
                          style={{
                            width: '10px',
                            height: '10px',
                            background: '#FFD700',
                            boxShadow: '0 0 8px #FFD700',
                          }}
                        />
                      </div>
                    </div>

                    {/* Spacer Column */}
                    <div className={`col-12 col-md-5 ${isEven ? 'order-md-2' : ''}`} />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
