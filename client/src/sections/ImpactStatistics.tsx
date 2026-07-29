import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_IMPACT_STATS } from '../constants';
import { Utensils, GraduationCap, Stethoscope, HeartHandshake } from 'lucide-react';

export const ImpactStatisticsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [hasAnimated, setHasAnimated] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils size={32} />;
      case 'GraduationCap':
        return <GraduationCap size={32} />;
      case 'Stethoscope':
        return <Stethoscope size={32} />;
      default:
        return <HeartHandshake size={32} />;
    }
  };

  return (
    <section className="section-padding bg-gradient-sst-dark text-white position-relative overflow-hidden">
      {/* Background Soft Glow */}
      <div
        className="position-absolute top-50 start-50 translate-middle rounded-circle pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">
            {t('impactSection.badge')}
          </span>
          <h2 className="display-6 font-heading fw-bold text-gradient-gold mb-2">
            {t('impactSection.title')}
          </h2>
          <p className="text-light opacity-75 lead fs-6">{t('impactSection.subtitle')}</p>
        </div>

        <div className="row g-4">
          {MOCK_IMPACT_STATS.map((stat, idx) => (
            <div key={stat.id} className="col-12 col-sm-6 col-lg-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onViewportEnter={() => setHasAnimated(true)}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="glass-card-dark p-4 rounded-4 text-center h-100 d-flex flex-column align-items-center justify-content-center"
              >
                <div className="rounded-circle bg-warning bg-opacity-10 text-warning p-3 mb-3 d-flex align-items-center justify-content-center">
                  {getIcon(stat.iconName)}
                </div>

                <h3 className="display-5 fw-extrabold text-white font-heading mb-1">
                  {stat.value.toLocaleString()}
                  <span className="text-warning">{stat.suffix}</span>
                </h3>

                <h6 className="fw-bold text-gradient-gold mb-2">
                  {isTamil ? stat.labelTa : stat.label}
                </h6>

                <p className="small text-light opacity-75 mb-0">
                  {isTamil ? stat.descriptionTa : stat.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
