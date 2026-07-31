import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ImpactStatisticsSection } from '../sections/ImpactStatistics';
import { TestimonialsSection } from '../sections/Testimonials';
import { FileText, Download, Heart } from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  const annualReports = [
    {
      year: '2025-2026',
      size: '2.4 MB',
      title: 'Annual Financial & Audit Report 2026',
      titleTa: 'வருடாந்திர நிதி & தணிக்கை அறிக்கை 2026',
    },
    {
      year: '2024-2025',
      size: '1.9 MB',
      title: 'Humanitarian Impact Assessment 2025',
      titleTa: 'சமூகத் சேவைத் தாக்கம் மதிப்பீட்டு அறிக்கை 2025',
    },
    {
      year: '2023-2024',
      size: '3.1 MB',
      title: 'Audited Financial Statements 2024',
      titleTa: 'தணிக்கை செய்யப்பட்ட நிதி அறிக்கைகள் 2024',
    },
  ];

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
            {isTamil ? 'சமுதாயத் தாக்கம்' : 'Social Impact'}
          </span>
          <h1 className={`display-4 fw-bold text-gradient-gold mb-3 ${isTamil ? 'font-tamil' : 'font-heading'}`}>
            {isTamil ? 'எங்கள் சாதனைகள் & அளவிடக்கூடிய மாற்றங்கள்' : 'Our Measurable Difference'}
          </h1>
          <p className={`lead text-light opacity-90 max-w-2xl mx-auto fs-6 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'வெளிப்படையான அறிக்கைகள், கணக்காய்வு செய்யப்பட்ட தகவல்கள் மற்றும் மனித வாழ்வு மாற்றங்கள்.'
              : 'Transparent reporting, audited financials, and real human transformations.'}
          </p>
        </div>
      </div>

      <ImpactStatisticsSection />

      {/* Annual Reports Section */}
      <section className="section-padding bg-sst-cream position-relative overflow-hidden">
        <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-5">
            <span className="badge badge-gold mb-2 text-uppercase tracking-wider shadow-sm">
              {isTamil ? 'வெளிப்படைத்தன்மை' : 'Transparency'}
            </span>
            <h2 className={`display-6 font-heading fw-bold mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
              {isTamil ? 'வருடாந்திர சேவை & நிதி அறிக்கைகள்' : 'Annual Impact Reports'}
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
              {isTamil
                ? 'எங்கள் தணிக்கை செய்யப்பட்ட நிதி அறிக்கைகள் மற்றும் சேவைத் தாக்கக் கோப்புகளைப் பதிவிறக்கம் செய்யுங்கள்.'
                : 'Download our audited financial statements and program impact evaluations.'}
            </p>
          </div>

          <div className="row g-4">
            {annualReports.map((report, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.12 }}
                  whileHover={{ y: -7, scale: 1.02 }}
                  className="card border-0 rounded-4 p-4 d-flex flex-column align-items-start transition-all h-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1.5px solid rgba(212, 175, 55, 0.48)',
                    boxShadow: '0 14px 35px rgba(122, 28, 28, 0.08), 0 0 20px rgba(255, 215, 0, 0.2)',
                  }}
                >
                  <div
                    className="rounded-circle p-3 mb-3.5 d-flex align-items-center justify-content-center shadow-sm"
                    style={{
                      width: '56px',
                      height: '56px',
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      border: '1px solid #D4AF37',
                    }}
                  >
                    <FileText size={26} color="#FFD700" />
                  </div>

                  <span
                    className="badge rounded-pill px-3 py-1.5 fw-bold font-mono mb-2 shadow-sm"
                    style={{
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      color: '#FFD700',
                      border: '1px solid #D4AF37',
                      fontSize: '0.8rem',
                    }}
                  >
                    {report.year}
                  </span>

                  <h5 className={`fw-bold mb-2 ${isTamil ? 'font-tamil fs-6' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                    {isTamil ? report.titleTa : report.title}
                  </h5>

                  <span className="small mb-4 opacity-80" style={{ color: '#523E18', fontSize: '0.78rem' }}>
                    PDF Document • {report.size}
                  </span>

                  <button
                    onClick={() => alert(`Downloading ${isTamil ? report.titleTa : report.title}...`)}
                    className={`btn rounded-pill w-100 py-2.5 text-white fw-bold d-inline-flex align-items-center justify-content-center gap-2.5 shadow-md hover-scale transition-all mt-auto ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      border: '1.5px solid #D4AF37',
                      fontSize: '0.88rem',
                      boxShadow: '0 6px 18px rgba(122, 28, 28, 0.3)',
                    }}
                  >
                    <Download size={16} color="#FFD700" style={{ marginRight: '0.5rem' }} />
                    <span>{isTamil ? 'அறிக்கையைப் பதிவிறக்குக' : 'Download Report'}</span>
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
    </div>
  );
};
