import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_GALLERY } from '../constants';
import { apiService } from '../services/api';
import { GalleryItem } from '../types';
import { Lightbox } from '../components/common/Lightbox';
import { Maximize2, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GallerySection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(MOCK_GALLERY);

  useEffect(() => {
    let isMounted = true;
    apiService.getGalleryItems(activeCategory).then((data) => {
      if (isMounted && data) {
        setItems(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const filteredItems = items;

  const categories = [
    { key: 'all', label: t('gallerySection.all') },
    { key: 'annadhanam', label: t('gallerySection.annadhanam') },
    { key: 'education', label: t('gallerySection.education') },
    { key: 'healthcare', label: t('gallerySection.healthcare') },
    { key: 'events', label: t('gallerySection.events') },
  ];

  return (
    <section id="gallery" className="section-padding bg-sst-cream position-relative overflow-hidden">
      {/* Background Soft Glow Orbs */}
      <div
        className="position-absolute top-50 end-0 translate-middle-y rounded-circle pointer-events-none"
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
        <div className="text-center max-w-3xl mx-auto mb-4">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider shadow-sm">
            {t('gallerySection.badge')}
          </span>
          <h2 className={`display-6 font-heading fw-bold mb-3 ${isTamil ? 'font-tamil' : ''}`} style={{ color: '#7A1C1C' }}>
            {t('gallerySection.title')}
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
            {t('gallerySection.subtitle')}
          </p>
        </div>

        {/* Luxury Category Filter Pills */}
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2.5 mb-5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`btn rounded-pill px-4 py-2 fw-bold small transition-all hover-scale ${isTamil ? 'font-tamil' : ''}`}
              style={
                activeCategory === cat.key
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

        {/* Gallery Grid - Photos kept EXACTLY the same */}
        <div className="row g-3 g-md-4">
          {filteredItems.slice(0, 6).map((item, idx) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveLightboxIndex(idx)}
                className="position-relative rounded-4 overflow-hidden shadow-sm cursor-pointer card-luxury group"
                style={{ height: '260px', border: '1.5px solid rgba(212, 175, 55, 0.4)' }}
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-100 h-100 object-fit-cover transition-all duration-500 hover-scale"
                />

                <div
                  className="position-absolute top-0 start-0 w-100 h-100 p-4 d-flex flex-column justify-content-between text-white transition-all opacity-0 hover-opacity-100"
                  style={{ background: 'rgba(122, 28, 28, 0.82)', backdropFilter: 'blur(4px)' }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge badge-gold text-uppercase">{item.category}</span>
                    <span className="rounded-circle bg-white bg-opacity-20 p-2 text-white">
                      <Maximize2 size={18} />
                    </span>
                  </div>

                  <div>
                    <h6 className={`fw-bold text-warning font-heading mb-1 ${isTamil ? 'font-tamil' : ''}`}>
                      {isTamil ? item.titleTa : item.title}
                    </h6>
                    <p className={`small text-light opacity-90 mb-0 ${isTamil ? 'font-tamil' : ''}`}>{item.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* View All Gallery Button */}
        <div className="text-center mt-5">
          <Link
            to="/gallery"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btn rounded-pill px-4.5 py-3 text-white fw-bold shadow-md d-inline-flex align-items-center gap-2.5 hover-scale transition-all"
            style={{
              background: 'linear-gradient(135deg, #7A1C1C 0%, #521212 100%)',
              border: '1.5px solid #D4AF37',
              letterSpacing: '0.8px',
              fontSize: '0.95rem',
              boxShadow: '0 8px 24px rgba(122, 28, 28, 0.35), 0 0 15px rgba(255, 215, 0, 0.35)',
            }}
          >
            <span>{t('gallerySection.viewFullGallery')}</span>
            <ArrowRight size={18} color="#FFD700" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <Lightbox
          item={filteredItems[activeLightboxIndex]}
          onClose={() => setActiveLightboxIndex(null)}
          onPrev={() =>
            setActiveLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1))
          }
          onNext={() =>
            setActiveLightboxIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0))
          }
        />
      )}
    </section>
  );
};
