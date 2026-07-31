import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_PROGRAMS } from '../constants';
import { CheckCircle2 } from 'lucide-react';

export const ProgramsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { key: 'all', label: isTamil ? 'அனைத்து திட்டங்கள்' : 'All Initiatives' },
    { key: 'annadhanam', label: isTamil ? 'தினசரி அன்னதானம்' : 'Daily Annadhanam' },
    { key: 'education', label: isTamil ? 'வித்யா ஜோதி கல்வி' : 'Vidya Jyothi Education' },
    { key: 'elderly', label: isTamil ? 'அன்பு இல்லம் முதியோர் நலன்' : 'Anbu Illam Senior Care' },
    { key: 'healthcare', label: isTamil ? 'மருத்துவ முகாம்கள்' : 'Medical Camps' },
    { key: 'empowerment', label: isTamil ? 'மகளிர் சுயசார்பு' : 'Women Empowerment' },
  ];

  const getCategoryTa = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'annadhanam': return 'அன்னதானம்';
      case 'education': return 'கல்வித் திட்டம்';
      case 'elderly': return 'முதியோர் நலன்';
      case 'healthcare': return 'மருத்துவச் சேவை';
      case 'empowerment': return 'மகளிர் மேம்பாடு';
      default: return cat;
    }
  };

  const filteredPrograms = selectedCategory === 'all'
    ? MOCK_PROGRAMS
    : MOCK_PROGRAMS.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-4 bg-sst-cream position-relative overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Background Soft Glow Orbs */}
      <div
        className="position-absolute top-0 start-50 translate-middle-x rounded-circle pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.18) 0%, transparent 70%)',
          filter: 'blur(70px)',
          zIndex: 0,
        }}
      />

      {/* High-Contrast Luxury Dark Gold Header Banner */}
      <div
        className="py-5 px-3 mb-5 text-center position-relative shadow-md"
        style={{
          background: 'linear-gradient(135deg, #1A0F0A 0%, #3D1212 50%, #200D0D 100%)',
          borderBottom: '3px solid #D4AF37',
          zIndex: 1,
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

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        {/* Category Filters */}
        <div className="d-flex flex-wrap justify-content-center gap-2.5 mb-5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`btn rounded-pill px-4 py-2 fw-bold small transition-all hover-scale ${isTamil ? 'font-tamil' : ''}`}
              style={
                selectedCategory === cat.key
                  ? {
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      color: '#FFFFFF',
                      border: '1.5px solid #D4AF37',
                      boxShadow: '0 6px 18px rgba(122, 28, 28, 0.35), 0 0 12px rgba(255, 215, 0, 0.3)',
                    }
                  : {
                      background: 'rgba(255, 253, 240, 0.95)',
                      color: '#7A1C1C',
                      border: '1.5px solid rgba(212, 175, 55, 0.45)',
                      boxShadow: '0 4px 12px rgba(122, 28, 28, 0.05)',
                    }
              }
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
              whileHover={{ y: -6, scale: 1.01 }}
              className="card border-0 rounded-4 overflow-hidden p-0 transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1.5px solid rgba(212, 175, 55, 0.48)',
                boxShadow: '0 16px 40px rgba(122, 28, 28, 0.08), 0 0 25px rgba(255, 215, 0, 0.2)',
              }}
            >
              <div className="row g-0 align-items-center">
                <div className={`col-12 col-lg-6 ${idx % 2 === 1 ? 'order-lg-2' : ''}`}>
                  <div className="position-relative h-100 overflow-hidden" style={{ minHeight: '340px' }}>
                    <img
                      src={prog.imageUrl}
                      alt={prog.title}
                      className="w-100 h-100 object-fit-cover position-absolute top-0 start-0 transition-all duration-500 hover-scale"
                    />
                    <span
                      className={`position-absolute top-0 end-0 m-3 badge rounded-pill px-3 py-2 fw-bold shadow-md ${isTamil ? 'font-tamil' : ''}`}
                      style={{
                        background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                        color: '#FFD700',
                        border: '1.5px solid #D4AF37',
                        boxShadow: '0 4px 14px rgba(122, 28, 28, 0.35)',
                        fontSize: '0.85rem',
                      }}
                    >
                      {isTamil ? (prog.beneficiariesCountTa || prog.beneficiariesCount) : prog.beneficiariesCount}
                    </span>
                  </div>
                </div>

                <div className="col-12 col-lg-6 p-4 p-md-5">
                  <span className={`badge badge-gold text-uppercase tracking-wider mb-2.5 shadow-sm ${isTamil ? 'font-tamil' : ''}`}>
                    {isTamil ? getCategoryTa(prog.category) : prog.category}
                  </span>
                  <h3 className={`fw-bold mb-3 ${isTamil ? 'font-tamil fs-4' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                    {isTamil ? prog.titleTa : prog.title}
                  </h3>
                  <p className={`mb-4 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.65' }}>
                    {isTamil ? prog.descriptionTa : prog.description}
                  </p>

                  <h6 className={`fw-bold small text-uppercase mb-3 tracking-wide ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
                    {isTamil ? 'வழங்கப்படும் முக்கிய சேவைகள்:' : 'Key Services Provided:'}
                  </h6>
                  <div className="row g-3 mb-2">
                    {(isTamil ? prog.featuresTa : prog.features).map((feat, fidx) => (
                      <div key={fidx} className="col-12 col-sm-6">
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle p-1 d-flex align-items-center justify-content-center flex-shrink-0"
                            style={{
                              background: '#7A1C1C',
                              marginRight: '0.75rem',
                            }}
                          >
                            <CheckCircle2 size={15} color="#FFD700" />
                          </div>
                          <span className={`small fw-semibold ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18' }}>
                            {feat}
                          </span>
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
