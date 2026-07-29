import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_GALLERY } from '../constants';
import { GalleryItem } from '../types';
import { Lightbox } from '../components/common/Lightbox';
import { Maximize2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GallerySection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isTamil = i18n.language === 'ta';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'all'
    ? MOCK_GALLERY
    : MOCK_GALLERY.filter((item) => item.category === activeCategory);

  const categories = [
    { key: 'all', label: t('gallerySection.all') },
    { key: 'annadhanam', label: t('gallerySection.annadhanam') },
    { key: 'education', label: t('gallerySection.education') },
    { key: 'healthcare', label: t('gallerySection.healthcare') },
    { key: 'events', label: t('gallerySection.events') },
  ];

  return (
    <section id="gallery" className="section-padding bg-white position-relative">
      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-4">
          <span className="badge badge-gold mb-2 text-uppercase tracking-wider">
            {t('gallerySection.badge')}
          </span>
          <h2 className="display-6 font-heading fw-bold text-navy mb-2">
            {t('gallerySection.title')}
          </h2>
          <p className="text-muted lead fs-6">{t('gallerySection.subtitle')}</p>
        </div>

        {/* Category Pills */}
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold transition-all ${
                activeCategory === cat.key ? 'btn-sst-primary' : 'btn-light border text-navy'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
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
                style={{ height: '260px' }}
              >
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-100 h-100 object-fit-cover transition-all duration-500 hover-scale"
                />

                <div
                  className="position-absolute top-0 start-0 w-100 h-100 p-4 d-flex flex-column justify-content-between text-white transition-all opacity-0 hover-opacity-100"
                  style={{ background: 'rgba(15, 23, 42, 0.75)' }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge badge-gold text-uppercase">{item.category}</span>
                    <span className="rounded-circle bg-white bg-opacity-20 p-2 text-white">
                      <Maximize2 size={18} />
                    </span>
                  </div>

                  <div>
                    <h6 className="fw-bold text-warning font-heading mb-1">
                      {isTamil ? item.titleTa : item.title}
                    </h6>
                    <p className="small text-light opacity-75 mb-0">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* View All Gallery Button */}
        <div className="text-center mt-5">
          <Link to="/gallery" className="btn btn-sst-outline-red py-2.5 px-4 rounded-pill">
            {t('gallerySection.viewFullGallery')}
            <ArrowRight size={18} />
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
