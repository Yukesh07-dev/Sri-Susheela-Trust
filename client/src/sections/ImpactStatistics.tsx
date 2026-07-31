import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_IMPACT_STATS } from '../constants';
import { Utensils, GraduationCap, Stethoscope, HeartHandshake, Heart } from 'lucide-react';

export const ImpactStatisticsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [hasAnimated, setHasAnimated] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils size={28} color="#FFD700" />;
      case 'GraduationCap':
        return <GraduationCap size={28} color="#FFD700" />;
      case 'Stethoscope':
        return <Stethoscope size={28} color="#FFD700" />;
      default:
        return <HeartHandshake size={28} color="#FFD700" />;
    }
  };

  return (
    <section id="impact" className="section-padding bg-sst-cream position-relative overflow-hidden">
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
            {t('impactSection.badge')}
          </span>
          <h2 className={`display-6 font-heading fw-bold mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
            {t('impactSection.title')}
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
            {t('impactSection.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="row g-4">
          {MOCK_IMPACT_STATS.map((stat, idx) => (
            <div key={stat.id} className="col-12 col-sm-6 col-lg-3">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onViewportEnter={() => setHasAnimated(true)}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="card border-0 rounded-4 p-4 text-center h-100 d-flex flex-column align-items-center justify-content-center transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(212, 175, 55, 0.45)',
                  boxShadow: '0 12px 35px rgba(122, 28, 28, 0.08), 0 0 20px rgba(255, 215, 0, 0.2)',
                }}
              >
                {/* Maroon & Gold Icon Circle */}
                <div
                  className="rounded-circle p-3 mb-3.5 d-flex align-items-center justify-content-center shadow-sm"
                  style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                    boxShadow: '0 6px 16px rgba(122, 28, 28, 0.3)',
                  }}
                >
                  {getIcon(stat.iconName)}
                </div>

                {/* Big Crystal Clear Maroon Numbers */}
                <h3
                  className="display-5 fw-extrabold mb-1 font-mono tracking-tight"
                  style={{
                    color: '#7A1C1C',
                    letterSpacing: '-0.5px',
                  }}
                >
                  {stat.value.toLocaleString()}
                  <span style={{ color: '#B8860B' }}>{stat.suffix}</span>
                </h3>

                {/* Label & Description */}
                <h6 className={`fw-bold mb-2 ${isTamil ? 'font-tamil fs-6' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                  {isTamil ? stat.labelTa : stat.label}
                </h6>

                <p className={`small mb-0 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.55' }}>
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
