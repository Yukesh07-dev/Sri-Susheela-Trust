import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_PROGRAMS } from '../constants';
import { ProgramItem } from '../types';
import { CheckCircle2, Heart } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export const ProgramsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'All Initiatives' },
    { key: 'annadhanam', label: 'Daily Annadhanam' },
    { key: 'education', label: 'Vidya Jyothi Education' },
    { key: 'elderly', label: 'Anbu Illam Senior Care' },
    { key: 'healthcare', label: 'Medical Camps' },
    { key: 'empowerment', label: 'Women Empowerment' },
  ];

  const filteredPrograms = selectedCategory === 'all'
    ? MOCK_PROGRAMS
    : MOCK_PROGRAMS.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-4">
      {/* High-Contrast Luxury Dark Gold Header Banner */}
      <div
        className="py-5 px-3 mb-5 text-center position-relative shadow-md"
        style={{
          background: 'linear-gradient(135deg, #1A0F0A 0%, #3D1212 50%, #200D0D 100%)',
          borderBottom: '3px solid #D4AF37',
        }}
      >
        <div className="container-fluid max-w-7xl">
          <span className={`badge badge-gold mb-2 text-uppercase tracking-wider ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil ? 'எங்கள் சேவைகள்' : 'What We Do'}
          </span>
          <h1 className={`display-4 fw-bold text-gradient-gold mb-3 ${isTamil ? 'font-tamil' : 'font-heading'}`}>
            {isTamil ? 'திட்டங்கள் & சமுதாயப் பணிகள்' : 'Programs & Social Initiatives'}
          </h1>
          <p className={`lead text-light opacity-90 max-w-2xl mx-auto fs-6 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'தமிழ்நாடு முழுவதும் எளியோரின் வாழ்வை மாற்றியமைக்கும் நேரடி மற்றும் நிலையான சேவைத் திட்டங்கள்.'
              : 'Direct, measurable, and sustainable humanitarian interventions transforming lives across Tamil Nadu.'}
          </p>
        </div>
      </div>

      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        {/* Category Filters */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`btn rounded-pill px-3 py-2 fw-semibold transition-all ${
                selectedCategory === cat.key ? 'btn-sst-primary' : 'btn-light border text-navy'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Programs List */}
        <div className="d-flex flex-column gap-5 mb-5">
          {filteredPrograms.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card card-luxury overflow-hidden p-0"
            >
              <div className="row g-0 align-items-center">
                <div className={`col-12 col-lg-6 ${idx % 2 === 1 ? 'order-lg-2' : ''}`}>
                  <div className="position-relative h-100" style={{ minHeight: '320px' }}>
                    <img src={prog.imageUrl} alt={prog.title} className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" />
                    <span className="position-absolute top-0 end-0 m-3 badge bg-danger text-white fs-6">
                      {prog.beneficiariesCount}
                    </span>
                  </div>
                </div>

                <div className="col-12 col-lg-6 p-4 p-md-5">
                  <span className="badge badge-gold text-uppercase tracking-wider mb-2">{prog.category}</span>
                  <h3 className="fw-bold font-heading text-navy mb-3">
                    {isTamil ? prog.titleTa : prog.title}
                  </h3>
                  <p className="text-muted mb-4 fs-6">
                    {isTamil ? prog.descriptionTa : prog.description}
                  </p>

                  <h6 className="fw-bold text-navy small text-uppercase mb-3">Key Services Provided:</h6>
                  <div className="row g-2 mb-4">
                    {(isTamil ? prog.featuresTa : prog.features).map((feat, fidx) => (
                      <div key={fidx} className="col-12 col-sm-6">
                        <div className="d-flex align-items-center gap-2">
                          <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                          <span className="small text-muted">{feat}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
