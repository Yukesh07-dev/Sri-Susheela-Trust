import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Utensils, GraduationCap, HeartHandshake, Stethoscope } from 'lucide-react';

export const MissionSection: React.FC = () => {
  const { t } = useTranslation();

  const missions = [
    {
      icon: Utensils,
      title: t('missionSection.item1Title'),
      desc: t('missionSection.item1Desc'),
      color: 'danger',
    },
    {
      icon: GraduationCap,
      title: t('missionSection.item2Title'),
      desc: t('missionSection.item2Desc'),
      color: 'warning',
    },
    {
      icon: HeartHandshake,
      title: t('missionSection.item3Title'),
      desc: t('missionSection.item3Desc'),
      color: 'success',
    },
    {
      icon: Stethoscope,
      title: t('missionSection.item4Title'),
      desc: t('missionSection.item4Desc'),
      color: 'info',
    },
  ];

  return (
    <section id="mission" className="section-padding bg-sst-cream position-relative">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">
            {t('missionSection.badge')}
          </span>
          <h2 className="display-6 font-heading fw-bold text-navy mb-2">
            {t('missionSection.title')}
          </h2>
          <p className="text-muted lead fs-6">{t('missionSection.subtitle')}</p>
        </div>

        <div className="row g-4">
          {missions.map((m, idx) => {
            const IconComponent = m.icon;
            return (
              <div key={idx} className="col-12 col-md-6 col-lg-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="card card-luxury h-100 p-4 text-center d-flex flex-column align-items-center"
                >
                  <div
                    className={`rounded-circle bg-${m.color} bg-opacity-10 text-${m.color} p-3 mb-3 d-flex align-items-center justify-content-center`}
                    style={{ width: '65px', height: '65px' }}
                  >
                    <IconComponent size={30} />
                  </div>
                  <h5 className="fw-bold font-heading text-navy mb-2">{m.title}</h5>
                  <p className="small text-muted mb-0">{m.desc}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
