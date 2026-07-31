import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_NEWS } from '../constants';
import { NewsArticle } from '../types';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

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

      <div className="container-fluid px-3 px-lg-5 max-w-7xl position-relative" style={{ zIndex: 1 }}>
        <div className="row g-4 mb-5">
          {MOCK_NEWS.map((article, idx) => (
            <div key={article.id} className="col-12 col-md-6">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="card border-0 rounded-4 overflow-hidden p-0 h-100 d-flex flex-column transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 249, 231, 0.94) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(212, 175, 55, 0.48)',
                  boxShadow: '0 16px 40px rgba(122, 28, 28, 0.08), 0 0 25px rgba(255, 215, 0, 0.2)',
                }}
              >
                <div className="position-relative overflow-hidden" style={{ height: '230px' }}>
                  <img src={article.imageUrl} alt={article.title} className="w-100 h-100 object-fit-cover transition-all duration-500 hover-scale" />
                  <span
                    className={`position-absolute top-0 start-0 m-3 badge rounded-pill px-3 py-1.5 fw-bold shadow-md ${isTamil ? 'font-tamil' : ''}`}
                    style={{
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      color: '#FFD700',
                      border: '1px solid #D4AF37',
                    }}
                  >
                    {article.category}
                  </span>
                </div>

                <div className="p-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex flex-wrap align-items-center gap-3 small mb-3" style={{ color: '#8C6826' }}>
                    <span className="d-inline-flex align-items-center">
                      <Calendar size={14} color="#7A1C1C" style={{ marginRight: '0.5rem' }} />
                      <span>{article.publishedDate}</span>
                    </span>
                    <span className="d-inline-flex align-items-center">
                      <Clock size={14} color="#8C6826" style={{ marginRight: '0.5rem' }} />
                      <span>{article.readTime}</span>
                    </span>
                    <span className="d-inline-flex align-items-center ms-auto">
                      <User size={14} color="#7A1C1C" style={{ marginRight: '0.5rem' }} />
                      <span>{article.author}</span>
                    </span>
                  </div>

                  <h4 className={`fw-bold mb-3 ${isTamil ? 'font-tamil fs-5' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
                    {isTamil ? article.titleTa : article.title}
                  </h4>

                  <p className={`small mb-4 flex-grow-1 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.6' }}>
                    {isTamil ? article.excerptTa : article.excerpt}
                  </p>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className={`btn rounded-pill w-100 py-3 text-white fw-bold d-inline-flex align-items-center justify-content-center gap-2.5 shadow-md hover-scale transition-all mt-auto ${
                      isTamil ? 'font-tamil' : ''
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
                      border: '1.5px solid #D4AF37',
                      fontSize: '0.9rem',
                      boxShadow: '0 8px 24px rgba(122, 28, 28, 0.35), 0 0 15px rgba(255, 215, 0, 0.35)',
                    }}
                  >
                    <span>{isTamil ? 'முழு செய்தியை வாசிக்க' : 'Read Full Story'}</span>
                    <ArrowRight size={16} color="#FFD700" style={{ marginLeft: '0.25rem' }} />
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
          style={{ zIndex: 9999, backgroundColor: 'rgba(15, 23, 42, 0.78)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="rounded-4 p-4 p-md-5 max-w-2xl w-100 shadow-lg position-relative overflow-y-auto max-vh-90 border-0"
            style={{
              background: 'linear-gradient(135deg, #FFFDF5 0%, #FEF9E7 100%)',
              border: '2px solid #D4AF37',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 215, 0, 0.3)',
            }}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="btn btn-sm btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow-sm border"
            >
              ✕
            </button>
            <span className="badge badge-gold text-uppercase mb-2 shadow-sm">{selectedArticle.category}</span>
            <h3 className={`fw-bold mb-3 ${isTamil ? 'font-tamil fs-4' : 'font-heading'}`} style={{ color: '#7A1C1C' }}>
              {isTamil ? selectedArticle.titleTa : selectedArticle.title}
            </h3>
            <img src={selectedArticle.imageUrl} alt={selectedArticle.title} className="w-100 rounded-3 mb-3.5 object-fit-cover shadow-sm" style={{ height: '260px' }} />
            <p className={`leading-relaxed ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#523E18', lineHeight: '1.7' }}>
              {isTamil ? selectedArticle.contentTa : selectedArticle.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
