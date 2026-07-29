import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_PROGRAMS } from '../constants';
import { ProgramItem } from '../types';
import { Utensils, GraduationCap, HeartHandshake, Stethoscope, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActivitiesProps {
  onOpenDonate?: () => void;
}

export const ActivitiesSection: React.FC<ActivitiesProps> = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils size={22} />;
      case 'GraduationCap':
        return <GraduationCap size={22} />;
      case 'HeartHandshake':
        return <HeartHandshake size={22} />;
      case 'Stethoscope':
        return <Stethoscope size={22} />;
      default:
        return <Sparkles size={22} />;
    }
  };

  return (
    <section id="programs" className="section-padding bg-sst-cream position-relative">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">
            {t('activitiesSection.badge')}
          </span>
          <h2 className="display-6 font-heading fw-bold text-navy mb-2">
            {t('activitiesSection.title')}
          </h2>
          <p className="text-muted lead fs-6">{t('activitiesSection.subtitle')}</p>
        </div>

        <div className="row g-4">
          {MOCK_PROGRAMS.map((prog, idx) => (
            <div key={prog.id} className="col-12 col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card card-luxury h-100 d-flex flex-column"
              >
                <div className="position-relative overflow-hidden" style={{ height: '210px' }}>
                  <img src={prog.imageUrl} alt={prog.title} className="w-100 h-100 object-fit-cover" />
                  <span className="position-absolute top-0 end-0 m-3 badge bg-danger text-white">
                    {prog.beneficiariesCount}
                  </span>
                </div>

                <div className="card-body p-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div className="rounded-circle bg-danger bg-opacity-10 text-danger p-2 d-inline-flex">
                      {getIcon(prog.iconName)}
                    </div>
                    <h5 className="fw-bold font-heading text-navy mb-0">
                      {isTamil ? prog.titleTa : prog.title}
                    </h5>
                  </div>

                  <p className="small text-muted mb-3 flex-grow-1">
                    {isTamil ? prog.shortDescTa : prog.shortDesc}
                  </p>

                  <div className="border-top pt-3 mt-auto">
                    <button
                      onClick={() => setSelectedProgram(prog)}
                      className="btn btn-sst-outline-red btn-sm w-100 justify-content-center"
                    >
                      {t('activitiesSection.learnMore')}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProgram && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)' }}
        >
          <div className="bg-white rounded-4 shadow-lg overflow-hidden position-relative w-100 max-w-2xl p-4">
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <h4 className="fw-bold text-navy font-heading mb-0">
                {isTamil ? selectedProgram.titleTa : selectedProgram.title}
              </h4>
              <button onClick={() => setSelectedProgram(null)} className="btn btn-sm btn-light rounded-circle">
                ✕
              </button>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-5">
                <img src={selectedProgram.imageUrl} alt={selectedProgram.title} className="w-100 rounded-3 object-fit-cover shadow-sm" style={{ height: '180px' }} />
                <div className="badge badge-gold w-100 mt-2 text-center py-2">
                  {selectedProgram.beneficiariesCount}
                </div>
              </div>
              <div className="col-12 col-md-7">
                <p className="small text-muted">{isTamil ? selectedProgram.descriptionTa : selectedProgram.description}</p>
                <h6 className="fw-bold text-navy small mb-2">Key Highlights:</h6>
                <ul className="list-unstyled small mb-0">
                  {(isTamil ? selectedProgram.featuresTa : selectedProgram.features).map((feat, fidx) => (
                    <li key={fidx} className="d-flex align-items-center gap-2 mb-1.5 text-muted">
                      <CheckCircle2 size={14} className="text-success flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top d-flex justify-content-end gap-2">
              <Link to="/programs" className="btn btn-sst-primary py-2 px-4 rounded-pill">
                View All Programs
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
