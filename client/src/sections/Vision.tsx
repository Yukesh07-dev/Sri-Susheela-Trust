import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Compass, Sun, BookOpen, Truck, Heart, Target } from 'lucide-react';

export const VisionSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  const milestones = [
    {
      icon: Sun,
      title: t('visionSection.m1Title'),
      desc: t('visionSection.m1Desc'),
      year: '2026',
      iconGradient: 'linear-gradient(135deg, #7A1C1C 0%, #991B1B 100%)',
      borderColor: '#7A1C1C',
    },
    {
      icon: BookOpen,
      title: t('visionSection.m2Title'),
      desc: t('visionSection.m2Desc'),
      year: '2028',
      iconGradient: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)',
      borderColor: '#B8860B',
    },
    {
      icon: Truck,
      title: t('visionSection.m3Title'),
      desc: t('visionSection.m3Desc'),
      year: '2030',
      iconGradient: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
      borderColor: '#0D9488',
    },
  ];

  return (
    <section id="vision" className="section-padding bg-sst-cream position-relative overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div
        className="position-absolute top-0 end-0 translate-middle-y rounded-circle pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center g-4 g-lg-5">
          {/* Left Side Section Header & Empowering Card */}
          <div className="col-12 col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="badge badge-gold mb-2.5 text-uppercase tracking-wider d-inline-flex align-items-center gap-1.5 shadow-sm">
                <Compass size={14} />
                {t('visionSection.badge')}
              </span>
              <h2 className={`display-6 font-heading fw-bold mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                {t('visionSection.title')}
              </h2>

              {/* Flourish Golden Heart Line */}
              <div className="d-flex align-items-center gap-2 mb-3.5 opacity-85">
                <div style={{ height: '1.5px', width: '60px', background: 'linear-gradient(90deg, #8C6826, transparent)' }} />
                <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                  <Heart size={14} fill="#8C6826" color="#8C6826" />
                </motion.div>
                <div style={{ height: '1.5px', width: '60px', background: 'linear-gradient(90deg, transparent, #8C6826)' }} />
              </div>

              <p className={`lead fw-semibold fs-6 mb-4 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                {t('visionSection.subtitle')}
              </p>

              {/* Glossy Glassmorphism Empowering Feature Card */}
              <div
                className="card border-0 rounded-4 position-relative overflow-hidden transition-all hover-scale"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 253, 240, 0.96) 0%, rgba(254, 243, 199, 0.88) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderLeft: '4.5px solid #D4AF37',
                  border: '1.5px solid rgba(212, 175, 55, 0.55)',
                  boxShadow: '0 14px 35px rgba(122, 28, 28, 0.12), 0 0 25px rgba(255, 215, 0, 0.3)',
                  padding: '1.75rem 2rem',
                }}
              >
                <div className="d-flex align-items-center gap-2.5 mb-2">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, #7A1C1C, #521212)',
                      color: '#FFD700',
                      boxShadow: '0 4px 10px rgba(122, 28, 28, 0.3)',
                    }}
                  >
                    <Target size={16} />
                  </div>
                  <h5 className={`fw-bold mb-0 ${isTamil ? 'font-tamil' : 'font-heading'}`} style={{ color: '#7A1C1C', letterSpacing: '0.3px' }}>
                    {isTamil ? 'தலைமுறைகளை மேம்படுத்துதல்' : 'Empowering Generations'}
                  </h5>
                </div>
                <p className={`small mb-0 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.65' }}>
                  {isTamil
                    ? 'எங்களின் நீண்டகால தொலைநோக்குத் திட்டம் கிராமப்புற சமுதாயத்திற்கு பல தசாப்தங்களாகத் தடையின்றி சேவையாற்றும் உள்கட்டமைப்பை உருவாக்குவதில் கவனம் செலுத்துகிறது.'
                    : 'Our strategic roadmap focuses on creating self-sustaining infrastructure that continues serving rural communities for decades without interruption.'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side Roadmap Milestones Cards */}
          <div className="col-12 col-lg-7">
            <div className="d-flex flex-column" style={{ gap: '1.25rem' }}>
              {milestones.map((m, idx) => {
                const IconComponent = m.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    whileHover={{ y: -5, scale: 1.015 }}
                    className="card border-0 rounded-4 transition-all mb-3.5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.92) 100%)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      borderLeft: `4px solid ${m.borderColor}`,
                      border: '1.5px solid rgba(212, 175, 55, 0.45)',
                      boxShadow: '0 10px 30px rgba(122, 28, 28, 0.08), 0 0 20px rgba(255, 215, 0, 0.2)',
                      padding: '1.5rem 1.75rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <div className="d-flex align-items-center gap-3.5">
                      <div
                        className="rounded-circle text-white p-3 d-flex align-items-center justify-content-center flex-shrink-0 shadow-md"
                        style={{
                          width: '58px',
                          height: '58px',
                          background: m.iconGradient,
                          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15), 0 0 15px rgba(255, 215, 0, 0.35)',
                        }}
                      >
                        <IconComponent size={26} color="#FFFFFF" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between mb-1.5">
                          <h5 className={`fw-bold mb-0 ${isTamil ? 'font-tamil fs-6' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                            {m.title}
                          </h5>
                          <span
                            className="badge rounded-pill px-3 py-1.5 fw-bold font-mono shadow-sm"
                            style={{
                              background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                              color: '#FFD700',
                              border: '1px solid #D4AF37',
                              fontSize: '0.85rem',
                              letterSpacing: '1px',
                              boxShadow: '0 4px 12px rgba(122, 28, 28, 0.25)',
                            }}
                          >
                            {m.year}
                          </span>
                        </div>
                        <p className={`small mb-0 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.6' }}>
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
