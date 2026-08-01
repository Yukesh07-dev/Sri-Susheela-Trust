import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MOCK_GALLERY } from '../constants';
import { apiService } from '../services/api';
import { GalleryItem } from '../types';
import { Lightbox } from '../components/common/Lightbox';
import { Maximize2, Image as ImageIcon } from 'lucide-react';

export const GalleryPage: React.FC = () => {
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
    { key: 'all', label: 'All Photos' },
    { key: 'annadhanam', label: 'Annadhanam' },
    { key: 'education', label: 'Vidya Jyothi Education' },
    { key: 'healthcare', label: 'Medical Camps' },
    { key: 'events', label: 'Events & Functions' },
    { key: 'community', label: 'Community Service' },
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
            {isTamil ? 'புகைப்படத் தொகுப்பு' : 'Photo Archive'}
          </span>
          <h1 className={`display-4 fw-bold text-gradient-gold mb-3 ${isTamil ? 'font-tamil' : 'font-heading'}`}>
            {isTamil ? 'சேவைப் புகைப்படங்கள் & வீடியோக்கள்' : 'Service Gallery'}
          </h1>
          <p className={`lead text-light opacity-90 max-w-2xl mx-auto fs-6 ${isTamil ? 'font-tamil' : ''}`}>
            {isTamil
              ? 'எங்கள் அன்னதானம், கல்விக் கூடங்கள், இலவச மருத்துவ முகாம்கள் மற்றும் சேவை நிகழ்வுகளின் நேரடித் தொகுப்பு.'
              : 'Witness our daily food service, educational classes, medical camps, and elder care home activities.'}
          </p>
        </div>
      </div>

      <div className="container-fluid px-3 px-lg-5 max-w-7xl">
        {/* Category Pills */}
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`btn rounded-pill px-3.5 py-2 fw-semibold transition-all ${
                activeCategory === cat.key ? 'btn-sst-primary' : 'btn-light border text-navy'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="row g-4">
          {filteredItems.map((item, idx) => (
            <div key={item.id} className="col-12 col-sm-6 col-lg-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setActiveLightboxIndex(idx)}
                className="position-relative rounded-4 overflow-hidden shadow-sm cursor-pointer card-luxury group"
                style={{ height: '280px' }}
              >
                <img
                  src={item.mediaUrl}
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
                    <h5 className="fw-bold text-warning font-heading mb-1">
                      {isTamil ? item.titleTa : item.title}
                    </h5>
                    <p className="small text-light opacity-80 mb-0">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
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
    </div>
  );
};
