import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ImpactStatisticsSection } from '../sections/ImpactStatistics';
import { TestimonialsSection } from '../sections/Testimonials';
import { FileText, Download, TrendingUp, Heart } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export const ImpactPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';

  const annualReports = [
    { year: '2025-2026', size: '2.4 MB', title: 'Annual Financial & Audit Report 2026' },
    { year: '2024-2025', size: '1.9 MB', title: 'Humanitarian Impact Assessment 2025' },
    { year: '2023-2024', size: '3.1 MB', title: 'Audited Financial Statements 2024' },
  ];

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
      <section className="section-padding bg-white">
        <div className="container-fluid px-3 px-lg-5 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-5">
            <span className="badge badge-gold mb-2 text-uppercase tracking-wider">Transparency</span>
            <h2 className="display-6 font-heading fw-bold text-navy mb-2">Annual Impact Reports</h2>
            <p className="text-muted lead fs-6">Download our audited financial statements and program impact evaluations.</p>
          </div>

          <div className="row g-4">
            {annualReports.map((report, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="card card-luxury p-4 d-flex flex-column align-items-start"
                >
                  <div className="rounded-circle bg-danger bg-opacity-10 text-danger p-3 mb-3">
                    <FileText size={28} />
                  </div>
                  <span className="badge bg-dark text-warning mb-2">{report.year}</span>
                  <h5 className="fw-bold text-navy font-heading mb-2">{report.title}</h5>
                  <span className="small text-muted mb-4">PDF Document • {report.size}</span>

                  <button
                    onClick={() => alert(`Downloading ${report.title}...`)}
                    className="btn btn-sst-outline-red btn-sm mt-auto w-100 justify-content-center"
                  >
                    <Download size={16} /> Download Report
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
