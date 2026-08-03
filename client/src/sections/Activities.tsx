import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_PROGRAMS } from '../constants';
import { apiService } from '../services/api';
import { ProgramItem } from '../types';
import { Utensils, GraduationCap, HeartHandshake, Stethoscope, Sparkles, CheckCircle2, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ActivitiesSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [programs, setPrograms] = useState<ProgramItem[]>(MOCK_PROGRAMS);

  useEffect(() => {
    let isMounted = true;
    const fetchProgs = () => {
      apiService.getPrograms().then((data) => {
        if (isMounted && data && data.length > 0) {
          setPrograms(data);
        }
      });
    };

    fetchProgs();

    const handleFocus = () => fetchProgs();
    window.addEventListener('focus', handleFocus);
    const timer = setInterval(fetchProgs, 3000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(timer);
    };
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils':
        return <Utensils size={20} color="#FFD700" />;
      case 'GraduationCap':
        return <GraduationCap size={20} color="#FFD700" />;
      case 'HeartHandshake':
        return <HeartHandshake size={20} color="#FFD700" />;
      case 'Stethoscope':
        return <Stethoscope size={20} color="#FFD700" />;
      default:
        return <Sparkles size={20} color="#FFD700" />;
    }
  };

  return (
    <section id="programs" className="section-padding bg-sst-cream position-relative overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div
        className="position-absolute top-50 start-0 translate-middle-y rounded-circle pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%)',
          filter: 'blur(65px)',
          zIndex: 0,
        }}
      />

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider shadow-sm">
            {t('activitiesSection.badge')}
          </span>
          <h2 className={`display-6 font-heading fw-bold mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
            {t('activitiesSection.title')}
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
            {t('activitiesSection.subtitle')}
          </p>
        </div>

        {/* Program Cards Grid */}
        <div className="row g-4">
          {programs.map((prog, idx) => (
            <div key={prog.id} className="col-12 col-md-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -7, scale: 1.02 }}
                className="card border-0 rounded-4 overflow-hidden h-100 d-flex flex-column transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(212, 175, 55, 0.48)',
                  boxShadow: '0 14px 35px rgba(122, 28, 28, 0.1), 0 0 20px rgba(255, 215, 0, 0.22)',
                }}
              >
                {/* Image Container with Zoom & Metallic Badge */}
                <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                  <img
                    src={prog.imageUrl}
                    alt={prog.title}
                    className="w-100 h-100 object-fit-cover transition-all"
                    style={{ transition: 'transform 0.5s ease' }}
                  />
                  {/* Metallic Gold Beneficiaries Badge */}
                  <span
                    className="position-absolute top-0 end-0 m-3 badge rounded-pill px-3 py-2 fw-bold shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      color: '#FFD700',
                      border: '1px solid #D4AF37',
                      fontSize: '0.78rem',
                      letterSpacing: '0.6px',
                      boxShadow: '0 6px 16px rgba(122, 28, 28, 0.4), 0 0 10px rgba(255, 215, 0, 0.3)',
                    }}
                  >
                    {prog.beneficiariesCount}
                  </span>
                </div>

                {/* Card Body */}
                <div className="card-body p-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex align-items-center gap-2.5 mb-2.5">
                    <div
                      className="rounded-circle p-2.5 d-inline-flex align-items-center justify-content-center flex-shrink-0 shadow-sm"
                      style={{
                        background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                        boxShadow: '0 4px 12px rgba(122, 28, 28, 0.3)',
                      }}
                    >
                      {getIcon(prog.iconName)}
                    </div>
                    <h5 className={`fw-bold mb-0 ${isTamil ? 'font-tamil fs-6' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                      {isTamil ? prog.titleTa : prog.title}
                    </h5>
                  </div>

                  <p className={`small mb-4 flex-grow-1 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.6' }}>
                    {isTamil ? prog.shortDescTa : prog.shortDesc}
                  </p>

                  {/* Button */}
                  <div className="pt-2 mt-auto border-top border-warning border-opacity-30">
                    <button
                      onClick={() => setSelectedProgram(prog)}
                      className="btn rounded-pill w-100 py-2.5 px-4 text-white fw-bold d-inline-flex align-items-center justify-content-center gap-2 hover-scale transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                        border: '1.5px solid #D4AF37',
                        fontSize: '0.88rem',
                        letterSpacing: '0.5px',
                        boxShadow: '0 6px 18px rgba(122, 28, 28, 0.3)',
                      }}
                    >
                      <span>{t('activitiesSection.learnMore')}</span>
                      <ArrowRight size={16} color="#FFD700" />
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
          style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="bg-white rounded-4 shadow-lg overflow-hidden position-relative w-100 max-w-2xl p-4"
            style={{
              border: '2.5px solid #D4AF37',
              boxShadow: '0 20px 50px rgba(122, 28, 28, 0.25), 0 0 30px rgba(255, 215, 0, 0.4)',
            }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom border-warning pb-2">
              <h4 className={`fw-bold mb-0 ${isTamil ? 'font-tamil' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                {isTamil ? selectedProgram.titleTa : selectedProgram.title}
              </h4>
              <button
                onClick={() => setSelectedProgram(null)}
                className="btn btn-sm rounded-circle p-1.5 border border-warning"
                style={{ background: '#FFFDF0', color: '#7A1C1C' }}
              >
                ✕
              </button>
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-5">
                <img src={selectedProgram.imageUrl} alt={selectedProgram.title} className="w-100 rounded-3 object-fit-cover shadow-sm" style={{ height: '180px' }} />
                <div
                  className="rounded-pill w-100 mt-2 text-center py-2 text-white fw-bold small"
                  style={{
                    background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                    border: '1px solid #D4AF37',
                  }}
                >
                  {selectedProgram.beneficiariesCount}
                </div>
              </div>
              <div className="col-12 col-md-7">
                <p className={`small ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18' }}>
                  {isTamil ? selectedProgram.descriptionTa : selectedProgram.description}
                </p>
                <h6 className="fw-bold small mb-2" style={{ color: '#7A1C1C' }}>
                  {isTamil ? 'முக்கிய சிறப்பம்சங்கள்:' : 'Key Highlights:'}
                </h6>
                <ul className="list-unstyled small mb-0">
                  {(isTamil ? selectedProgram.featuresTa : selectedProgram.features).map((feat, fidx) => (
                    <li key={fidx} className={`d-flex align-items-center gap-2 mb-1.5 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18' }}>
                      <CheckCircle2 size={15} className="text-warning flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top d-flex justify-content-end gap-2">
              <Link
                to="/programs"
                onClick={() => setSelectedProgram(null)}
                className="btn rounded-pill py-2 px-4 text-white fw-bold shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                  border: '1px solid #D4AF37',
                }}
              >
                {isTamil ? 'அனைத்து திட்டங்களையும் காண்க' : 'View All Programs'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
