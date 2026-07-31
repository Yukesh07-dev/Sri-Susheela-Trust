import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Utensils, GraduationCap, HeartHandshake, Stethoscope, Heart, Sparkles } from 'lucide-react';
import { ChakraMotif } from '../components/common/ChakraMotif';

export const MissionSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  const missions = [
    {
      icon: Utensils,
      title: t('missionSection.item1Title'),
      desc: t('missionSection.item1Desc'),
      accentColor: '#7A1C1C',
    },
    {
      icon: GraduationCap,
      title: t('missionSection.item2Title'),
      desc: t('missionSection.item2Desc'),
      accentColor: '#B8860B',
    },
    {
      icon: HeartHandshake,
      title: t('missionSection.item3Title'),
      desc: t('missionSection.item3Desc'),
      accentColor: '#0D9488',
    },
    {
      icon: Stethoscope,
      title: t('missionSection.item4Title'),
      desc: t('missionSection.item4Desc'),
      accentColor: '#0284C7',
    },
  ];

  return (
    <section
      id="mission"
      className="section-padding bg-sst-cream position-relative"
      style={{
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}
    >

      {/* Floating Golden Ambient Orbs */}
      <div
        className="position-absolute top-50 start-0 translate-middle-y rounded-circle pointer-events-none"
        style={{
          width: '480px',
          height: '480px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.35) 0%, transparent 70%)',
          filter: 'blur(55px)',
          zIndex: 0,
        }}
      />
      <div
        className="position-absolute top-50 end-0 translate-middle-y rounded-circle pointer-events-none"
        style={{
          width: '480px',
          height: '480px',
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.32) 0%, transparent 70%)',
          filter: 'blur(55px)',
          zIndex: 0,
        }}
      />

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider shadow-sm">
            {t('missionSection.badge')}
          </span>
          <h2
            className={`display-6 font-heading fw-bold mb-2 ${isTamil ? 'font-tamil' : ''}`}
            style={{ color: '#7A1C1C' }}
          >
            {t('missionSection.title')}
          </h2>

          {/* Flourish Golden Heart Divider */}
          <div className="d-flex align-items-center justify-content-center gap-2 my-2.5 opacity-85">
            <div style={{ height: '1.5px', width: '65px', background: 'linear-gradient(90deg, transparent, #8C6826)' }} />
            <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
              <Heart size={14} fill="#8C6826" color="#8C6826" />
            </motion.div>
            <div style={{ height: '1.5px', width: '65px', background: 'linear-gradient(90deg, #8C6826, transparent)' }} />
          </div>

          <p className={`text-muted lead fs-6 ${isTamil ? 'font-tamil' : ''}`}>
            {t('missionSection.subtitle')}
          </p>
        </div>

        {/* Ultra-Glossy Glassmorphism Cards Grid */}
        <div className="row g-4 justify-content-center">
          {missions.map((m, idx) => {
            const IconComponent = m.icon;
            return (
              <div key={idx} className="col-12 col-md-6 col-lg-3">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="h-100 p-4 text-center d-flex flex-column align-items-center rounded-4 position-relative cursor-pointer transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 253, 240, 0.96) 0%, rgba(254, 243, 199, 0.88) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '2px solid rgba(212, 175, 55, 0.65)',
                    boxShadow: '0 16px 40px rgba(122, 28, 28, 0.12), 0 0 30px rgba(255, 215, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
                  }}
                >
                  {/* Glossy Top Sheen Pill Line */}
                  <div
                    className="position-absolute top-0 start-50 translate-middle-x rounded-pill"
                    style={{
                      width: '65px',
                      height: '5px',
                      background: `linear-gradient(90deg, #FFD700, ${m.accentColor})`,
                      boxShadow: '0 2px 10px rgba(255, 215, 0, 0.6)',
                    }}
                  />

                  {/* Glossy Circular Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.12 }}
                    className="rounded-circle mb-3.5 d-flex align-items-center justify-content-center transition-all mt-2"
                    style={{
                      width: '74px',
                      height: '74px',
                      background: 'linear-gradient(135deg, #FFFDF5 0%, #FEF08A 100%)',
                      border: '2.5px solid #D4AF37',
                      boxShadow: '0 10px 24px rgba(122, 28, 28, 0.16), 0 0 20px rgba(255, 215, 0, 0.5)',
                    }}
                  >
                    <IconComponent size={34} style={{ color: m.accentColor }} />
                  </motion.div>

                  {/* Title */}
                  <h5 className={`fw-bold font-heading mb-2 ${isTamil ? 'font-tamil fs-6' : 'fs-5'}`} style={{ color: '#7A1C1C' }}>
                    {m.title}
                  </h5>

                  {/* Description */}
                  <p className={`small text-muted mb-0 leading-relaxed ${isTamil ? 'font-tamil' : ''}`} style={{ fontSize: '0.88rem' }}>
                    {m.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
