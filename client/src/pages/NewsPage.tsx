import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_NEWS } from '../constants';
import { NewsArticle } from '../types';
import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

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
            {isTamil ? 'செய்திகள் & ஊடகம்' : 'Press & Media'}
          </span>
          <h1 className={`display-4 fw-bold text-gradient-gold mb-3 ${isTamil ? 'font-tamil' : 'font-heading'}`}>
            {isTamil ? 'செய்திகள் & புதிய தகவல்கள்' : 'News & Updates'}
          </h1>
          <p className={`lead text-light opacity-90 max-w-2xl mx-auto fs-6 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'எங்கள் அறக்கட்டளையின் சமீபத்திய சாதனைகள், பத்திரிகைச் செய்திகள் மற்றும் சேவைப் செய்திகள்.'
              : 'Stay informed with our latest social achievements, awards, press releases, and stories of hope.'}
          </p>
        </div>
      </div>

      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="row g-4 mb-5">
          {MOCK_NEWS.map((article, idx) => (
            <div key={article.id} className="col-12 col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card card-luxury overflow-hidden p-0 h-100 d-flex flex-column"
              >
                <div className="position-relative" style={{ height: '230px' }}>
                  <img src={article.imageUrl} alt={article.title} className="w-100 h-100 object-fit-cover" />
                  <span className="position-absolute top-0 start-0 m-3 badge bg-danger text-white">
                    {article.category}
                  </span>
                </div>

                <div className="p-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex align-items-center gap-3 small text-muted mb-2">
                    <span className="d-inline-flex align-items-center gap-1">
                      <Calendar size={14} className="text-danger" /> {article.publishedDate}
                    </span>
                    <span className="d-inline-flex align-items-center gap-1">
                      <Clock size={14} className="text-warning" /> {article.readTime}
                    </span>
                    <span className="d-inline-flex align-items-center gap-1 ms-auto">
                      <User size={14} /> {article.author}
                    </span>
                  </div>

                  <h4 className="fw-bold font-heading text-navy mb-3">
                    {isTamil ? article.titleTa : article.title}
                  </h4>

                  <p className="small text-muted mb-4 flex-grow-1">
                    {isTamil ? article.excerptTa : article.excerpt}
                  </p>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="btn btn-sst-outline-red btn-sm w-100 justify-content-center mt-auto"
                  >
                    Read Full Story
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)' }}
        >
          <div className="bg-white rounded-4 p-4 p-md-5 max-w-2xl w-100 shadow-lg position-relative overflow-y-auto max-vh-90">
            <button onClick={() => setSelectedArticle(null)} className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-3">
              ✕
            </button>
            <span className="badge badge-gold text-uppercase mb-2">{selectedArticle.category}</span>
            <h3 className="fw-bold text-navy font-heading mb-3">{isTamil ? selectedArticle.titleTa : selectedArticle.title}</h3>
            <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-100 rounded-3 mb-3 object-fit-cover" style={{ height: '250px' }} />
            <p className="text-muted leading-relaxed">{isTamil ? selectedArticle.contentTa : selectedArticle.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};
