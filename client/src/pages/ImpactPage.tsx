import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ImpactStatisticsSection } from '../sections/ImpactStatistics';
import { TestimonialsSection } from '../sections/Testimonials';
import { FileText, Download, TrendingUp, Heart } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';

export const ImpactPage: React.FC = () => {
  const { t } = useTranslation();
  const context = useOutletContext<{ onOpenDonate: () => void }>();

  const annualReports = [
    { year: '2025-2026', size: '2.4 MB', title: 'Annual Financial & Audit Report 2026' },
    { year: '2024-2025', size: '1.9 MB', title: 'Humanitarian Impact Assessment 2025' },
    { year: '2023-2024', size: '3.1 MB', title: 'Audited Financial Statements 2024' },
  ];

  return (
    <div className="py-4">
      {/* Banner */}
      <div className="bg-gradient-sst-red text-white py-5 px-3 mb-5 text-center position-relative">
        <div className="container-fluid max-w-7xl">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">Social Impact</span>
          <h1 className="display-4 font-heading fw-bold text-white mb-3">Our Measurable Difference</h1>
          <p className="lead text-light opacity-90 max-w-2xl mx-auto fs-6">
            Transparent reporting, audited financials, and real human transformations.
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

      {/* CTA Box */}
      <section className="py-5 bg-sst-cream text-center">
        <div className="container-fluid max-w-4xl px-3">
          <div className="card glass-panel p-4 p-md-5 rounded-4 shadow-md">
            <TrendingUp size={40} className="text-danger mx-auto mb-3" />
            <h3 className="fw-bold text-navy font-heading mb-2">Be Part of Our Next Milestone</h3>
            <p className="text-muted mb-4">Your recurring contribution ensures continuous meals and schooling for hundreds of needy individuals.</p>
            <button onClick={() => context?.onOpenDonate()} className="btn btn-sst-primary py-3 px-5 rounded-pill mx-auto">
              <Heart size={18} fill="#ffffff" />
              Make a Impact Contribution Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
