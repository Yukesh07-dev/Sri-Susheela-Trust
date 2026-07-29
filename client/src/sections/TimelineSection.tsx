import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_TIMELINE } from '../constants';

export const TimelineSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  return (
    <section className="section-padding bg-sst-cream position-relative">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">
            {t('timelineSection.badge')}
          </span>
          <h2 className="display-6 font-heading fw-bold text-navy mb-2">
            {t('timelineSection.title')}
          </h2>
          <p className="text-muted lead fs-6">{t('timelineSection.subtitle')}</p>
        </div>

        <div className="position-relative max-w-4xl mx-auto py-3">
          {/* Vertical Golden Center Line */}
          <div
            className="position-absolute top-0 bottom-0 start-50 translate-middle-x d-none d-md-block"
            style={{ width: '3px', background: 'linear-gradient(180deg, #991B1B, #D4AF37, #0F172A)' }}
          />

          <div className="row g-4">
            {MOCK_TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className="col-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="row align-items-center g-3"
                  >
                    {/* Left side on desktop */}
                    <div className={`col-12 col-md-5 ${isEven ? 'text-md-end' : 'order-md-2'}`}>
                      <div className="card card-luxury p-4">
                        <div className="d-flex align-items-center gap-2 mb-1 justify-content-md-start">
                          <span className="badge bg-danger text-white fs-6 font-mono">{item.year}</span>
                          {item.badge && <span className="badge badge-gold">{item.badge}</span>}
                        </div>
                        <h5 className="fw-bold font-heading text-navy mb-2">
                          {isTamil ? item.titleTa : item.title}
                        </h5>
                        <p className="small text-muted mb-0">
                          {isTamil ? item.descriptionTa : item.description}
                        </p>
                      </div>
                    </div>

                    {/* Center Node */}
                    <div className="col-12 col-md-2 text-center d-none d-md-block">
                      <div
                        className="rounded-circle bg-warning text-dark border border-3 border-white shadow mx-auto d-flex align-items-center justify-content-center fw-bold"
                        style={{ width: '42px', height: '42px', zIndex: 2 }}
                      >
                        ✓
                      </div>
                    </div>

                    {/* Spacer right side */}
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
