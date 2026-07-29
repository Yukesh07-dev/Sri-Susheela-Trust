import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Compass, Sun, BookOpen, Truck } from 'lucide-react';

export const VisionSection: React.FC = () => {
  const { t } = useTranslation();

  const milestones = [
    {
      icon: Sun,
      title: t('visionSection.m1Title'),
      desc: t('visionSection.m1Desc'),
      year: '2026',
    },
    {
      icon: BookOpen,
      title: t('visionSection.m2Title'),
      desc: t('visionSection.m2Desc'),
      year: '2028',
    },
    {
      icon: Truck,
      title: t('visionSection.m3Title'),
      desc: t('visionSection.m3Desc'),
      year: '2030',
    },
  ];

  return (
    <section id="vision" className="section-padding bg-white position-relative">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-12 col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="badge badge-gold mb-2 text-uppercase tracking-wider d-inline-flex align-items-center gap-1">
                <Compass size={14} />
                {t('visionSection.badge')}
              </span>
              <h2 className="display-6 font-heading fw-bold text-navy mb-3">
                {t('visionSection.title')}
              </h2>
              <p className="lead text-muted mb-4 fs-6">{t('visionSection.subtitle')}</p>
              <div className="card glass-panel border-start border-4 border-warning p-4 rounded-4 shadow-sm">
                <h6 className="fw-bold text-navy mb-1 font-heading">Empowering Generations</h6>
                <p className="small text-muted mb-0">
                  Our strategic roadmap focuses on creating self-sustaining infrastructure that continues serving rural communities for decades without interruption.
                </p>
              </div>
            </motion.div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="d-flex flex-column gap-4">
              {milestones.map((m, idx) => {
                const IconComponent = m.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="card card-luxury p-3 p-md-4"
                  >
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="rounded-circle bg-danger bg-opacity-10 text-danger p-3 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: '55px', height: '55px' }}
                      >
                        <IconComponent size={26} />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <h5 className="fw-bold text-navy font-heading mb-0">{m.title}</h5>
                          <span className="badge bg-warning text-dark font-mono">{m.year}</span>
                        </div>
                        <p className="small text-muted mb-0">{m.desc}</p>
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
